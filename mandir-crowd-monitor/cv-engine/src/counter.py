# Older counting helpers. main.py uses Occupancy now, but these are handy:
# UniqueCounter for total distinct visitors, OccupancyCounter for a live
# in-room count that rides out brief detection gaps via a grace period.


class UniqueCounter:
    def __init__(self):
        self.seen_ids = set()

    def update(self, detections):
        for det in detections:
            track_id = det.get("track_id")
            if track_id is not None:
                self.seen_ids.add(track_id)

    @property
    def total(self):
        return len(self.seen_ids)


class OccupancyCounter:
    # grace_period is in frames (~15 = half a second at 30fps). Bigger =
    # steadier but slower to notice someone leaving.
    def __init__(self, grace_period=15):
        self.grace_period = grace_period
        self.frame_index = 0
        self.last_seen = {}  # track_id -> frame index we last saw it

    def update(self, detections):
        self.frame_index += 1

        for det in detections:
            track_id = det.get("track_id")
            if track_id is not None:
                self.last_seen[track_id] = self.frame_index

        expired = [
            tid
            for tid, seen in self.last_seen.items()
            if self.frame_index - seen > self.grace_period
        ]
        for tid in expired:
            del self.last_seen[tid]

    @property
    def occupancy(self):
        # after update(), everything still in last_seen is within the window
        return len(self.last_seen)
