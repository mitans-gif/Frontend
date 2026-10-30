import { Router } from "express";
import EnergyReading from "../models/EnergyReading.js";
import {
  calculateEnergyDelta,
  calculateImpact,
  isValidReading,
  readNonNegativeEnv
} from "../utils/energy.js";

const router = Router();
const DEFAULT_DEVICE_ID = process.env.DEFAULT_DEVICE_ID || "ESP32_AC_001";

function getImpactSettings() {
  return {
    tariff: readNonNegativeEnv("ELECTRICITY_TARIFF_INR_PER_KWH", 7.5),
    emissionFactor: readNonNegativeEnv("GRID_EMISSION_KG_CO2_PER_KWH", 0.716)
  };
}

function getDeviceId(value) {
  const deviceId = typeof value === "string" ? value.trim() : DEFAULT_DEVICE_ID;
  return deviceId && deviceId.length <= 100 ? deviceId : null;
}

router.post("/", async (req, res, next) => {
  try {
    const body = {
      ...req.body,
      frequency: req.body?.frequency ?? null,
      powerFactor: req.body?.powerFactor ?? null
    };

    if (!isValidReading(body)) {
      return res.status(400).json({
        message: "Invalid reading. Provide a deviceId and finite non-negative voltage, current, power and energyKwh values. powerFactor must be between 0 and 1."
      });
    }

    if (body.deviceId.trim().length > 100) {
      return res.status(400).json({ message: "deviceId must be 100 characters or fewer." });
    }

    const timestamp = body.recordedAt ? new Date(body.recordedAt) : new Date();
    if (Number.isNaN(timestamp.getTime())) {
      return res.status(400).json({ message: "recordedAt must be a valid date." });
    }
    if (timestamp.getTime() > Date.now() + 5 * 60 * 1000) {
      return res.status(400).json({ message: "recordedAt cannot be more than five minutes in the future." });
    }

    const previous = await EnergyReading.findOne({ deviceId: body.deviceId.trim() })
      .sort({ recordedAt: -1 })
      .lean();
    const energyDelta = calculateEnergyDelta(previous?.meterEnergyKwh ?? null, body.energyKwh);
    const reading = await EnergyReading.create({
      deviceId: body.deviceId.trim(),
      voltage: body.voltage,
      current: body.current,
      power: body.power,
      meterEnergyKwh: body.energyKwh,
      deltaKwh: energyDelta.deltaKwh,
      frequency: body.frequency,
      powerFactor: body.powerFactor,
      resetDetected: energyDelta.resetDetected,
      recordedAt: timestamp
    });

    const { tariff, emissionFactor } = getImpactSettings();
    const impact = calculateImpact(reading.deltaKwh, tariff, emissionFactor);
    const payload = {
      id: reading._id,
      deviceId: reading.deviceId,
      voltage: reading.voltage,
      current: reading.current,
      power: reading.power,
      energyKwh: reading.meterEnergyKwh,
      deltaKwh: reading.deltaKwh,
      ...impact,
      frequency: reading.frequency,
      powerFactor: reading.powerFactor,
      resetDetected: reading.resetDetected,
      baseline: energyDelta.baseline,
      recordedAt: reading.recordedAt
    };

    req.app.get("io")?.emit("energy:reading", payload);
    return res.status(201).json({ message: "Reading stored.", reading: payload });
  } catch (error) {
    next(error);
  }
});

router.get("/live", async (req, res, next) => {
  try {
    const deviceId = getDeviceId(req.query.deviceId);
    if (!deviceId) return res.status(400).json({ message: "Invalid deviceId." });

    const reading = await EnergyReading.findOne({ deviceId }).sort({ recordedAt: -1 }).lean();
    if (!reading) return res.status(404).json({ message: "No readings found for this device." });

    const { tariff, emissionFactor } = getImpactSettings();
    return res.json({
      ...reading,
      energyKwh: reading.meterEnergyKwh,
      ...calculateImpact(reading.deltaKwh, tariff, emissionFactor)
    });
  } catch (error) {
    next(error);
  }
});

router.get("/history", async (req, res, next) => {
  try {
    const deviceId = getDeviceId(req.query.deviceId);
    if (!deviceId) return res.status(400).json({ message: "Invalid deviceId." });
    const requestedLimit = Number(req.query.limit) || 100;
    const limit = Math.min(Math.max(Math.floor(requestedLimit), 1), 1000);
    const readings = await EnergyReading.find({ deviceId })
      .sort({ recordedAt: -1 })
      .limit(limit)
      .lean();
    return res.json({ deviceId, count: readings.length, readings });
  } catch (error) {
    next(error);
  }
});

router.get("/analytics/daily", async (req, res, next) => {
  try {
    const deviceId = getDeviceId(req.query.deviceId);
    if (!deviceId) return res.status(400).json({ message: "Invalid deviceId." });
    const days = Math.min(Math.max(Math.floor(Number(req.query.days) || 7), 1), 90);
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    from.setDate(from.getDate() - (days - 1));

    const rows = await EnergyReading.aggregate([
      { $match: { deviceId, recordedAt: { $gte: from } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$recordedAt", timezone: "Asia/Kolkata" } },
          energyKwh: { $sum: "$deltaKwh" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const { tariff, emissionFactor } = getImpactSettings();
    return res.json({
      deviceId,
      days: rows.map((row) => ({
        date: row._id,
        energyKwh: Number(row.energyKwh.toFixed(4)),
        ...calculateImpact(row.energyKwh, tariff, emissionFactor)
      }))
    });
  } catch (error) {
    next(error);
  }
});

router.get("/analytics/monthly", async (req, res, next) => {
  try {
    const deviceId = getDeviceId(req.query.deviceId);
    if (!deviceId) return res.status(400).json({ message: "Invalid deviceId." });
    const months = Math.min(Math.max(Math.floor(Number(req.query.months) || 6), 1), 24);
    const from = new Date();
    from.setDate(1);
    from.setHours(0, 0, 0, 0);
    from.setMonth(from.getMonth() - (months - 1));

    const rows = await EnergyReading.aggregate([
      { $match: { deviceId, recordedAt: { $gte: from } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$recordedAt", timezone: "Asia/Kolkata" } },
          energyKwh: { $sum: "$deltaKwh" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const { tariff, emissionFactor } = getImpactSettings();
    return res.json({
      deviceId,
      months: rows.map((row) => ({
        month: row._id,
        energyKwh: Number(row.energyKwh.toFixed(4)),
        ...calculateImpact(row.energyKwh, tariff, emissionFactor)
      }))
    });
  } catch (error) {
    next(error);
  }
});

export default router;
