import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { useRealtimeData } from '../../hooks/useRealtimeData';

export const ZoneStatusGrid = () => {
  const { zones } = useRealtimeData();

  const getDensityColor = (density) => {
    if (density > 80) return 'bg-critical';
    if (density > 60) return 'bg-warning';
    if (density > 30) return 'bg-info';
    return 'bg-success';
  };

  return (
    <div className="bg-dark-panel rounded-lg p-4 border border-[rgba(255,255,255,0.08)]">
      <h2 className="text-sm font-semibold text-white mb-4">Zone Status</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {zones.slice(0, 6).map((zone) => (
          <div key={zone.id} className="bg-dark-elevated rounded-lg p-3 border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{zone.name}</span>
              <StatusBadge status={zone.status} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{zone.currentOccupancy} people</span>
              <span className="text-gray-400">{zone.density}% capacity</span>
            </div>
            <div className="mt-2 h-1 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getDensityColor(zone.density)}`}
                style={{ width: `${zone.density}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};