import React from 'react';
import type { CardProps } from '@/types';

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div
      className={`bg-gray-850 backdrop-blur-xl border border-gray-700 shadow-card rounded-2xl p-6 transition-all duration-300 hover:border-gray-600 ${className || ''}`}
    >
      {title && (
        <h3 className="text-xl font-semibold text-blue-300 mb-4 tracking-tight flex items-center gap-2">
          {title}
        </h3>
      )}
      <div className="text-gray-400 space-y-3 leading-relaxed">{children}</div>
    </div>
  );
};
