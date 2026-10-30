# EcoTrack — Smart Energy & Sustainability Tracker

EcoTrack is a React + Vite energy-tracking application. It includes the original sustainability pages plus an AC Smart Monitor designed for an ESP32 + PZEM-004T energy meter.

## Start the website

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/mitans-gif/Frontend.git
cd Frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). Go to **AC Live Monitor** from the sidebar or open http://localhost:5173/monitor.

The monitor opens in **Demo data** mode so the UI can be explored without hardware or a database. Demo readings are simulated and clearly labelled. They must not be presented as real AC measurements.

To create a production frontend bundle:

```bash
npm run build
npm run preview
```

## Start the backend for real meter data

The backend is a separate Node.js service and requires MongoDB.

1. Install and run MongoDB locally, or create a MongoDB Atlas database.
2. In a second terminal:

```bash
cd backend
npm install
```

3. Copy `backend/.env.example` to `backend/.env`.
4. Set `MONGODB_URI`, a long random `DEVICE_API_KEY`, the correct electricity tariff, and an appropriate grid-emissions factor.
5. Start the API:

```bash
npm run dev
```

The API listens on http://localhost:5000. The frontend calls this address by default. If the API is hosted elsewhere, create a root `.env` file with:

```env
VITE_API_BASE_URL=https://your-api-host.example
```

Restart Vite after changing environment variables.

## AC monitor data flow

```text
Samsung AC circuit
       |
Qualified electrician installs correctly rated PZEM energy meter + CT
       |
PZEM low-voltage UART interface
       |
ESP32 (Wi-Fi)
       | HTTPS/HTTP POST + device API key
EcoTrack Express API
       |
MongoDB energy readings
       |
React AC Live Monitor
```

The ESP32 firmware starter is in `hardware/esp32-pzem/esp32-pzem.ino`. Update the Wi-Fi name/password, API URL, and device key before flashing. The API URL must be reachable from the ESP32. For a local development setup, use the computer's LAN IP address rather than `localhost`.

The firmware uses the PZEM-004T v3 Arduino library API as a starting point. Confirm the exact meter version and library compatibility before flashing. Check UART logic voltage: ESP32 GPIO is 3.3V and is not 5V tolerant; use an appropriate level shifter where required.

## API endpoints

- `GET /api/health` — API and MongoDB health
- `POST /api/readings` — receive a meter reading (requires `x-device-key`)
- `GET /api/readings/live?deviceId=ESP32_AC_001` — latest reading
- `GET /api/readings/history?deviceId=ESP32_AC_001&limit=100` — recent readings
- `GET /api/readings/analytics/daily?days=7` — daily kWh, estimated cost and CO₂
- `GET /api/readings/analytics/monthly?months=6` — monthly kWh, estimated cost and CO₂

## Measurement and calculation rules

- PZEM cumulative energy is stored as a meter counter in kWh.
- EcoTrack calculates the interval consumption from the difference between consecutive meter counters. The first reading establishes a baseline and therefore has zero interval usage.
- If the counter decreases (for example, after a meter reset), the reading is flagged and the interval is set to zero. Check the meter and establish a new baseline.
- Estimated electricity cost = interval kWh × configured INR/kWh tariff.
- Estimated grid emissions = interval kWh × configured kg CO₂/kWh factor.
- Cost and emissions are estimates. Set the tariff from the applicable electricity bill and use a documented, appropriate grid-emissions factor. Defaults in `.env.example` are illustrative configuration values, not official rates.

## Pages

- Landing page
- Energy dashboard
- Tracker and calculator
- AC Live Monitor (demo/live source switch)
- 4R's, recommendations, actions, goals, renewable energy and impact pages
- Profile

## Hardware and electrical safety

A normal non-Wi-Fi AC cannot provide live electrical measurements to a website by itself. An external meter and a data link are required.

**Mains installation must be performed and checked by a qualified electrician.** The meter, CT, enclosure, wiring and protection must be selected for the actual AC circuit and local electrical requirements. Never connect mains voltage to the ESP32, never handle exposed mains conductors, and do not assume every PZEM board has the same UART voltage or isolation design.

The exact AC capacity/model and circuit rating have not yet been verified. Do not purchase or install a meter solely from an assumed tonnage. Confirm the nameplate and circuit rating with the electrician first.

## Current project status

- Frontend demo monitor: available without hardware.
- Express/MongoDB API: implemented; requires environment configuration and a running MongoDB instance.
- ESP32 firmware starter: committed; requires exact meter/library verification and user-specific Wi-Fi/API credentials.
- Real AC measurements: **not active until the PZEM is purchased, safely installed, and the ESP32 is connected**.
