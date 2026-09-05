import { State, Event } from "./models.js";
import { nextGateState } from "./gate.js";

const CAPACITY = Number(process.env.CAPACITY ?? 30);
const GATE_LOW = Number(process.env.GATE_LOW ?? 10);
const GATE_HIGH = Number(process.env.GATE_HIGH ?? 30);

// Demo/gate dynamics:
// - ENTER_WEIGHT/EXIT_WEIGHT let entries outpace exits so the hall fills during
//   peak (also corrects the detector's undercount of dense crowds).
// - GATE_BLOCKS_ENTRY: a CLOSED gate physically stops people entering, so
//   entries are ignored while closed and only exits drain the room.
const ENTER_WEIGHT = Number(process.env.ENTER_WEIGHT ?? 1);
const EXIT_WEIGHT = Number(process.env.EXIT_WEIGHT ?? 1);
const GATE_BLOCKS_ENTRY = (process.env.GATE_BLOCKS_ENTRY ?? "true") !== "false";

export async function getState() {
  let state = await State.findById("current");
  if (!state) state = await State.create({ _id: "current" });
  return state;
}

export async function applyEvent(type, camera) {
  const state = await getState();

  if (type === "enter") {
    // a closed gate blocks entry -> ignore enters while CLOSED
    if (!(GATE_BLOCKS_ENTRY && state.gate === "CLOSED")) {
      // cap at capacity so occupancy never overshoots (clean 20/20)
      const before = state.occupancy;
      state.occupancy = Math.min(CAPACITY, state.occupancy + ENTER_WEIGHT);
      state.totalEntries += state.occupancy - before;
    }
  } else if (type === "exit") {
    // don't go negative - an exit on an empty room is a miscount
    if (state.occupancy > 0) {
      state.occupancy = Math.max(0, state.occupancy - EXIT_WEIGHT);
      state.totalExits += EXIT_WEIGHT;
    }
  } else {
    throw new Error(`Unknown event type: ${type}`);
  }

  state.gate = nextGateState(state.occupancy, state.gate, GATE_LOW, GATE_HIGH);
  await state.save();
  await Event.create({ type, camera });

  return toStatus(state);
}

export async function resetState() {
  const state = await getState();
  state.occupancy = 0;
  state.totalEntries = 0;
  state.totalExits = 0;
  state.gate = nextGateState(0, state.gate, GATE_LOW, GATE_HIGH);
  await state.save();
  return toStatus(state);
}

export function toStatus(state) {
  return {
    occupancy: state.occupancy,
    capacity: CAPACITY,
    gate: state.gate,
    overCapacity: state.occupancy > CAPACITY,
    totalEntries: state.totalEntries,
    totalExits: state.totalExits,
    thresholds: { low: GATE_LOW, high: GATE_HIGH },
    updatedAt: state.updatedAt,
  };
}
