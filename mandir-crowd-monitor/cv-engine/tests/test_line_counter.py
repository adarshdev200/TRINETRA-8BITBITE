from src.line_counter import LineCounter


def det(track_id, cy):
    # box centered vertically at cy, line sits at y=100 in these tests
    return {"track_id": track_id, "box": (0, cy - 5, 20, cy + 5)}


def test_down_crossing_counted_once():
    counter = LineCounter(line_y=100)
    counter.update([det(1, 50)])
    events = counter.update([det(1, 150)])

    assert counter.down_count == 1
    assert counter.up_count == 0
    assert events == [{"track_id": 1, "direction": "down"}]


def test_up_crossing_counted_once():
    counter = LineCounter(line_y=100)
    counter.update([det(2, 150)])
    counter.update([det(2, 40)])

    assert counter.up_count == 1
    assert counter.down_count == 0


def test_no_crossing_when_staying_on_one_side():
    counter = LineCounter(line_y=100)
    counter.update([det(3, 30)])
    counter.update([det(3, 40)])
    counter.update([det(3, 20)])

    assert counter.down_count == 0
    assert counter.up_count == 0


def test_crossing_fires_only_on_the_flip_not_every_frame():
    counter = LineCounter(line_y=100)
    counter.update([det(4, 50)])
    counter.update([det(4, 150)])   # crosses down here
    counter.update([det(4, 160)])   # still below, no new event
    counter.update([det(4, 170)])

    assert counter.down_count == 1


def test_two_people_counted_independently():
    counter = LineCounter(line_y=100)
    counter.update([det(1, 50), det(2, 150)])
    counter.update([det(1, 150), det(2, 50)])

    assert counter.down_count == 1
    assert counter.up_count == 1


def test_none_track_id_is_ignored():
    counter = LineCounter(line_y=100)
    counter.update([det(None, 50)])
    counter.update([det(None, 150)])
    assert counter.down_count == 0
