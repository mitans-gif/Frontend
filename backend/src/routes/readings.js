import { Router } from "express";
import EnergyReading from "../models/EnergyReading.js";

const router = Router();

const positiveNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

router.post("/", async (req, res, next) => {
  try {
    const {
      deviceId,
      voltage,
      current,
      power,
      energyKwh,
      frequency = null,
      powerFactor = null,
      recordedAt
    } = req.body;

    if (
      typeof deviceId !== "string" ||
      !deviceId.trim() ||
      ![voltage, current, power, energyKwh].every(positiveNumber) ||
      (frequency !== null && !positiveNumber(frequency)) ||
      (powerFactor !== null &&
        (typeof powerFactor !== "number" || powerFactor < 0 || powerFactor > 1))
    ) {
      return res.status(400).json({
        message: "Invalid reading. Send deviceId, voltage, current, power and energyKwh as valid numbers."
      });
    }

    const timestamp = recordedAt ? new Date(recordedAt) : new Date();
    if (Number.isNaN(timestamp.getTime())) {
      return res.status(400).json({ message: "recordedAt must be a valid date." });
    }

    const previous = await EnergyReading.findOne({ deviceId: deviceId.trim() })
      .sort({ recordedAt: -1 })
      .lean();

    const resetDetected = Boolean(previous && energyKwh < previous.meterEnergyKwh);
    const deltaKwh = previous && !resetDetected
      ? Math.max(0, energyKwh - previous.meterEnergyKwh)
      : 0;

    const reading = await EnergyReading.create({
      deviceId: deviceId.trim(),
      voltage,
      current,
      power,
      meterEnergyKwh: energyKwh,
      deltaKwh,
      frequency,
      powerFactor,
      resetDetected,
      recordedAt: timestamp
    });

    const tariff = Number(process.env.ELECTRICITY_TARIFF_INR_PER_KWH ?? 7.5);
    const emissionFactor = Number(process.env.GRID_EMISSION_KG_CO2_PER_KWH ?? 0.716);
    const payload = {
      id: reading._id,
      deviceId: reading.deviceId,
      voltage: reading.voltage,
      current: reading.current,
      power: reading.power,
      energyKwh: reading.meterEnergyKwh,
      deltaKwh: reading.deltaKwh,
      estimatedCostInr: Number((reading.deltaKwh * tariff).toFixed(2)),
      estimatedCo2Kg: Number((reading.deltaKwh * emissionFactor).toFixed(4)),
      frequency: reading.frequency,
      powerFactor: reading.powerFactor,
      resetDetected: reading.resetDetected,
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
    const deviceId = req.query.deviceId || "ESP32_AC_001";
    const reading = await EnergyReading.findOne({ deviceId }).sort({ recordedAt: -1 }).lean();
    if (!reading) return res.status(404).json({ message: "No readings found for this device." });

    const tariff = Number(process.env.ELECTRICITY_TARIFF_INR_PER_KWH ?? 7.5);
    const emissionFactor = Number(process.env.GRID_EMISSION_KG_CO2_PER_KWH ?? 0.716);
    return res.json({
      ...reading,
      energyKwh: reading.meterEnergyKwh,
      estimatedCostInr: Number((reading.deltaKwh * tariff).toFixed(2)),
      estimatedCo2Kg: Number((reading.deltaKwh * emissionFactor).toFixed(4))
    });
  } catch (error) {
    next(error);
  }
});

router.get("/history", async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId || "ESP32_AC_001";
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 1000);
    const readings = await EnergyReading.find({ deviceId })
      .sort({ recordedAt: -1 })
      .limit(limit)
      .lean();
    return res.json({ count: readings.length, readings });
  } catch (error) {
    next(error);
  }
});

router.get("/analytics/daily", async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId || "ESP32_AC_001";
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    from.setDate(from.getDate() - (days - 1));

    const rows = await EnergyReading.aggregate([
      { $match: { deviceId, recordedAt: { $gte: from } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$recordedAt", timezone: "Asia/Kolkata" }
          },
          energyKwh: { $sum: "$deltaKwh" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const tariff = Number(process.env.ELECTRICITY_TARIFF_INR_PER_KWH ?? 7.5);
    const emissionFactor = Number(process.env.GRID_EMISSION_KG_CO2_PER_KWH ?? 0.716);
    return res.json({
      deviceId,
      days: rows.map((row) => ({
        date: row._id,
        energyKwh: Number(row.energyKwh.toFixed(4)),
        estimatedCostInr: Number((row.energyKwh * tariff).toFixed(2)),
        estimatedCo2Kg: Number((row.energyKwh * emissionFactor).toFixed(4))
      }))
    });
  } catch (error) {
    next(error);
  }
});

router.get("/analytics/monthly", async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId || "ESP32_AC_001";
    const months = Math.min(Math.max(Number(req.query.months) || 6, 1), 24);
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

    const tariff = Number(process.env.ELECTRICITY_TARIFF_INR_PER_KWH ?? 7.5);
    const emissionFactor = Number(process.env.GRID_EMISSION_KG_CO2_PER_KWH ?? 0.716);
    return res.json({
      deviceId,
      months: rows.map((row) => ({
        month: row._id,
        energyKwh: Number(row.energyKwh.toFixed(4)),
        estimatedCostInr: Number((row.energyKwh * tariff).toFixed(2)),
        estimatedCo2Kg: Number((row.energyKwh * emissionFactor).toFixed(4))
      }))
    });
  } catch (error) {
    next(error);
  }
});

export default router;
