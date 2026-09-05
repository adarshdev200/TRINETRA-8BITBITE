import React from 'react';
import { clsx } from 'clsx';

export const StatusIndicator = ({ status, label, className }) => {
  const statuses = {
    online: 'bg-[#22C55E]',
    offline: 'bg-[#EF4444]',
    warning: 'bg-[#F59E0B]',
    active: 'bg-[#22C55E] animate-pulse',
    critical: 'bg-[#EF4444] animate-pulse',
    normal: 'bg-[#22C55E]',
    high: 'bg-[#F59E0B]',
    moderate: 'bg-[#E6A23C]',
  };

  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <span className={`w-2 h-2 rounded-full ${statuses[status] || statuses.normal}`} />
      {label && <span className="text-xs text-[#8B949E]">{label}</span>}
    </div>
  );
};

export default StatusIndicator;