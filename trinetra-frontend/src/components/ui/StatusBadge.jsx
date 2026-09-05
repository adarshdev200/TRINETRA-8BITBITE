// src/components/ui/StatusBadge.jsx
import React from 'react';
import { clsx } from 'clsx';

export const StatusBadge = ({ status, className }) => {
  const statusConfig = {
    normal: { color: 'bg-success', text: 'text-success' },
    moderate: { color: 'bg-warning', text: 'text-warning' },
    high: { color: 'bg-orange-500', text: 'text-orange-500' },
    critical: { color: 'bg-critical', text: 'text-critical' },
    closed: { color: 'bg-gray-500', text: 'text-gray-500' },
    online: { color: 'bg-success', text: 'text-success' },
    offline: { color: 'bg-gray-500', text: 'text-gray-500' },
    error: { color: 'bg-critical', text: 'text-critical' },
    available: { color: 'bg-success', text: 'text-success' },
    'on-duty': { color: 'bg-info', text: 'text-info' },
    responding: { color: 'bg-warning', text: 'text-warning' },
    'off-duty': { color: 'bg-gray-500', text: 'text-gray-500' },
    active: { color: 'bg-critical', text: 'text-critical' },
    acknowledged: { color: 'bg-warning', text: 'text-warning' },
    resolved: { color: 'bg-success', text: 'text-success' },
    dismissed: { color: 'bg-gray-500', text: 'text-gray-500' },
    low: { color: 'bg-info', text: 'text-info' },
    medium: { color: 'bg-warning', text: 'text-warning' },
  };

  const config = statusConfig[status] || statusConfig.normal;

  return (
    <span className={clsx('inline-flex items-center space-x-1.5 text-xs font-medium', config.text, className)}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', config.color)} />
      <span className="uppercase">{status}</span>
    </span>
  );
};

export default StatusBadge;