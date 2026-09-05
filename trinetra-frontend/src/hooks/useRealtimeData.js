// src/hooks/useRealtimeData.js
import { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Mock data generator (drives the rich demo widgets: zones, cameras, analytics).
// Real backend data for the darshan room + bands is layered on top below.
const generateMockData = () => {
  const zones = [
    { id: 'zone-1', name: 'Main Entrance', type: 'entrance', capacity: 1500, currentOccupancy: 320, density: 21, status: 'normal', riskScore: 12, queueTime: 5, updatedAt: new Date() },
    { id: 'zone-2', name: 'Security Check', type: 'entrance', capacity: 500, currentOccupancy: 280, density: 56, status: 'moderate', riskScore: 34, queueTime: 15, updatedAt: new Date() },
    { id: 'zone-3', name: 'Queue A', type: 'queue', capacity: 1200, currentOccupancy: 850, density: 71, status: 'high', riskScore: 68, queueTime: 42, updatedAt: new Date() },
    { id: 'zone-4', name: 'Queue B', type: 'queue', capacity: 1200, currentOccupancy: 420, density: 35, status: 'normal', riskScore: 28, queueTime: 21, updatedAt: new Date() },
    { id: 'zone-5', name: 'Queue C', type: 'queue', capacity: 1200, currentOccupancy: 620, density: 52, status: 'moderate', riskScore: 45, queueTime: 31, updatedAt: new Date() },
    { id: 'zone-6', name: 'Darshan Area', type: 'darshan', capacity: 3000, currentOccupancy: 2840, density: 95, status: 'critical', riskScore: 91, queueTime: 0, updatedAt: new Date() },
    { id: 'zone-7', name: 'VIP Route', type: 'vip', capacity: 200, currentOccupancy: 80, density: 40, status: 'normal', riskScore: 15, queueTime: 0, updatedAt: new Date() },
    { id: 'zone-8', name: 'Exit', type: 'exit', capacity: 1000, currentOccupancy: 180, density: 18, status: 'normal', riskScore: 8, queueTime: 0, updatedAt: new Date() }
  ];

  const cameras = [
    { id: 'cam-01', name: 'CAM-01', zone: 'Main Entrance', status: 'online', peopleCount: 320, density: 21, riskScore: 12, isLive: true },
    { id: 'cam-02', name: 'CAM-02', zone: 'Security Check', status: 'online', peopleCount: 280, density: 56, riskScore: 34, isLive: true },
    { id: 'cam-03', name: 'CAM-03', zone: 'Queue A', status: 'online', peopleCount: 850, density: 71, riskScore: 68, isLive: true },
    { id: 'cam-04', name: 'CAM-04', zone: 'Queue B', status: 'online', peopleCount: 420, density: 35, riskScore: 28, isLive: true },
    { id: 'cam-05', name: 'CAM-05', zone: 'Queue C', status: 'online', peopleCount: 620, density: 52, riskScore: 45, isLive: true },
    { id: 'cam-06', name: 'CAM-06', zone: 'Darshan Area', status: 'online', peopleCount: 2840, density: 95, riskScore: 91, isLive: true },
    { id: 'cam-07', name: 'CAM-07', zone: 'VIP Route', status: 'online', peopleCount: 80, density: 40, riskScore: 15, isLive: true },
    { id: 'cam-08', name: 'CAM-08', zone: 'Exit', status: 'offline', peopleCount: 0, density: 0, riskScore: 0, isLive: false }
  ];

  // No hardcoded alerts — real alerts only (SOS from the bands / hardware).
  const alerts = [];

  return {
    zones,
    cameras,
    alerts,
    stats: {
      visitorsInside: 0,
      todayFootfall: 31284,
      activeAlerts: 0,
      criticalZones: 1,
      avgQueueTime: 34,
      systemStatus: 'online'
    }
  };
};

function densityStatus(ratio) {
  if (ratio > 0.8) return 'critical';
  if (ratio > 0.6) return 'high';
  if (ratio > 0.3) return 'moderate';
  return 'normal';
}

export const useRealtimeData = () => {
  const { socket } = useSocket();
  const [mock, setMock] = useState(() => generateMockData());
  // real backend slices: darshan occupancy/gate, outside count, ESP32 bands
  const [live, setLive] = useState({ room: null, bands: [], outside: null });
  // mac_address -> Date the band's SOS was first seen, so the alert's "detected"
  // time stays fixed instead of resetting on every refresh. Cleared when the
  // band leaves SOS, so a later re-trigger gets a fresh timestamp.
  const sosSeenRef = useRef(new Map());

  // Keep the demo widgets lively.
  useEffect(() => {
    const interval = setInterval(() => setMock(generateMockData()), 5000);
    return () => clearInterval(interval);
  }, []);

  // Pull the current real state once on mount (before any socket event).
  useEffect(() => {
    axios.get(`${API_URL}/status`)
      .then(r => setLive(l => ({ ...l, room: r.data })))
      .catch(() => {});
    axios.get(`${API_URL}/positions`)
      .then(r => setLive(l => ({ ...l, bands: r.data })))
      .catch(() => {});
    axios.get(`${API_URL}/zones`)
      .then(r => setLive(l => ({ ...l, outside: r.data.outside })))
      .catch(() => {});
  }, []);

  // Live updates pushed by the backend.
  useEffect(() => {
    if (!socket) return;
    const onStatus = (s) => setLive(l => ({ ...l, room: s }));
    const onPositions = (p) => setLive(l => ({ ...l, bands: Array.isArray(p) ? p : [] }));
    const onZones = (z) => setLive(l => ({ ...l, outside: z.outside }));
    socket.on('status', onStatus);
    socket.on('positions', onPositions);
    socket.on('zones', onZones);
    return () => {
      socket.off('status', onStatus);
      socket.off('positions', onPositions);
      socket.off('zones', onZones);
    };
  }, [socket]);

  // Merge real data over the mock scaffold.
  return useMemo(() => {
    const merged = { ...mock, loading: false, error: null };
    const room = live.room;
    const bands = live.bands || [];
    const outsideCount = live.outside?.count ?? 0;

    // expose the raw real slices for any component that wants them
    merged.room = room;
    merged.bands = bands;
    merged.outside = live.outside;
    merged.gate = room ? room.gate : null;

    // Visitors inside = people in BOTH zones (darshan room + outside corridor).
    merged.stats = {
      ...merged.stats,
      visitorsInside: (room ? room.occupancy : 0) + outsideCount,
    };

    if (room) {
      // the Darshan Area mock zone reflects the real room.
      const ratio = room.capacity ? room.occupancy / room.capacity : 0;
      merged.zones = merged.zones.map(z =>
        z.name === 'Darshan Area'
          ? {
              ...z,
              capacity: room.capacity,
              currentOccupancy: room.occupancy,
              density: Math.round(ratio * 100),
              status: room.overCapacity ? 'critical' : densityStatus(ratio),
              updatedAt: new Date(),
            }
          : z
      );
    }

    // A band in SOS becomes a real, top-priority alert. Keep a stable
    // "detected" timestamp per band (captured the first time we see its SOS).
    const seen = sosSeenRef.current;
    const activeSosMacs = new Set();
    const sosAlerts = bands
      .filter(b => b.sos)
      .map(b => {
        activeSosMacs.add(b.mac_address);
        if (!seen.has(b.mac_address)) seen.set(b.mac_address, new Date());
        const x = b.x ?? 0;
        const y = b.y ?? 0;
        return {
          id: 'sos-' + b.mac_address,
          title: 'SOS — Visitor Band Alert',
          description: `Band ${b.mac_address} raised SOS at (${x.toFixed(1)}, ${y.toFixed(1)})`,
          severity: 'critical',
          zone: 'Darshan Area',
          mac: b.mac_address,
          location: { x, y },
          online: b.online,
          riskScore: 99,
          status: 'active',
          createdAt: seen.get(b.mac_address),
        };
      });
    // Forget bands that are no longer in SOS so a later re-trigger restarts the clock.
    for (const mac of [...seen.keys()]) {
      if (!activeSosMacs.has(mac)) seen.delete(mac);
    }
    merged.alerts = [...sosAlerts, ...merged.alerts];

    merged.stats = {
      ...merged.stats,
      activeAlerts: merged.alerts.filter(a => a.status === 'active').length,
      criticalZones: merged.zones.filter(z => z.status === 'critical').length,
    };

    return merged;
  }, [mock, live]);
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};
