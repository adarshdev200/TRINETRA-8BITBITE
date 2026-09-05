// Per-zone extras that aren't part of the darshan occupancy/gate state.
// Right now that's just the outside corridor's live people count (in memory).

let outside = { count: 0, updatedAt: 0 };

export function setOutsideCount(count) {
  outside = { count: Number(count) || 0, updatedAt: Date.now() };
}

export function getOutside() {
  return outside;
}
