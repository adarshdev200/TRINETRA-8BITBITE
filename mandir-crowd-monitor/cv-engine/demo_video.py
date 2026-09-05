# Runs the pipeline on a video file instead of live cameras - handy for
# testing without the phones. Treats the clip as a single entrance camera.

import cv2

from src.video_stream import VideoStream
from src.detector import Detector
from src.line_counter import LineCounter
from src.occupancy import Occupancy

VIDEO_PATH = "videos/vtest.avi"
LINE_POSITION = 0.5
FORWARD = "down"
CAPACITY = 30


def main():
    detector = Detector()
    occupancy = Occupancy(capacity=CAPACITY)
    counter = None

    stream = VideoStream(VIDEO_PATH)
    stream.open()

    print("Playing video. Press 'q' to quit, 'r' to reset.")
    while True:
        success, frame = stream.read()
        if not success:
            # reached the end, loop it
            stream.release()
            stream = VideoStream(VIDEO_PATH)
            stream.open()
            continue

        if counter is None:
            counter = LineCounter(int(frame.shape[0] * LINE_POSITION))

        detections = detector.track(frame)
        for ev in counter.update(detections):
            delta = +1 if ev["direction"] == FORWARD else -1
            occupancy.apply(delta)

        w = frame.shape[1]
        cv2.line(frame, (0, counter.line_y), (w, counter.line_y), (255, 0, 0), 2)
        for det in detections:
            x1, y1, x2, y2 = det["box"]
            tid = det.get("track_id")
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, f"ID {tid}", (x1, y1 - 8),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        text = (f"Occupancy: {occupancy.value}  "
                f"(down {counter.down_count} / up {counter.up_count})")
        cv2.rectangle(frame, (10, 10), (520, 45), (0, 0, 0), -1)
        cv2.putText(frame, text, (18, 36),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)

        cv2.imshow("Video Demo", frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break
        if key == ord("r"):
            occupancy.reset()

    stream.release()


if __name__ == "__main__":
    main()
