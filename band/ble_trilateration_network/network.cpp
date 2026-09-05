#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "network.h"
#include "config.h"
#include "sos.h"

// ---- shared latest fix (written by loop, read by the network task) ----
static SemaphoreHandle_t fixMutex;
static bool haveFix = false;
static float fixX = 0, fixY = 0;
static unsigned long fixTime = 0;

// The band's identifier, read from the chip once WiFi is up.
static String deviceMac;

void connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  deviceMac = WiFi.macAddress();  // unique per board -> used as mac_address
  Serial.println("\nConnected. IP: " + WiFi.localIP().toString());
  Serial.println("Device MAC: " + deviceMac);
}

void updateFix(float x, float y) {
  xSemaphoreTake(fixMutex, portMAX_DELAY);
  fixX = x;
  fixY = y;
  fixTime = millis();
  haveFix = true;
  xSemaphoreGive(fixMutex);
}

// Actually POST one position. Returns true on HTTP 2xx.
static bool postPosition(float x, float y, bool isActive) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected, skipping send");
    return false;
  }

  // Pick the transport to match SERVER_URL's scheme (see USE_HTTPS in config.h).
  WiFiClient client;
  WiFiClientSecure secureClient;

  HTTPClient http;
  if (USE_HTTPS) {
    secureClient.setInsecure();  // skips TLS cert validation -- fine for prototyping
    http.begin(secureClient, SERVER_URL);
  } else {
    http.begin(client, SERVER_URL);  // plain HTTP, e.g. local laptop backend
  }
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(15000);  // Render free tier cold starts can take 30-60s

  StaticJsonDocument<256> doc;
  doc["mac_address"] = deviceMac;
  JsonObject coordinates = doc.createNestedObject("coordinates");
  coordinates["x"] = x;
  coordinates["y"] = y;
  doc["is_active"] = isActive;  // is_active == this band is in SOS

  String payload;
  serializeJson(doc, payload);

  Serial.println("Sending: " + payload);
  int httpCode = http.POST(payload);

  bool success = false;
  if (httpCode > 0) {
    Serial.printf("HTTP response code: %d\n", httpCode);
    Serial.println("Response: " + http.getString());
    success = (httpCode >= 200 && httpCode < 300);
  } else {
    Serial.printf("POST failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
  return success;
}

static void networkTask(void* pv) {
  unsigned long lastSend = 0;

  for (;;) {
    bool sos = sosActive();
    unsigned long interval = sos ? SEND_INTERVAL_SOS_MS : SEND_INTERVAL_MS;
    unsigned long now = millis();

    if (now - lastSend >= interval) {
      // grab a snapshot of the latest fix
      bool have;
      float x, y;
      unsigned long age;
      xSemaphoreTake(fixMutex, portMAX_DELAY);
      have = haveFix;
      x = fixX;
      y = fixY;
      age = now - fixTime;
      xSemaphoreGive(fixMutex);

      // In SOS, send even a stale (last-known) fix so the alert always goes out.
      // Normally, only send a fix that's still fresh.
      if (have && (sos || age <= FIX_FRESH_MS)) {
        postPosition(x, y, sos);
        lastSend = now;
      }
    }

    vTaskDelay(pdMS_TO_TICKS(50));
  }
}

void startNetworkTask() {
  fixMutex = xSemaphoreCreateMutex();
  // 16 KB stack: the TLS handshake (WiFiClientSecure) is stack-hungry. Pinned to core 1.
  xTaskCreatePinnedToCore(networkTask, "netTask", 16384, NULL, 1, NULL, 1);
}
