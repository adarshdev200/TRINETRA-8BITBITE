# Runs the zone pipelines (each camera in its own thread) and serves their
# annotated video to the frontend as MJPEG feeds.
#
# Zones:
#   darshan       -> entrance camera (line counting -> enter events); its feed
#                    is the one shown for the Darshan zone on the dashboard
#   darshan_exit  -> exit camera (line counting -> exit events)
#   outside       -> corridor camera (current people count)
#
# The darshan enter/exit events drive occupancy + gate on the backend; the
# outside count is posted directly.

import os

from src.zone_pipeline import ZonePipeline
from src.web_stream import run_server
from src.signal_client import SignalClient

# Point at the deployed backend by exporting BACKEND_URL, e.g.
#   BACKEND_URL=https://trinetra-backend.onrender.com python main.py
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:4000")
FEED_PORT = int(os.environ.get("FEED_PORT", "8090"))

# For a live demo, set each "source" to the phone stream URL. For testing
# without phones, point them at a video file (videos/vtest.avi).
DEMO_SOURCE = "videos/vtest.avi"

ZONES = {
    "darshan": {
        "source": "videos/Devotees.mp4",       # devotees entering the temple gate (down = enter)
        "role": "entrance",
        "forward": "down",
        "line_position": 0.5,
        "model": "yolov8s.pt",                 # bigger model -> catches the dense back crowd
        "confidence": 0.3,
    },
    "darshan_exit": {
        "source": "videos/DevoteesExit.mp4",   # devotees exiting the temple gate (down = exit)
        "role": "exit",
        "forward": "down",
        "line_position": 0.5,
        "model": "yolov8s.pt",
        "confidence": 0.3,
    },
    "outside": {
        "source": DEMO_SOURCE,             # corridor phone (still the plaza demo clip)
        "role": "count",
    },
}


def main():
    signal = SignalClient(BACKEND_URL)

    pipelines = {}
    for name, cfg in ZONES.items():
        p = ZonePipeline(name, cfg, signal=signal)
        p.start()
        pipelines[name] = p

    print(f"\nFeeds:")
    for name in pipelines:
        print(f"  {name:14s} http://localhost:{FEED_PORT}/feed/{name}")
    print(f"\nStreaming on port {FEED_PORT}. Ctrl+C to stop.\n")

    try:
        run_server(pipelines, port=FEED_PORT)
    except KeyboardInterrupt:
        for p in pipelines.values():
            p.stop()


if __name__ == "__main__":
    main()
