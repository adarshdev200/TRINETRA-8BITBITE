#ifndef SOS_H
#define SOS_H

// Call once in setup(). Starts a background task that watches the SOS button
// and drives the buzzer, independent of the (blocking) BLE scan in loop().
void initSOS();

// true once SOS has been triggered (button held for SOS_HOLD_MS).
// Latches ON and stays until the device is power-cycled.
bool sosActive();

#endif
