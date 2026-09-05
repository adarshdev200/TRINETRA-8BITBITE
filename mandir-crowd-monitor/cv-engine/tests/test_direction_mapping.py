from src.zone_pipeline import crossing_delta


def test_entrance_forward_is_enter():
    assert crossing_delta("entrance", "down", forward="down") == +1


def test_entrance_reverse_is_cancel():
    assert crossing_delta("entrance", "up", forward="down") == -1


def test_exit_forward_is_exit():
    assert crossing_delta("exit", "down", forward="down") == -1


def test_exit_reverse_is_cancel():
    assert crossing_delta("exit", "up", forward="down") == +1
