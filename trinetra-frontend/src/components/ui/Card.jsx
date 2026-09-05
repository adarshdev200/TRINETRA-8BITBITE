import React from 'react';
import { clsx } from 'clsx';

export const Card = ({ children, className, elevated = false, hover = false }) => {
  return (
    <div
      className={clsx(
        'rounded-xl border border-[rgba(255,255,255,0.08)] p-4 transition-all',
        elevated ? 'bg-[#171D27]' : 'bg-[#121720]',
        hover && 'hover:border-[rgba(255,255,255,0.15)] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;