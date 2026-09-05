import React from 'react';
import { Shield } from 'lucide-react';

export const EmptyState = ({ title, description, icon: Icon = Shield }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E6A23C]/10 border border-[#E6A23C]/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#E6A23C]" />
      </div>
      <h3 className="text-lg font-bold text-[#F5F5F0]">{title}</h3>
      <p className="text-sm text-[#8B949E] mt-1 max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;