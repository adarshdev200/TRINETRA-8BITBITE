#include "sos.h"

void setup() {
  Serial.begin(115200);
  initSOS();
}

void loop() {
  // nothing needed here — sosTask runs on its own core
  delay(1000);
}
