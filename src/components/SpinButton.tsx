import React from 'react';
import { SpinButtonProps } from '../types';
import { Dices } from 'lucide-react';

const SpinButton: React.FC<SpinButtonProps> = ({ onSpin, disabled }) => {
  return (
    <button
      onClick={onSpin}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-full
        text-white font-semibold
        transition-all duration-200
        transform active:scale-95
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'}
      `}
    >
      <Dices className="h-5 w-5" />
      <span>Spin</span>
    </button>
  );
};

export default SpinButton;