from ultralytics import YOLO

PERSON_CLASS_ID = 0  # "person" in COCO


class Detector:
    def __init__(self, model_path="yolov8n.pt", confidence=0.6):
        self.model = YOLO(model_path)
        self.confidence = confidence

    def _extract_people(self, result, with_id):
        detections = []
        for box in result.boxes:
            class_id = int(box.cls[0])
            conf = float(box.conf[0])

            if class_id != PERSON_CLASS_ID or conf < self.confidence:
                continue

            x1, y1, x2, y2 = box.xyxy[0]
            det = {
                "box": (int(x1), int(y1), int(x2), int(y2)),
                "confidence": conf,
            }

            if with_id:
                # id is None until the tracker actually locks on
                det["track_id"] = int(box.id[0]) if box.id is not None else None

            detections.append(det)
        return detections

    def detect(self, frame):
        results = self.model(frame, verbose=False)
        return self._extract_people(results[0], with_id=False)

    def track(self, frame):
        # bytetrack instead of the default botsort: our cameras don't move,
        # so we skip the motion compensation (and its noisy warnings)
        results = self.model.track(
            frame, persist=True, tracker="bytetrack.yaml", verbose=False
        )
        return self._extract_people(results[0], with_id=True)
