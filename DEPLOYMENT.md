# TRINETRA — Deployment Guide

Target stack: **Render** (Node backend) · **MongoDB Atlas** (database) · **Vercel** (React frontend).
The **CV engine, ESP32 band, and barricade agent stay local** and are re-pointed at the
deployed backend's public URL.

```
                 (cloud)                                   (local / on-device)
  Vercel frontend ──REST+socket──▶ Render backend ◀──POST── CV engine (laptop, sees cameras)
                                        │  ▲                 ESP32 band (WiFi)
                                   Atlas MongoDB              barricade agent ─USB─ Pico
```

---

## 0. Put the code on GitHub (Render + Vercel deploy from a repo)

Git was removed from this folder, so re-init and push to a fresh repo:

```bash
cd ~/Desktop/Trinetra
git init && git add . && git commit -m "TRINETRA — deploy"
# create an EMPTY repo on github.com first, then:
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main && git push -u origin main
```

> `.env` files, `venv/`, and `*.pt` weights are gitignored — good, they must not be pushed.

---

## 1. MongoDB Atlas (free M0)

1. https://cloud.mongodb.com → create a **free M0 cluster**.
2. **Database Access** → add a user (username + password).
3. **Network Access** → add IP `0.0.0.0/0` (Render's outbound IPs are dynamic on free tier).
4. **Connect → Drivers** → copy the SRV string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/mandir?retryWrites=true&w=majority`
   — make sure the DB name **`/mandir`** is in the path (add it before the `?`).

---

## 2. Backend → Render

1. https://dashboard.render.com → **New + → Blueprint** → connect your GitHub repo.
   Render reads [`render.yaml`](render.yaml) and provisions **trinetra-backend** (root dir
   `mandir-crowd-monitor/backend`, `npm install` / `npm start`, health check `/api/health`).
2. When prompted, set **`MONGO_URI`** = the Atlas SRV string from step 1.
   (`JWT_SECRET` is auto-generated; gate/capacity vars come from the blueprint.)
3. Deploy. Note the URL, e.g. `https://trinetra-backend.onrender.com`.
4. Verify: open `https://trinetra-backend.onrender.com/api/health` → `{"ok":true}`.

> **Free tier cold start:** the service sleeps after ~15 min idle and takes 30–60s to wake.
> The ESP32 firmware already uses a 15s HTTP timeout and keeps retrying, so this is fine.

---

## 3. Frontend → Vercel

1. https://vercel.com → **Add New → Project** → import the same repo.
2. **Root Directory** → set to `trinetra-frontend`. Framework auto-detects as **Vite**
   (build `npm run build`, output `dist`; [`vercel.json`](trinetra-frontend/vercel.json)
   also adds the SPA rewrite so `/dashboard` etc. don't 404 on refresh).
3. **Environment Variables** — add these (Production), pointing at your Render URL:
   ```
   VITE_API_URL    = https://trinetra-backend.onrender.com/api
   VITE_SOCKET_URL = https://trinetra-backend.onrender.com
   VITE_FEED_URL   = http://<your-cv-laptop-ip>:8090     # see note below
   ```
4. Deploy. Open the Vercel URL → **Admin Login** → `admin@trinetra.com` / `admin123`.

> **Live Monitoring MJPEG feeds:** these come from the CV engine on your laptop (`:8090`),
> which the cloud frontend can't reach directly. For a demo, expose it with a tunnel:
> `ngrok http 8090` → set `VITE_FEED_URL` to the `https://...ngrok...` URL and redeploy.
> Occupancy, gate, and SOS alerts do **not** need this — they flow through the backend.

---

## 4. Re-point the local components at the Render backend

**CV engine** (laptop that sees the cameras):
```bash
cd ~/Desktop/Trinetra/mandir-crowd-monitor/cv-engine && source venv/bin/activate
BACKEND_URL=https://trinetra-backend.onrender.com python main.py
```

**ESP32 band** — in `band/ble_trilateration_network/config.h`:
```c
static const bool  USE_HTTPS  = true;   // Render is https
static const char* SERVER_URL = "https://trinetra-backend.onrender.com/api/position";
```
(also set your real `WIFI_SSID` / `WIFI_PASSWORD` and the 3 `ANCHOR_NAME`s), then re-flash.

**Barricade agent** (host with the Pico on USB):
```bash
cd ~/Desktop/Trinetra/barricade
BACKEND_URL=https://trinetra-backend.onrender.com SERIAL_PORT=/dev/tty.usbmodemXXXX python agent.py
```

---

## 5. Smoke test the deployed stack

```bash
BACKEND=https://trinetra-backend.onrender.com
curl -s $BACKEND/api/health                    # {"ok":true}
curl -s -XPOST $BACKEND/api/reset               # gate OPEN, occupancy 0
# fire a test SOS -> should appear on the Vercel /alerts page:
curl -s -XPOST $BACKEND/api/position -H 'Content-Type: application/json' \
  -d '{"mac_address":"00:1A:2B:3C:4D:5E","coordinates":{"x":12.5,"y":45.2},"is_active":true}'
```

---

## Notes / gotchas
- **CORS is open** (`*`) on the backend by design so the CV engine and ESP32 can POST freely.
- **Env vars are baked at build time on Vercel** — after changing any `VITE_*`, redeploy.
- **Atlas free tier** pauses after long inactivity; the first request wakes it.
- Keep `JWT_SECRET` and the Atlas password out of git (they live only in Render/Atlas).
