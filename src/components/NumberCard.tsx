import React from 'react';
import { NumberCardProps } from '../types';

const NumberCard: React.FC<NumberCardProps> = ({ digit, isSpinning }) => {
  return (
    <div 
      className={`
        w-24 h-36 md:w-32 md:h-44 
        flex items-center justify-center 
        bg-white rounded-lg shadow-md 
        border-4 border-purple-500
        ${isSpinning ? 'animate-pulse' : ''}
        transition-all duration-200
      `}
    >
      <span className="text-4xl md:text-5xl font-bold text-purple-800">
        {digit === null ? '?' : digit}
      </span>
    </div>
  );
};

export default NumberCard;