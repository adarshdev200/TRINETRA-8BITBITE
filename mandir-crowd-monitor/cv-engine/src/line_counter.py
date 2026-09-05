# Counts people crossing a horizontal line. When a tracked person's center
# flips from above the line to below it (or vice versa), that's one crossing.


def _center_y(box):
    _, y1, _, y2 = box
    return (y1 + y2) / 2


class LineCounter:
    def __init__(self, line_y):
        self.line_y = line_y
        self.down_count = 0
        self.up_count = 0
        self._last_side = {}  # track_id -> "above" / "below"

    def _side(self, box):
        return "above" if _center_y(box) < self.line_y else "below"

    def update(self, detections):
        events = []
        seen_ids = set()

        for det in detections:
            track_id = det.get("track_id")
            if track_id is None:
                continue
            seen_ids.add(track_id)

            side = self._side(det["box"])
            previous = self._last_side.get(track_id)

            if previous is not None and previous != side:
                if previous == "above" and side == "below":
                    self.down_count += 1
                    events.append({"track_id": track_id, "direction": "down"})
                else:
                    self.up_count += 1
                    events.append({"track_id": track_id, "direction": "up"})

            self._last_side[track_id] = side

        # drop ids that left the frame so the dict doesn't grow forever
        for tid in list(self._last_side):
            if tid not in seen_ids:
                del self._last_side[tid]

        return events
