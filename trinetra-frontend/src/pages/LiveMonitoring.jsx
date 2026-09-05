// src/pages/LiveMonitoring.jsx
// Zone monitoring: each camera gets its own full-size live feed card.
// Darshan = Entrance + Exit (share occupancy/gate); Outside = corridor count.
// Click a card to open that zone's analytics (live trend chart + numbers).
import React, { useState, useMemo } from 'react';
import { useZones } from '../hooks/useZones';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DoorOpen, DoorClosed, Users, X, Activity, AlertTriangle } from 'lucide-react';

const FEED_URL = import.meta.env.VITE_FEED_URL || 'http://localhost:8090';

// One card per camera feed.
const CARDS = [
  { feedId: 'darshan',      zone: 'darshan', title: 'Darshan — Entrance', subtitle: 'Devotees entering' },
  { feedId: 'darshan_exit', zone: 'darshan', title: 'Darshan — Exit',     subtitle: 'Devotees exiting' },
  { feedId: 'outside',      zone: 'outside', title: 'Outside Corridor',   subtitle: 'Live people count' },
];

function ZoneFeed({ feedId }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: '16 / 10' }}>
      {broken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9CA3AF]">
          <AlertTriangle className="w-6 h-6 mb-2 text-[#EF4444]" />
          <span className="text-xs">Feed offline — start the camera app</span>
          <span className="text-[10px] mt-1 opacity-60">{FEED_URL}/feed/{feedId}</span>
        </div>
      ) : (
        <img
          src={`${FEED_URL}/feed/${feedId}`}
          alt={`${feedId} feed`}
          onError={() => setBroken(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute top-2 left-2 flex items-center space-x-1.5 px-2 py-1 rounded bg-black/60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
        <span className="text-[10px] tracking-wider text-white uppercase">Live</span>
      </div>
    </div>
  );
}

function StatPills({ zone, zones }) {
  if (zone === 'darshan') {
    const d = zones.darshan;
    const gateOpen = d.gate === 'OPEN';
    return (
      <div className="flex items-center gap-3">
        <div>
          <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Occupancy</div>
          <div className="text-[#F5F5F0] text-lg font-bold">{d.occupancy}/{d.capacity}</div>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${
          gateOpen ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                   : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'}`}>
          {gateOpen ? <DoorOpen className="w-3.5 h-3.5" /> : <DoorClosed className="w-3.5 h-3.5" />}
          Gate {d.gate}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-[#38BDF8]" />
      <div>
        <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">People Now</div>
        <div className="text-[#F5F5F0] text-lg font-bold">{zones.outside.count}</div>
      </div>
    </div>
  );
}

export const LiveMonitoring = () => {
  const { zones, history } = useZones();
  const [selected, setSelected] = useState(null); // a CARDS entry

  const peak = useMemo(() => {
    const h = selected ? history[selected.zone] || [] : [];
    return h.reduce((m, p) => Math.max(m, p.value), 0);
  }, [selected, history]);

  const current = !selected ? 0
    : selected.zone === 'darshan' ? zones.darshan.occupancy : zones.outside.count;

  return (
    <div className="min-h-screen bg-[#07090D] p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-[10px] text-[#D6A84F] tracking-[0.15em] uppercase">TRINETRA / LIVE MONITORING</span>
          <h1 className="text-2xl font-bold text-[#F5F5F0] mt-1">Zone Feeds</h1>
          <p className="text-[#9CA3AF] text-sm">Live annotated video per camera. Click a feed to open its analytics.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CARDS.map((c) => (
            <button
              key={c.feedId}
              onClick={() => setSelected(c)}
              className="text-left bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 hover:border-[#D6A84F]/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-[#F5F5F0]">{c.title}</h2>
                  <p className="text-xs text-[#9CA3AF]">{c.subtitle}</p>
                </div>
                <StatPills zone={c.zone} zones={zones} />
              </div>
              <ZoneFeed feedId={c.feedId} />
              <div className="mt-2 flex items-center justify-end text-[10px] text-[#D6A84F]">
                <Activity className="w-3 h-3 mr-1" /> Click for analytics
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analytics overlay */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.12)] w-full max-w-4xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F5F5F0]">{selected.title} — Analytics</h2>
                <p className="text-xs text-[#9CA3AF]">Live trend over the last few minutes</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-[#07090D]">
                <X className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ZoneFeed feedId={selected.feedId} />
              <div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#07090D] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
                    <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Current</div>
                    <div className="text-2xl font-bold text-[#D6A84F]">{current}</div>
                  </div>
                  <div className="bg-[#07090D] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
                    <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Peak (session)</div>
                    <div className="text-2xl font-bold text-[#F5F5F0]">{peak}</div>
                  </div>
                </div>
                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history[selected.zone] || []}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="t" tick={{ fontSize: 9, fill: '#9CA3AF' }} minTickGap={30} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} width={28} />
                      <Tooltip contentStyle={{ background: '#0B0F15', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                      <Line type="monotone" dataKey="value" stroke="#D6A84F" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMonitoring;
