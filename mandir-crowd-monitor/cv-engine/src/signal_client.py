# Posts entry/exit events to the backend. Runs each request in a daemon
# thread so the video loop never blocks, and ignores errors so a dead
# backend doesn't take the cameras down with it.

import json
import threading
import urllib.request


class SignalClient:
    def __init__(self, base_url="http://localhost:4000", timeout=2.0):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    def _post(self, path, payload):
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            self.base_url + path, data=data,
            headers={"Content-Type": "application/json"},
        )
        try:
            urllib.request.urlopen(req, timeout=self.timeout).read()
        except Exception:
            pass

    def _post_async(self, path, payload):
        threading.Thread(
            target=self._post, args=(path, payload), daemon=True
        ).start()

    def send_event(self, event_type, camera):
        self._post_async("/api/events", {"type": event_type, "camera": camera})

    def send_zone_count(self, zone, count):
        # current people count for a zone (e.g. the outside corridor)
        self._post_async("/api/zones/" + zone, {"count": count})

    def reset(self):
        self._post_async("/api/reset", {})
