import React from 'react';
import { clsx } from 'clsx';

export const ProgressBar = ({ value, max = 100, color = 'primary', className }) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    primary: 'bg-[#E6A23C]',
    success: 'bg-[#22C55E]',
    warning: 'bg-[#F59E0B]',
    critical: 'bg-[#EF4444]',
    info: 'bg-[#38BDF8]',
  };

  return (
    <div className={clsx('w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden', className)}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${colors[color] || colors.primary}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;