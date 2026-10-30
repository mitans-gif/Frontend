import "dotenv/config";

const apiUrl = `http://localhost:${process.env.PORT || 5000}/api/readings`;
const deviceKey = process.env.DEVICE_API_KEY;

if (!deviceKey) {
  console.error("DEVICE_API_KEY is missing. Set it in backend/.env first.");
  process.exit(1);
}

const testReading = {
  deviceId: "ESP32_AC_001_TEST",
  voltage: 230.2,
  current: 2.15,
  power: 485,
  energyKwh: 1.234,
  frequency: 50,
  powerFactor: 0.98
};

try {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-device-key": deviceKey
    },
    body: JSON.stringify(testReading)
  });
  const result = await response.json();
  if (!response.ok) {
    console.error(`Test reading failed (${response.status}):`, result);
    process.exit(1);
  }
  console.log("TEST READING STORED — this is simulated test data, not a real AC measurement.");
  console.log(JSON.stringify(result, null, 2));
  console.log("\nVerify it at: http://localhost:5000/api/readings/live?deviceId=ESP32_AC_001_TEST");
} catch (error) {
  console.error("Could not reach EcoTrack API. Make sure the backend is running.", error.message);
  process.exit(1);
}
