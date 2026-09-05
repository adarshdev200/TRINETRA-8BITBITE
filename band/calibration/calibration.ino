/*
  BLE Calibration Tool for ESP32
  Run this script ONCE per phone at 1.0 meter line-of-sight distance
  to determine exact per-phone TX_POWER constants.
*/

#include <BLEDevice.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>

// Change this name to target one phone at a time ("Redmi", "Anand", or "Shub")
const String TARGET_PHONE_NAME = "Redmi"; 
const int REQUIRED_SAMPLES = 50;

int sampleCount = 0;
float rssiSum = 0;
int rssiSamples[REQUIRED_SAMPLES];

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n-------------------------------------------");
  Serial.println("        BLE PHONE CALIBRATION TOOL         ");
  Serial.println("-------------------------------------------");
  Serial.printf("Target Phone: %s\n", TARGET_PHONE_NAME.c_str());
  Serial.println("Instructions: Place phone at EXACTLY 1.0m line-of-sight.");
  Serial.println("Collecting RSSI samples...\n");

  BLEDevice::init("");
  BLEScan* pBLEScan = BLEDevice::getScan();
  pBLEScan->setActiveScan(true);
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99);
}

void loop() {
  if (sampleCount >= REQUIRED_SAMPLES) {
    // 1. Calculate Mean (Average) RSSI
    float meanRssi = rssiSum / REQUIRED_SAMPLES;

    // 2. Sort array to find Median RSSI (suppresses multipath spikes)
    for (int i = 0; i < REQUIRED_SAMPLES - 1; i++) {
      for (int j = i + 1; j < REQUIRED_SAMPLES; j++) {
        if (rssiSamples[i] > rssiSamples[j]) {
          int temp = rssiSamples[i];
          rssiSamples[i] = rssiSamples[j];
          rssiSamples[j] = temp;
        }
      }
    }
    float medianRssi = rssiSamples[REQUIRED_SAMPLES / 2];

    Serial.println("\n================ CALIBRATION COMPLETE ================");
    Serial.printf("Target Device : %s\n", TARGET_PHONE_NAME.c_str());
    Serial.printf("Mean RSSI     : %.2f dBm\n", meanRssi);
    Serial.printf("Median RSSI   : %.1f dBm (RECOMMENDED TX_POWER)\n", medianRssi);
    Serial.println("=======================================================");
    Serial.println("Copy the Median RSSI value into your main positioning code.");
    
    // Stop scanning after completion
    while (true) {
      delay(1000);
    }
  }

  BLEScan* pBLEScan = BLEDevice::getScan();
  BLEScanResults* results = pBLEScan->start(1, false);

  for (int i = 0; i < results->getCount(); i++) {
    BLEAdvertisedDevice dev = results->getDevice(i);
    if (String(dev.getName().c_str()).equalsIgnoreCase(TARGET_PHONE_NAME)) {
      int rssi = dev.getRSSI();
      rssiSamples[sampleCount] = rssi;
      rssiSum += rssi;
      sampleCount++;
      
      Serial.printf("[%d/%d] Sample collected: %d dBm\n", sampleCount, REQUIRED_SAMPLES, rssi);
      
      if (sampleCount >= REQUIRED_SAMPLES) break;
    }
  }
  pBLEScan->clearResults();
}
