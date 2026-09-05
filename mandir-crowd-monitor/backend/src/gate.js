// Gate decision with hysteresis: close at/above `high`, reopen at/below
// `low`, and hold the current state in between so it doesn't flap.
// OPEN = green LED, CLOSED = red.

export const GATE_OPEN = "OPEN";
export const GATE_CLOSED = "CLOSED";

export function nextGateState(occupancy, currentState, low, high) {
  if (occupancy >= high) return GATE_CLOSED;
  if (occupancy <= low) return GATE_OPEN;
  return currentState;
}
