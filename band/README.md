# This is the hardware part of the project

## Setup
![setup](docs/hardware%20setup.jpeg)

### [ble_trilateration_network](ble_trilateration_network/) is the main implementation of the hardware part that is desired.

### Consists of many files

The sketch is split into tabs so each concern (BLE scanning, math, networking, SOS handling) lives in its own file. `ble_trilateration_network.ino` ties them together in `setup()`/`loop()`.

| Tab | Purpose |
|---|---|
| `ble_trilateration_network.ino` | Entry point. `setup()` initializes BLE, connects WiFi, and starts the network + SOS background tasks. `loop()` scans for anchors, converts RSSI to distances, trilaterates a position, and hands it off via `updateFix()`. |
| `config.h` | Central place for all tunable constants: anchor names/positions, per-anchor `TX_POWER` calibration, path-loss exponent, scan/smoothing timing, WiFi credentials, backend URL, POST intervals, and SOS button/buzzer pins and timings. |
| `ble_scan.h` / `ble_scan.cpp` | Handles BLE scanning. `initBLE()` sets up the scanner; `scanAndUpdateRSSI()` runs one scan window, matches advertised devices to the three configured anchor names, and updates a moving-average RSSI (`lastRssi[]`) per anchor via `addRssiSample()`. |
| `trilateration.h` / `trilateration.cpp` | Pure math, no hardware calls. `rssiToDistance()` converts a smoothed RSSI value to an estimated distance using the log-distance path-loss model. `trilaterate()` solves for (x, y) from three anchor positions/distances using linearized least squares, returning `false` if anchors are collinear. |
| `network.h` / `network.cpp` | Handles WiFi and backend communication on its own FreeRTOS task so a slow/failed HTTP request never blocks BLE scanning. `connectWiFi()` connects and reads the chip's MAC (used as `mac_address`). `updateFix()` is called from `loop()` to store the latest position thread-safely. The background `networkTask` POSTs the latest fix as JSON (`mac_address`, `coordinates`, `is_active`) at a normal interval, switching to a faster interval and sending stale fixes if needed while SOS is active. |
| `sos.h` / `sos.cpp` | Runs the SOS button/buzzer logic on a separate core so it stays responsive even while `loop()` is blocked on a BLE scan. Detects a continuous button hold of `SOS_HOLD_MS`, latches `sosActive()` to `true` permanently (until reboot), and drives a beeping pattern on the buzzer pin while active. |

### Related tool

| File | Purpose |
|---|---|
| [`calibration/calibration.ino`](calibration/calibration.ino) | Standalone one-off sketch (not part of the main build) used to determine the per-phone `TX_POWER` constant. Run it once per phone at exactly 1.0 m distance; it collects 50 RSSI samples and reports the mean and (recommended) median RSSI to copy into `config.h`. |
| [`sos_test/sos_test.ino`](sos_test/sos_test.ino) | Sketch (not part of the main build) used to check if the hardware setup of buttons and buzzer work or not. Is dependent on [`sos.cpp`](sos_test/sos.cpp) and [`config.h`](sos_test/config.h) for configuration. |
