#include <math.h>
#include "trilateration.h"
#include "config.h"

float rssiToDistance(float rssi, int anchorIdx) {
  return pow(10.0, (TX_POWER[anchorIdx] - rssi) / (10.0 * PATH_LOSS_EXPONENT));
}

bool trilaterate(const float x[3], const float y[3], const float d[3], float &outX, float &outY) {
  // Linearize: subtract equation 3 from equations 1 and 2
  float A = 2 * (x[1] - x[0]);
  float B = 2 * (y[1] - y[0]);
  float C = d[0]*d[0] - d[1]*d[1] - x[0]*x[0] + x[1]*x[1] - y[0]*y[0] + y[1]*y[1];

  float D = 2 * (x[2] - x[1]);
  float E = 2 * (y[2] - y[1]);
  float F = d[1]*d[1] - d[2]*d[2] - x[1]*x[1] + x[2]*x[2] - y[1]*y[1] + y[2]*y[2];

  float denom = A * E - B * D;
  if (fabs(denom) < 1e-6) return false;  // anchors collinear, can't solve

  outX = (C * E - B * F) / denom;
  outY = (A * F - C * D) / denom;
  return true;
}
