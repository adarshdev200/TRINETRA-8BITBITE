# We don't load real YOLO here - fake its output and check that detect()
# keeps only people above the confidence threshold.

from unittest.mock import patch, MagicMock

from src.detector import Detector, PERSON_CLASS_ID


def make_fake_box(class_id, conf, xyxy):
    box = MagicMock()
    box.cls = [class_id]
    box.conf = [conf]
    box.xyxy = [xyxy]
    return box


def make_detector_with_boxes(boxes, confidence=0.4):
    with patch("src.detector.YOLO"):  # don't download/load a real model
        detector = Detector(confidence=confidence)

    fake_result = MagicMock()
    fake_result.boxes = boxes
    detector.model = MagicMock(return_value=[fake_result])
    return detector


def test_keeps_only_persons():
    boxes = [
        make_fake_box(PERSON_CLASS_ID, 0.9, (10, 20, 30, 40)),
        make_fake_box(2, 0.9, (0, 0, 5, 5)),  # a car, should be dropped
    ]
    detector = make_detector_with_boxes(boxes)

    detections = detector.detect(frame=None)

    assert len(detections) == 1
    assert detections[0]["box"] == (10, 20, 30, 40)


def test_drops_low_confidence():
    boxes = [
        make_fake_box(PERSON_CLASS_ID, 0.9, (10, 20, 30, 40)),
        make_fake_box(PERSON_CLASS_ID, 0.2, (50, 60, 70, 80)),
    ]
    detector = make_detector_with_boxes(boxes, confidence=0.4)

    detections = detector.detect(frame=None)

    assert len(detections) == 1
    assert detections[0]["confidence"] == 0.9


def test_no_detections_returns_empty_list():
    detector = make_detector_with_boxes(boxes=[])
    assert detector.detect(frame=None) == []
