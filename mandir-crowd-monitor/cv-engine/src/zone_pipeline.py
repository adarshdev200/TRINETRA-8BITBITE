# One camera -> one background thread that captures, detects, annotates, and
# keeps the latest JPEG (for the web feed) plus the latest counts.
#
# Roles:
#   "entrance" / "exit" -> darshan room: line-crossing, posts enter/exit events
#   "count"             -> outside corridor: how many people are visible now
#                          (grace-period smoothed), posts the count periodically

import threading
import time

import cv2

from src.video_stream import VideoStream
from src.detector import Detector
from src.line_counter import LineCounter
from src.counter import OccupancyCounter


def crossing_delta(role, direction, forward):
    is_forward = direction == forward
    if role == "entrance":
        return +1 if is_forward else -1
    return -1 if is_forward else +1  # exit


class ZonePipeline(threading.Thread):
    def __init__(self, name, cfg, signal=None):
        super().__init__(daemon=True)
        self.name = name
        self.cfg = cfg
        self.signal = signal
        self.role = cfg["role"]

        self.detector = Detector(
            model_path=cfg.get("model", "yolov8n.pt"),
            confidence=cfg.get("confidence", 0.5),
        )
        self.line_counter = None                 # for entrance/exit
        self.occupancy_counter = OccupancyCounter(grace_period=15)  # for count

        self._latest_jpeg = None
        self._lock = threading.Lock()
        self._running = True

        # what we expose for metrics
        self.people_now = 0
        self._last_count_post = 0

    # ---- public: latest annotated frame as JPEG bytes (for the MJPEG feed) ----
    def get_jpeg(self):
        with self._lock:
            return self._latest_jpeg

    def stop(self):
        self._running = False

    def run(self):
        stream = VideoStream(self.cfg["source"])
        stream.open()
        print(f"[{self.name}] model + stream ready ({self.role})")

        while self._running:
            ok, frame = stream.read()
            if not ok:
                # video file ended -> loop it; live stream hiccup -> retry
                stream.release()
                stream = VideoStream(self.cfg["source"])
                stream.open()
                continue

            detections = self.detector.track(frame)

            if self.role in ("entrance", "exit"):
                self._handle_line(frame, detections)
            else:
                self._handle_count(frame, detections)

            self._annotate(frame, detections)
            self._store(frame)

        stream.release()

    # ---- darshan entrance/exit: line crossing ----
    def _handle_line(self, frame, detections):
        if self.line_counter is None:
            line_y = int(frame.shape[0] * self.cfg.get("line_position", 0.5))
            self.line_counter = LineCounter(line_y)

        events = self.line_counter.update(detections)
        for ev in events:
            delta = crossing_delta(self.role, ev["direction"], self.cfg["forward"])
            if self.signal:
                self.signal.send_event("enter" if delta > 0 else "exit", self.name)

        self.people_now = len(detections)

    # ---- outside corridor: current people count ----
    def _handle_count(self, frame, detections):
        self.occupancy_counter.update(detections)
        self.people_now = self.occupancy_counter.occupancy

        now = time.time()
        if self.signal and now - self._last_count_post >= 1.0:  # post ~1x/sec
            self.signal.send_zone_count(self.name, self.people_now)
            self._last_count_post = now

    # ---- draw boxes / line / label on the frame ----
    def _annotate(self, frame, detections):
        for det in detections:
            x1, y1, x2, y2 = det["box"]
            tid = det.get("track_id")
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, f"ID {tid}" if tid is not None else "person",
                        (x1, y1 - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        if self.line_counter is not None:
            w = frame.shape[1]
            y = self.line_counter.line_y
            cv2.line(frame, (0, y), (w, y), (255, 0, 0), 2)

        label = f"{self.name.upper()}  |  people: {self.people_now}"
        cv2.rectangle(frame, (10, 10), (360, 42), (0, 0, 0), -1)
        cv2.putText(frame, label, (16, 33),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)

    def _store(self, frame):
        ok, buf = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
        if ok:
            with self._lock:
                self._latest_jpeg = buf.tobytes()
