from src.counter import OccupancyCounter


def person(track_id):
    return {"track_id": track_id}


def test_counts_currently_visible_people():
    counter = OccupancyCounter(grace_period=5)
    counter.update([person(1), person(2), person(3)])
    assert counter.occupancy == 3


def test_holds_person_during_brief_disappearance():
    counter = OccupancyCounter(grace_period=5)
    counter.update([person(1), person(2)])

    # person 2 vanishes for a few frames but within the grace period
    for _ in range(3):
        counter.update([person(1)])

    assert counter.occupancy == 2


def test_drops_person_after_grace_period():
    counter = OccupancyCounter(grace_period=5)
    counter.update([person(1), person(2)])

    for _ in range(6):  # gone longer than grace_period -> really left
        counter.update([person(1)])

    assert counter.occupancy == 1


def test_reappearing_person_is_kept():
    counter = OccupancyCounter(grace_period=5)
    counter.update([person(1), person(2)])
    counter.update([person(1)])
    counter.update([person(1), person(2)])
    assert counter.occupancy == 2


def test_ignores_none_ids():
    counter = OccupancyCounter(grace_period=5)
    counter.update([person(None), person(None)])
    assert counter.occupancy == 0
