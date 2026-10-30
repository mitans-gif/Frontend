# EcoTrack — Smart Energy & Sustainability Tracker

EcoTrack is a React + Vite sustainability tracker with an AC energy-monitoring module designed for an ESP32 and a compatible external energy meter.

## 1. Run the frontend (Windows / VS Code)

From the repository root:

```powershell
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). The AC monitor is at `http://localhost:5173/monitor`.

The monitor starts in **Demo data** mode. Demo values are simulated for interface preview only; they are not readings from your AC.

## 2. Run the backend and MongoDB

The API needs a MongoDB database. You can run MongoDB locally or use MongoDB Atlas.

Open a second VS Code terminal:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env` and configure:
- `MONGODB_URI`: your local or Atlas MongoDB connection string
- `DEVICE_API_KEY`: a long random secret shared only with your ESP32
- `ELECTRICITY_TARIFF_INR_PER_KWH`: tariff from your electricity bill
- `GRID_EMISSION_KG_CO2_PER_KWH`: documented emissions factor
- `CLIENT_ORIGIN`: frontend origin (local default is correct for Vite)

Start the API:

```powershell
npm run dev
```

Open `http://localhost:5000/api/health`. A successful response should show `"status": "ok"` and `"database": "connected"`.

To run backend unit tests (no database needed):

```powershell
npm test
```

For frontend live mode, create a root `.env` file only if your API is not at `http://localhost:5000`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Restart Vite after changing environment variables.

## 3. Hardware data flow

```text
AC electrical circuit
  -> correctly rated meter installed by a qualified electrician
  -> low-voltage meter interface
  -> ESP32 Wi-Fi
  -> Express API
  -> MongoDB
  -> React AC Live Monitor
```

Firmware starter: `hardware/esp32-pzem/esp32-pzem.ino`.

Before flashing, update the Wi-Fi name/password, API URL and device API key. For a local server, use your computer's LAN IP in the firmware (not `localhost`). The ESP32 and computer must be able to reach each other on the network.

## 4. API endpoints

- `GET /api/health` — API and database health
- `POST /api/readings` — store meter reading (requires `x-device-key`)
- `GET /api/readings/live?deviceId=ESP32_AC_001` — latest reading
- `GET /api/readings/history?deviceId=ESP32_AC_001&limit=100` — recent readings
- `GET /api/readings/analytics/daily?days=7` — daily kWh, cost and CO₂ estimate
- `GET /api/readings/analytics/monthly?months=6` — monthly kWh, cost and CO₂ estimate

The first cumulative meter reading establishes a baseline. Usage is calculated from the difference between consecutive cumulative kWh readings. A counter reset is flagged and does not create fictitious consumption.

## 5. Included pages

- Landing page and energy dashboard
- Tracker and calculator
- AC Live Monitor (demo/live data source)
- 4R's, recommendations, actions and goals
- Renewable energy, impact and profile pages

## 6. Safety and current limitations

**Mains electrical installation must be done and checked by a qualified electrician.** The meter, CT, enclosure, wiring and protection must be selected for the actual AC circuit and local requirements. Never connect mains voltage to ESP32 GPIO or handle exposed mains conductors. ESP32 GPIO is 3.3 V and is not 5 V tolerant; verify the exact meter's UART voltage and isolation before connecting it.

The exact Samsung AC model and circuit rating have not been verified. Do not buy or install a meter based on assumed AC tonnage. Have an electrician check the nameplate and circuit first.

**Software status:** frontend, Express API, MongoDB data model, telemetry endpoints, ESP32 starter firmware and backend unit tests are in the repository. Live measurements require your MongoDB configuration and physical hardware installation. Demo mode is not real monitoring.

## 7. Production build

```powershell
npm run build
npm run preview
```

The frontend can be deployed to Vercel. Set `VITE_API_BASE_URL` to the deployed backend URL in the Vercel project environment variables. Deploy the backend separately with its MongoDB and device secrets configured; do not put the device API key in frontend environment variables.
