import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#121720] rounded-xl border border-[rgba(255,255,255,0.08)] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-bold text-[#F5F5F0]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <X className="w-5 h-5 text-[#8B949E]" />
          </button>
        </div>
        <div className={clsx('p-4', className)}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;