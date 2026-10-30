const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || `EcoTrack API request failed (${response.status})`);
  }

  return payload;
}

export const energyApi = {
  health: () => request("/api/health"),

  live: (deviceId = "ESP32_AC_001") =>
    request(`/api/readings/live?deviceId=${encodeURIComponent(deviceId)}`),

  history: (deviceId = "ESP32_AC_001", limit = 100) =>
    request(
      `/api/readings/history?deviceId=${encodeURIComponent(deviceId)}&limit=${limit}`
    ),

  daily: (days = 7, deviceId = "ESP32_AC_001") =>
    request(
      `/api/readings/analytics/daily?days=${days}&deviceId=${encodeURIComponent(deviceId)}`
    ),

  monthly: (months = 6, deviceId = "ESP32_AC_001") =>
    request(
      `/api/readings/analytics/monthly?months=${months}&deviceId=${encodeURIComponent(deviceId)}`
    )
};

export default energyApi;
