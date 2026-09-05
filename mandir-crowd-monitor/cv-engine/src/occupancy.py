# occupancy = entries - exits, clamped so it never goes negative.
# We let it go over capacity though - that's a real overcrowding case the
# gate logic needs to see.


class Occupancy:
    def __init__(self, capacity):
        self.capacity = capacity
        self._value = 0
        self.total_entries = 0
        self.total_exits = 0

    def enter(self):
        self._value += 1
        self.total_entries += 1

    def exit(self):
        if self._value > 0:  # ignore an exit when already empty (miscount)
            self._value -= 1
            self.total_exits += 1

    def apply(self, delta):
        if delta > 0:
            self.enter()
        elif delta < 0:
            self.exit()

    def reset(self):
        self._value = 0
        self.total_entries = 0
        self.total_exits = 0

    @property
    def value(self):
        return self._value

    @property
    def is_over_capacity(self):
        return self._value > self.capacity
