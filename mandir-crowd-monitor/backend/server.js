import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server as SocketServer } from "socket.io";

import { getState, applyEvent, resetState, toStatus } from "./src/state.js";
import { upsertPosition, listPositions } from "./src/positions.js";
import { setOutsideCount, getOutside } from "./src/zones.js";
import { login, userFromToken } from "./src/auth.js";

const PORT = Number(process.env.PORT ?? 4000);
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/mandir";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: "*" } });

function broadcast(status) {
  io.emit("status", status);
}

// Combined per-zone snapshot for the dashboard's zone grid.
async function zonesPayload() {
  const s = toStatus(await getState());
  return {
    darshan: {
      occupancy: s.occupancy,
      capacity: s.capacity,
      gate: s.gate,
      overCapacity: s.overCapacity,
    },
    outside: getOutside(),
  };
}

async function broadcastZones() {
  io.emit("zones", await zonesPayload());
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// admin-panel login -> { token, user }
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const result = login(email, password);
  if (!result) return res.status(401).json({ error: "Invalid credentials" });
  res.json(result);
});

// verify a token and return the current user (dashboard checks this on load)
app.get("/api/auth/me", (req, res) => {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const user = token && userFromToken(token);
  if (!user) return res.status(401).json({ error: "unauthorized" });
  res.json({ user });
});

app.get("/api/status", async (_req, res) => {
  const state = await getState();
  res.json(toStatus(state));
});

// crossing events from the python side: { type: "enter"|"exit", camera }
app.post("/api/events", async (req, res) => {
  const { type, camera } = req.body;
  if (type !== "enter" && type !== "exit") {
    return res.status(400).json({ error: "type must be 'enter' or 'exit'" });
  }
  const status = await applyEvent(type, camera);
  broadcast(status);
  await broadcastZones();
  res.json(status);
});

app.post("/api/reset", async (_req, res) => {
  const status = await resetState();
  broadcast(status);
  await broadcastZones();
  res.json(status);
});

// TEST ONLY: force the gate OPEN/CLOSED to check the barricade LEDs without the
// CV pipeline. Sets the stored gate directly; a later enter/exit event still
// re-runs hysteresis, so this is for standalone LED/demo testing.
app.post("/api/gate", async (req, res) => {
  const { gate } = req.body ?? {};
  if (gate !== "OPEN" && gate !== "CLOSED") {
    return res.status(400).json({ error: "gate must be 'OPEN' or 'CLOSED'" });
  }
  const state = await getState();
  state.gate = gate;
  await state.save();
  const status = toStatus(state);
  broadcast(status);
  await broadcastZones();
  res.json(status);
});

// per-zone live count (e.g. the outside corridor): { count }
app.post("/api/zones/:zone", async (req, res) => {
  const { zone } = req.params;
  const { count } = req.body ?? {};
  if (zone !== "outside") return res.status(404).json({ error: "unknown zone" });
  if (typeof count !== "number") {
    return res.status(400).json({ error: "count must be a number" });
  }
  setOutsideCount(count);
  await broadcastZones();
  res.json({ ok: true });
});

app.get("/api/zones", async (_req, res) => {
  res.json(await zonesPayload());
});

// ESP32 devices post their position here every ~2s
app.post("/api/position", (req, res) => {
  const { mac_address, coordinates, is_active } = req.body ?? {};
  if (
    typeof mac_address !== "string" ||
    !coordinates ||
    typeof coordinates.x !== "number" ||
    typeof coordinates.y !== "number"
  ) {
    return res
      .status(400)
      .json({ error: "expected { mac_address, coordinates:{x,y}, is_active }" });
  }

  const active = is_active ?? true;
  // TEST: log every SOS-active report so we can see bands raising SOS in the terminal
  if (active) {
    console.log(
      `[SOS] band ${mac_address} ACTIVE at (${coordinates.x}, ${coordinates.y}) @ ${new Date().toISOString()}`
    );
  }
  upsertPosition({ mac_address, coordinates, is_active: active });
  io.emit("positions", listPositions());
  res.json({ ok: true });
});

app.get("/api/positions", (_req, res) => {
  res.json(listPositions());
});

io.on("connection", async (socket) => {
  const state = await getState();
  socket.emit("status", toStatus(state));
  socket.emit("zones", await zonesPayload());
});

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB:", MONGO_URI);
  server.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start backend:", err);
  process.exit(1);
});
