#ifndef NETWORK_H
#define NETWORK_H

// Call once in setup() -- blocks until WiFi connects, then reads the chip MAC.
void connectWiFi();

// Call once in setup() (after connectWiFi) -- starts the background task that
// POSTs the latest fix on its own clock, so a slow/failed request never stalls
// the BLE scanning in loop().
void startNetworkTask();

// Called from loop() whenever a fresh position is computed. Thread-safe;
// just stores the latest fix for the network task to send.
void updateFix(float x, float y);

#endif
