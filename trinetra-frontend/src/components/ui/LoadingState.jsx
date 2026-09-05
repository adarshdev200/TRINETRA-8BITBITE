import React from 'react';

export const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-[#E6A23C]/20 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-2 border-[#E6A23C]/30 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#E6A23C] animate-pulse"></div>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#8B949E]">{message}</p>
    </div>
  );
};

export default LoadingState;