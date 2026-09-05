// Latest position per ESP32 device, kept in memory (only the newest fix
// matters, so no DB here). A device counts as offline after STALE_MS of silence.

const STALE_MS = 10_000;

const devices = new Map();

export function upsertPosition({ mac_address, coordinates, is_active }) {
  devices.set(mac_address, {
    mac_address,
    x: coordinates.x,
    y: coordinates.y,
    isActive: is_active,
    lastSeen: Date.now(),
  });
}

export function listPositions() {
  const now = Date.now();
  return [...devices.values()].map((d) => ({
    mac_address: d.mac_address,
    x: d.x,
    y: d.y,
    // is_active from the band means "this band is in SOS"
    isActive: d.isActive,
    sos: d.isActive,
    online: now - d.lastSeen <= STALE_MS,
    lastSeen: d.lastSeen,
  }));
}
