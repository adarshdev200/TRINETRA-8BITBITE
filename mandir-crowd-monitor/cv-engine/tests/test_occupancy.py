from src.occupancy import Occupancy


def test_enter_and_exit():
    occ = Occupancy(capacity=30)
    occ.enter()
    occ.enter()
    occ.exit()
    assert occ.value == 1
    assert occ.total_entries == 2
    assert occ.total_exits == 1


def test_never_goes_negative():
    occ = Occupancy(capacity=30)
    occ.exit()  # empty room, ignored
    occ.exit()
    assert occ.value == 0
    assert occ.total_exits == 0


def test_apply_signed_delta():
    occ = Occupancy(capacity=30)
    occ.apply(+1)
    occ.apply(+1)
    occ.apply(-1)
    assert occ.value == 1


def test_over_capacity_is_allowed_and_flagged():
    occ = Occupancy(capacity=2)
    occ.enter()
    occ.enter()
    assert occ.is_over_capacity is False
    occ.enter()
    assert occ.value == 3
    assert occ.is_over_capacity is True


def test_reset():
    occ = Occupancy(capacity=30)
    occ.enter()
    occ.enter()
    occ.reset()
    assert occ.value == 0
    assert occ.total_entries == 0
    assert occ.total_exits == 0
