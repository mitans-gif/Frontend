export function isValidReading(input) {
  const { deviceId, voltage, current, power, energyKwh, frequency = null, powerFactor = null } = input ?? {};
  const nonNegative = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0;

  return (
    typeof deviceId === "string" &&
    deviceId.trim().length > 0 &&
    [voltage, current, power, energyKwh].every(nonNegative) &&
    (frequency === null || nonNegative(frequency)) &&
    (powerFactor === null ||
      (typeof powerFactor === "number" &&
        Number.isFinite(powerFactor) &&
        powerFactor >= 0 &&
        powerFactor <= 1))
  );
}

export function calculateEnergyDelta(previousMeterKwh, currentMeterKwh) {
  if (
    typeof currentMeterKwh !== "number" ||
    !Number.isFinite(currentMeterKwh) ||
    currentMeterKwh < 0
  ) {
    throw new TypeError("currentMeterKwh must be a finite non-negative number.");
  }

  if (previousMeterKwh === null || previousMeterKwh === undefined) {
    return { deltaKwh: 0, resetDetected: false, baseline: true };
  }

  if (
    typeof previousMeterKwh !== "number" ||
    !Number.isFinite(previousMeterKwh) ||
    previousMeterKwh < 0
  ) {
    throw new TypeError("previousMeterKwh must be null or a finite non-negative number.");
  }

  if (currentMeterKwh < previousMeterKwh) {
    return { deltaKwh: 0, resetDetected: true, baseline: false };
  }

  return {
    deltaKwh: Number((currentMeterKwh - previousMeterKwh).toFixed(6)),
    resetDetected: false,
    baseline: false
  };
}

export function calculateImpact(deltaKwh, tariffInrPerKwh, emissionKgPerKwh) {
  if (![deltaKwh, tariffInrPerKwh, emissionKgPerKwh].every(
    (value) => typeof value === "number" && Number.isFinite(value) && value >= 0
  )) {
    throw new TypeError("Impact calculation inputs must be finite non-negative numbers.");
  }

  return {
    estimatedCostInr: Number((deltaKwh * tariffInrPerKwh).toFixed(2)),
    estimatedCo2Kg: Number((deltaKwh * emissionKgPerKwh).toFixed(4))
  };
}

export function readNonNegativeEnv(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return fallback;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${name} must be a finite non-negative number.`);
  }
  return parsed;
}
