// Live per-zone data from the backend: darshan (occupancy/gate) + outside
// (current count), plus a short rolling history for the analytics charts.
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const MAX_POINTS = 40;

const emptyZones = {
  darshan: { occupancy: 0, capacity: 30, gate: 'OPEN', overCapacity: false },
  outside: { count: 0 },
};

export const useZones = () => {
  const { socket } = useSocket();
  const [zones, setZones] = useState(emptyZones);
  const [history, setHistory] = useState({ darshan: [], outside: [] });

  const push = (z) => {
    const t = new Date().toLocaleTimeString();
    setHistory((h) => ({
      darshan: [...h.darshan, { t, value: z.darshan?.occupancy ?? 0 }].slice(-MAX_POINTS),
      outside: [...h.outside, { t, value: z.outside?.count ?? 0 }].slice(-MAX_POINTS),
    }));
  };

  useEffect(() => {
    axios.get(`${API_URL}/zones`)
      .then((r) => { setZones(r.data); push(r.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onZones = (z) => { setZones(z); push(z); };
    socket.on('zones', onZones);
    return () => socket.off('zones', onZones);
  }, [socket]);

  return { zones, history };
};
