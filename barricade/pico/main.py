# Barricade LEDs on a Raspberry Pi Pico (MicroPython).
#
# Wiring is ACTIVE-HIGH: the pin drives the LED's anode through a resistor and
# the cathode goes to GND, so driving the pin HIGH turns the LED ON and LOW OFF.
#   RED   = GP15  -> "close the gate" signal
#   GREEN = GP14  -> "open the gate"  signal
#
# It reads newline-terminated commands over USB serial from the host agent:
#   "OPEN"  -> green on,  red off
#   "CLOSE" -> red on,    green off
# On boot it starts CLOSED (red on) until the agent says otherwise.

from machine import Pin
import sys
import select

RED = Pin(15, Pin.OUT)
GREEN = Pin(14, Pin.OUT)


def set_gate(closed):
    # active-low: 0 = LED ON, 1 = LED OFF
    RED.value(0 if closed else 1)
    GREEN.value(1 if closed else 0)


set_gate(True)  # start CLOSED (red on)

poll = select.poll()
poll.register(sys.stdin, select.POLLIN)

buf = ""
while True:
    if poll.poll(100):
        ch = sys.stdin.read(1)
        if ch in ("\n", "\r"):
            cmd = buf.strip().upper()
            buf = ""
            if cmd in ("OPEN", "O"):
                set_gate(False)
            elif cmd in ("CLOSE", "CLOSED", "C"):
                set_gate(True)
        elif ch is not None:
            buf += ch
            if len(buf) > 16:  # guard against runaway input
                buf = ""
