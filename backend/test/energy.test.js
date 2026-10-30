import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateEnergyDelta,
  calculateImpact,
  isValidReading
} from "../src/utils/energy.js";

test("validates a complete meter reading", () => {
  assert.equal(isValidReading({
    deviceId: "ESP32_AC_001",
    voltage: 230,
    current: 5.2,
    power: 1196,
    energyKwh: 12.345,
    frequency: 50,
    powerFactor: 0.98
  }), true);
});

test("rejects invalid readings and out-of-range power factor", () => {
  assert.equal(isValidReading({ deviceId: " ", voltage: 230, current: 5, power: 1000, energyKwh: 2 }), false);
  assert.equal(isValidReading({ deviceId: "AC", voltage: -1, current: 5, power: 1000, energyKwh: 2 }), false);
  assert.equal(isValidReading({ deviceId: "AC", voltage: 230, current: 5, power: 1000, energyKwh: 2, powerFactor: 1.2 }), false);
});

test("uses first meter value as a zero-usage baseline", () => {
  assert.deepEqual(calculateEnergyDelta(null, 8.25), {
    deltaKwh: 0,
    resetDetected: false,
    baseline: true
  });
});

test("calculates consumption between cumulative meter values", () => {
  assert.deepEqual(calculateEnergyDelta(8.25, 8.75), {
    deltaKwh: 0.5,
    resetDetected: false,
    baseline: false
  });
});

test("flags a meter counter reset without inventing usage", () => {
  assert.deepEqual(calculateEnergyDelta(8.75, 0.12), {
    deltaKwh: 0,
    resetDetected: true,
    baseline: false
  });
});

test("calculates tariff cost and estimated grid emissions", () => {
  assert.deepEqual(calculateImpact(2, 7.5, 0.716), {
    estimatedCostInr: 15,
    estimatedCo2Kg: 1.432
  });
});
