import mongoose from "mongoose";

const energyReadingSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true, trim: true },
    voltage: { type: Number, required: true, min: 0 },
    current: { type: Number, required: true, min: 0 },
    power: { type: Number, required: true, min: 0 },
    meterEnergyKwh: { type: Number, required: true, min: 0 },
    deltaKwh: { type: Number, default: 0, min: 0 },
    frequency: { type: Number, default: null, min: 0 },
    powerFactor: { type: Number, default: null, min: 0, max: 1 },
    resetDetected: { type: Boolean, default: false },
    recordedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

energyReadingSchema.index({ deviceId: 1, recordedAt: -1 });

export default mongoose.model("EnergyReading", energyReadingSchema);
