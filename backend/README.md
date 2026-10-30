# EcoTrack API (Phase 1)

This API receives measurements from one ESP32 + PZEM-004T energy monitor and stores them in MongoDB. It is designed for real hardware readings; no AC wattage or usage hours are guessed.

## Setup

1. Install Node.js 20 or newer and MongoDB (local or hosted).
2. From this folder run `npm install`.
3. Copy `.env.example` to `.env` and configure MongoDB, a long random `DEVICE_API_KEY`, electricity tariff and grid emission factor.
4. Run `npm run dev`.

The frontend is expected at `http://localhost:5173`. Change `CLIENT_ORIGIN` if needed.

## Device payload

Send a POST request to `/api/readings` with header `x-device-key: YOUR_DEVICE_API_KEY`:

```json
{
  "deviceId": "ESP32_AC_001",
  "voltage": 230.4,
  "current": 5.8,
  "power": 1325,
  "energyKwh": 12.345,
  "frequency": 50,
  "powerFactor": 0.98
}
```

These numbers are illustrative only. The ESP32 must send actual values read from the meter.

## Endpoints

- `GET /api/health`
- `POST /api/readings` (device key required)
- `GET /api/readings/live?deviceId=ESP32_AC_001`
- `GET /api/readings/history?deviceId=ESP32_AC_001&limit=100`
- `GET /api/readings/analytics/daily?days=7`
- `GET /api/readings/analytics/monthly?months=6`

Socket.IO broadcasts each accepted reading as `energy:reading`.

## Calculation notes

The PZEM cumulative energy counter is stored as `meterEnergyKwh`. The API derives usage from the difference between consecutive readings and stores it as `deltaKwh`. If the meter counter goes backwards (for example, after a reset), that reading is flagged and its delta is set to zero. The first reading has no previous baseline, so its delta is zero.

Estimated cost = measured kWh × configured INR/kWh tariff.
Estimated emissions = measured kWh × configured kg CO2/kWh factor.

Tariff and emission factor are configurable assumptions, not universal constants. Configure values appropriate to the electricity bill and chosen emissions source before presenting estimates as final.

## Safety

A qualified electrician must install and inspect the PZEM on the AC circuit. Never connect mains wiring to the ESP32, and never handle exposed mains conductors. Confirm the exact PZEM version, current transformer rating, isolation and UART voltage levels before connecting low-voltage electronics.
