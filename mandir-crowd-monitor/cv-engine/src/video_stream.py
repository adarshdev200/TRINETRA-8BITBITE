import time

import cv2


class VideoStream:
    # phone streams drop out a lot, so retry the open a few times
    def __init__(self, source, open_retries=15, retry_delay=2.0):
        self.source = source
        self.open_retries = open_retries
        self.retry_delay = retry_delay
        self.cap = None

    def open(self):
        for attempt in range(1, self.open_retries + 1):
            self.cap = cv2.VideoCapture(self.source)
            if self.cap.isOpened():
                return
            print(f"  open attempt {attempt}/{self.open_retries} failed for "
                  f"{self.source}; retrying...")
            self.cap.release()
            time.sleep(self.retry_delay)
        raise RuntimeError(f"Could not open video source: {self.source}")

    def read(self):
        return self.cap.read()

    def release(self):
        if self.cap is not None:
            self.cap.release()
        cv2.destroyAllWindows()
