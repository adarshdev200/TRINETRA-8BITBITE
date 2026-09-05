import { test } from "node:test";
import assert from "node:assert/strict";
import { nextGateState, GATE_OPEN, GATE_CLOSED } from "../src/gate.js";

const LOW = 10;
const HIGH = 30;

test("closes when occupancy reaches HIGH", () => {
  assert.equal(nextGateState(30, GATE_OPEN, LOW, HIGH), GATE_CLOSED);
  assert.equal(nextGateState(31, GATE_OPEN, LOW, HIGH), GATE_CLOSED);
});

test("opens when occupancy drops to LOW", () => {
  assert.equal(nextGateState(10, GATE_CLOSED, LOW, HIGH), GATE_OPEN);
  assert.equal(nextGateState(5, GATE_CLOSED, LOW, HIGH), GATE_OPEN);
});

test("holds current state between the thresholds", () => {
  assert.equal(nextGateState(20, GATE_CLOSED, LOW, HIGH), GATE_CLOSED);
  assert.equal(nextGateState(20, GATE_OPEN, LOW, HIGH), GATE_OPEN);
});

test("full cycle: fill -> close -> drain -> open", () => {
  let gate = GATE_OPEN;
  gate = nextGateState(30, gate, LOW, HIGH);
  assert.equal(gate, GATE_CLOSED);
  gate = nextGateState(21, gate, LOW, HIGH);
  assert.equal(gate, GATE_CLOSED);
  gate = nextGateState(10, gate, LOW, HIGH);
  assert.equal(gate, GATE_OPEN);
});
