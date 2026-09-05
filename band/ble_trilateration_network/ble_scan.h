#ifndef BLE_SCAN_H
#define BLE_SCAN_H

// Smoothed RSSI per anchor (NAN until first sample received for that anchor)
extern float lastRssi[3];

// Call once in setup()
void initBLE();

// Call every loop() -- performs one scan window and updates lastRssi[]
void scanAndUpdateRSSI();

#endif
