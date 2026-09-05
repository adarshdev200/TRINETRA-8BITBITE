import React from 'react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { StatusBadge } from '../ui/StatusBadge';

export const LiveAlerts = () => {
  const { alerts } = useRealtimeData();
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' || a.severity === 'high');

  return (
    <div className="bg-dark-panel rounded-lg p-4 border border-[rgba(255,255,255,0.08)] h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Live Alerts</h2>
        {criticalAlerts.length > 0 && (
          <span className="text-xs text-critical animate-pulse">{criticalAlerts.length} critical</span>
        )}
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-elevated transition-colors cursor-pointer">
            <div className="text-xs font-bold uppercase">
              <StatusBadge status={alert.severity} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{alert.title}</p>
              <p className="text-xs text-gray-400">
                {alert.zone} • {new Date(alert.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / 60000)} min ago
            </span>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">No active alerts</div>
        )}
      </div>
    </div>
  );
};