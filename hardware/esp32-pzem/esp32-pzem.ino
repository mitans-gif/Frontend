/*
 * EcoTrack: ESP32 + PZEM-004T telemetry starter
 *
 * Install Arduino libraries:
 *   - PZEM-004T v30 by Jakub Mandula (confirm compatibility with your exact PZEM board)
 *
 * IMPORTANT:
 *   - This sketch only covers LOW-VOLTAGE UART, Wi-Fi and HTTP communication.
 *   - A qualified electrician must install and inspect the PZEM on the AC circuit.
 *   - Never connect AC mains to ESP32 pins.
 *   - Verify the PZEM UART voltage levels for your exact module; use suitable level
 *     shifting if required. ESP32 GPIO is not 5V tolerant.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <PZEM004Tv30.h>

const char* WIFI_SSID = "YOUR_WIFI_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
const char* API_URL = "http://YOUR_COMPUTER_LAN_IP:5000/api/readings";
const char* DEVICE_API_KEY = "REPLACE_WITH_DEVICE_API_KEY";
const char* DEVICE_ID = "ESP32_AC_001";

static const int PZEM_RX_PIN = 16; // ESP32 RX2; connect to PZEM TX through suitable interface
static const int PZEM_TX_PIN = 17; // ESP32 TX2; connect to PZEM RX through suitable interface
static const unsigned long SEND_INTERVAL_MS = 10000;

HardwareSerial pzemSerial(2);
PZEM004Tv30 pzem(pzemSerial, PZEM_RX_PIN, PZEM_TX_PIN);
unsigned long lastSend = 0;

void connectWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to Wi-Fi");
  unsigned long started = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - started < 20000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Wi-Fi connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("Wi-Fi connection timed out; will retry.");
  }
}

void sendReading(float voltage, float current, float power, float energy,
                 float frequency, float powerFactor) {
  if (WiFi.status() != WL_CONNECTED) return;

  WiFiClient client;
  HTTPClient http;
  http.setTimeout(5000);

  if (!http.begin(client, API_URL)) {
    Serial.println("Could not initialize HTTP connection.");
    return;
  }

  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-device-key", DEVICE_API_KEY);

  String payload = "{";
  payload += "\"deviceId\":\"" + String(DEVICE_ID) + "\",";
  payload += "\"voltage\":" + String(voltage, 2) + ",";
  payload += "\"current\":" + String(current, 3) + ",";
  payload += "\"power\":" + String(power, 2) + ",";
  payload += "\"energyKwh\":" + String(energy, 3) + ",";
  payload += "\"frequency\":" + String(frequency, 2) + ",";
  payload += "\"powerFactor\":" + String(powerFactor, 3);
  payload += "}";

  int responseCode = http.POST(payload);
  Serial.printf("API response: %d\n", responseCode);
  if (responseCode > 0) Serial.println(http.getString());
  http.end();
}

void setup() {
  Serial.begin(115200);
  pzemSerial.begin(9600, SERIAL_8N1, PZEM_RX_PIN, PZEM_TX_PIN);
  connectWiFi();
}

void loop() {
  connectWiFi();

  if (millis() - lastSend >= SEND_INTERVAL_MS) {
    lastSend = millis();

    float voltage = pzem.voltage();
    float current = pzem.current();
    float power = pzem.power();
    float energy = pzem.energy();
    float frequency = pzem.frequency();
    float powerFactor = pzem.pf();

    // Reject invalid/unavailable sensor values instead of sending fake zeros.
    if (isnan(voltage) || isnan(current) || isnan(power) || isnan(energy)) {
      Serial.println("PZEM read failed; check meter model, UART interface and connection.");
    } else {
      Serial.printf("V=%.1f V, I=%.3f A, P=%.1f W, E=%.3f kWh\n",
                    voltage, current, power, energy);
      sendReading(voltage, current, power, energy, frequency, powerFactor);
    }
  }

  delay(50);
}
