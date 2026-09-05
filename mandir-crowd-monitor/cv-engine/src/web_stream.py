# Serves each zone's latest annotated frame as an MJPEG stream the browser
# can render with a plain <img src="http://<host>:8090/feed/<zone>">.

import time

from flask import Flask, Response, jsonify
from flask_cors import CORS


def create_app(pipelines):
    app = Flask(__name__)
    CORS(app)  # let the frontend (different origin) load the feeds

    def mjpeg(pipeline):
        boundary = b"--frame"
        while True:
            jpeg = pipeline.get_jpeg()
            if jpeg is not None:
                yield (boundary + b"\r\n"
                       b"Content-Type: image/jpeg\r\n\r\n" + jpeg + b"\r\n")
            time.sleep(0.05)  # ~20 fps cap

    @app.route("/feed/<zone>")
    def feed(zone):
        p = pipelines.get(zone)
        if p is None:
            return ("unknown zone", 404)
        return Response(mjpeg(p),
                        mimetype="multipart/x-mixed-replace; boundary=frame")

    @app.route("/zones")
    def zones():
        return jsonify([
            {"name": name, "role": p.role, "people": p.people_now,
             "feed": f"/feed/{name}"}
            for name, p in pipelines.items()
        ])

    @app.route("/health")
    def health():
        return jsonify({"ok": True})

    @app.route("/")
    def viewer():
        # simple local viewer so you can eyeball all zone feeds at once
        cards = "".join(
            f'<div style="margin:8px"><h3 style="color:#D6A84F;'
            f'font-family:sans-serif">{name}</h3>'
            f'<img src="/feed/{name}" style="width:480px;border:1px solid #333"></div>'
            for name in pipelines
        )
        return (f'<body style="background:#07090D;display:flex;flex-wrap:wrap">'
                f'{cards}</body>')

    return app


def run_server(pipelines, host="0.0.0.0", port=8090):
    app = create_app(pipelines)
    # threaded so multiple feed connections don't block each other
    app.run(host=host, port=port, threaded=True, use_reloader=False)
