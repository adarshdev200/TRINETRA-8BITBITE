#include <Arduino.h>
#include "sos.h"
#include "config.h"

// Set once we latch SOS; read by the main loop via sosActive().
// volatile because it's written in the task and read on the other core.
static volatile bool sosLatched = false;

bool sosActive() {
  return sosLatched;
}

// Runs forever on its own core. A 20 ms tick keeps button-hold detection and
// the beep pattern responsive even while loop() is blocked on a BLE scan.
static void sosTask(void* pv) {
  pinMode(SOS_BUTTON_PIN, INPUT_PULLUP);  // pressed = LOW
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  unsigned long pressStart = 0;
  bool wasPressed = false;

  unsigned long lastToggle = 0;
  bool buzzerOn = false;

  for (;;) {
    bool pressed = (digitalRead(SOS_BUTTON_PIN) == LOW);

    // Trigger on a continuous 5 s hold. Once latched it never clears here.
    if (!sosLatched) {
      if (pressed && !wasPressed) {
        pressStart = millis();  // start timing this press
      }
      if (pressed && (millis() - pressStart >= SOS_HOLD_MS)) {
        sosLatched = true;
      }
    }
    wasPressed = pressed;

    // Beep pattern while in SOS; silent otherwise.
    if (sosLatched) {
      unsigned long now = millis();
      unsigned long interval = buzzerOn ? BUZZER_ON_MS : BUZZER_OFF_MS;
      if (now - lastToggle >= interval) {
        buzzerOn = !buzzerOn;
        digitalWrite(BUZZER_PIN, buzzerOn ? HIGH : LOW);
        lastToggle = now;
      }
    } else {
      digitalWrite(BUZZER_PIN, LOW);
    }

    vTaskDelay(pdMS_TO_TICKS(20));
  }
}

void initSOS() {
  // core 0 (loop()/Arduino runs on core 1), small stack is plenty
  xTaskCreatePinnedToCore(sosTask, "sosTask", 2048, NULL, 1, NULL, 0);
}
