#ifndef TRILATERATION_H
#define TRILATERATION_H

// Converts a smoothed RSSI reading to an estimated distance (meters),
// using the per-anchor calibrated TX_POWER for anchorIdx.
float rssiToDistance(float rssi, int anchorIdx);

// Least-squares trilateration from 3 anchor coords + 3 distances.
// Returns false if anchors are collinear (unsolvable).
bool trilaterate(const float x[3], const float y[3], const float d[3], float &outX, float &outY);

#endif
