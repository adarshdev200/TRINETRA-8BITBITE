#include <BLEDevice.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include "ble_scan.h"
#include "config.h"

static BLEScan* pBLEScan;
static float rssiHistory[3][SMOOTHING_SAMPLES];
static int historyIndex[3] = {0, 0, 0};
static bool historyFilled[3] = {false, false, false};

float lastRssi[3] = {NAN, NAN, NAN};

static void addRssiSample(int anchorIdx, float rssi) {
  rssiHistory[anchorIdx][historyIndex[anchorIdx]] = rssi;
  historyIndex[anchorIdx] = (historyIndex[anchorIdx] + 1) % SMOOTHING_SAMPLES;
  if (historyIndex[anchorIdx] == 0) historyFilled[anchorIdx] = true;

  int count = historyFilled[anchorIdx] ? SMOOTHING_SAMPLES : historyIndex[anchorIdx];
  float sum = 0;
  for (int i = 0; i < count; i++) sum += rssiHistory[anchorIdx][i];
  lastRssi[anchorIdx] = sum / count;
}

void initBLE() {
  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan();
  pBLEScan->setActiveScan(true);
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99);
}

void scanAndUpdateRSSI() {
  BLEScanResults* results = pBLEScan->start(SCAN_TIME_SEC, false);

  for (int i = 0; i < results->getCount(); i++) {
    BLEAdvertisedDevice dev = results->getDevice(i);
    String devName = dev.getName().c_str();

    for (int a = 0; a < 3; a++) {
      if (devName.equalsIgnoreCase(ANCHOR_NAME[a])) {
        addRssiSample(a, dev.getRSSI());
      }
    }
  }
  pBLEScan->clearResults();
}
