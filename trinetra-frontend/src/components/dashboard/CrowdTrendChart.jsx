import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '12:00', visitors: 3200 },
  { time: '13:00', visitors: 4500 },
  { time: '14:00', visitors: 5800 },
  { time: '15:00', visitors: 7200 },
  { time: '16:00', visitors: 6800 },
  { time: '17:00', visitors: 8452 },
  { time: '18:00', visitors: 9200 },
];

export const CrowdTrendChart = () => {
  return (
    <div className="bg-dark-panel rounded-lg p-4 border border-[rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Live Crowd Distribution</h2>
        <span className="text-xs text-gray-400">Updated in real-time</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#6B7280" fontSize={10} />
            <YAxis stroke="#6B7280" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#141821',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#E5E7EB' }}
            />
            <Line type="monotone" dataKey="visitors" stroke="#E6A23C" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};