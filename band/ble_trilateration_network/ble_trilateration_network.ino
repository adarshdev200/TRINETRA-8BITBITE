/*
  BLE RSSI Trilateration + POST to backend
  ESP32 (receiver) + 3 phones (BLE beacons, fixed anchor positions, matched by name)

  Tabs in this sketch:
    - config.h            all constants (anchors, calibration, WiFi, server URL)
    - ble_scan.h/.cpp      BLE scanning + RSSI smoothing (matches by advertised name)
    - trilateration.h/.cpp RSSI->distance (per-anchor TX_POWER) + least-squares position solve
    - network.h/.cpp       WiFi connect + JSON POST to backend
    - this file            setup()/loop(), ties it all together

  Libraries needed (Library Manager):
    - ArduinoJson (Benoit Blanchon)
    - ESP32 BLE Arduino (bundled with the ESP32 board package)
*/

#include "config.h"
#include "ble_scan.h"
#include "trilateration.h"
#include "network.h"
#include "sos.h"

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("\n==================================================");
  Serial.println("   BLE Distance & Positioning Engine Active       ");
  Serial.println("==================================================");

  initBLE();
  connectWiFi();
  startNetworkTask();
  initSOS();
}

void loop() {
  scanAndUpdateRSSI();

  bool haveAllAnchors = !isnan(lastRssi[0]) && !isnan(lastRssi[1]) && !isnan(lastRssi[2]);

  if (haveAllAnchors) {
    float dist[3];
    Serial.println("\n--- Live Anchor Distance Estimates ---");
    for (int a = 0; a < 3; a++) {
      dist[a] = rssiToDistance(lastRssi[a], a);
      Serial.printf("Anchor %d [%s] -> RSSI: %.1f dBm | Calculated Dist: %.2f m\n",
                    a + 1, ANCHOR_NAME[a], lastRssi[a], dist[a]);
    }

    float posX, posY;
    if (trilaterate(ANCHOR_X, ANCHOR_Y, dist, posX, posY)) {
      Serial.printf(">> Computed 2D Position: (X = %.2f m, Y = %.2f m)\n", posX, posY);
      // Hand the fresh fix to the network task; it decides when to POST
      // (faster while in SOS, and it can resend this as last-known if the
      // signal drops during an SOS).
      updateFix(posX, posY);
    } else {
      Serial.println(">> Trilateration failed (Anchors collinear)");
    }
  } else {
    Serial.println("Scanning... Waiting for initial signals from all 3 phones.");
  }

  delay(200);
}
