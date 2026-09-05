import mongoose from "mongoose";

// single row for the room's current state (fixed _id so there's only one)
const stateSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "current" },
    occupancy: { type: Number, default: 0 },
    gate: { type: String, default: "OPEN" },
    totalEntries: { type: Number, default: 0 },
    totalExits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// log of every crossing, for history later
const eventSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["enter", "exit"], required: true },
    camera: { type: String },
  },
  { timestamps: true }
);

export const State = mongoose.model("State", stateSchema);
export const Event = mongoose.model("Event", eventSchema);
