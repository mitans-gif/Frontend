# EcoTrack API

Express API for storing real measurements from an ESP32 + energy meter. It does not generate AC readings or infer usage from assumed wattage.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm
- MongoDB locally, or a MongoDB Atlas cluster
- A meter/ESP32 configured to send actual readings

## Windows setup (PowerShell)

From the repository root, open a second VS Code terminal:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Open `backend/.env` and set `MONGODB_URI`, `DEVICE_API_KEY`, the electricity tariff from your bill, and a documented grid-emissions factor. Then start the API:

```powershell
npm run dev
```

The API starts at `http://localhost:5000` only after it can connect to MongoDB. Test it by opening `http://localhost:5000/api/health`. A healthy response reports `"status": "ok"` and `"database": "connected"`.

For a hosted MongoDB Atlas database, create a database user, allow the development machine's IP address in Network Access, copy the Node.js connection string, and replace its password placeholder. Do not commit `.env` or share the connection string.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default 5000) |
| `MONGODB_URI` | MongoDB connection string (required) |
| `CLIENT_ORIGIN` | Comma-separated allowed browser origins |
| `DEFAULT_DEVICE_ID` | Default device name (default `ESP32_AC_001`) |
| `DEVICE_API_KEY` | Secret required for device POST requests |
| `ELECTRICITY_TARIFF_INR_PER_KWH` | Tariff used for estimates |
| `GRID_EMISSION_KG_CO2_PER_KWH` | Emissions factor used for estimates |

## API endpoints

- `GET /api/health` — API and MongoDB status
- `POST /api/readings` — store one reading; requires `x-device-key`
- `GET /api/readings/live?deviceId=ESP32_AC_001` — latest reading
- `GET /api/readings/history?deviceId=ESP32_AC_001&limit=100` — recent readings
- `GET /api/readings/analytics/daily?days=7` — daily consumption/cost/emissions
- `GET /api/readings/analytics/monthly?months=6` — monthly consumption/cost/emissions

Example device payload (illustrative shape only; values must come from the actual meter):

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

## Data rules

- The cumulative meter counter is stored as `meterEnergyKwh`.
- Usage is calculated as the difference between consecutive counter values.
- The first reading is a baseline and has zero interval usage.
- A counter decrease is flagged as a reset; the API does not invent usage for that interval.
- Estimated cost = interval kWh × configured INR/kWh tariff.
- Estimated emissions = interval kWh × configured kg CO₂/kWh factor.
- These are estimates; use the tariff from the electricity bill and a credible, documented emissions factor.

## API/database smoke test

For a safe end-to-end API/database smoke test (the values are simulated and use a separate device ID, so they cannot be mistaken for your real AC device), keep the backend running and open a second terminal in `backend`:

```powershell
npm run test:reading
```

Then verify the stored test record at `http://localhost:5000/api/readings/live?deviceId=ESP32_AC_001_TEST`. This test requires `DEVICE_API_KEY` in your local `.env` and does not send or expose the key to the frontend.

## Tests

Run the backend unit tests without a database:

```powershell
npm test
```

## Electrical safety

A qualified electrician must select, install and inspect the correctly rated meter/CT, enclosure, wiring and protection for the AC circuit. Never connect mains voltage to ESP32 GPIO or handle exposed mains conductors. ESP32 GPIO is 3.3 V and is not 5 V tolerant; verify the exact meter's UART interface and isolation before connecting it. The existing sketch is a hardware starter, not proof that a particular PZEM board is safe or compatible.
