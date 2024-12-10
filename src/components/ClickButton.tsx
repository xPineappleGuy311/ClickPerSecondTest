import React from 'react';
import { MousePointer } from 'lucide-react';

interface ClickButtonProps {
  onClick: () => void;
  isRunning: boolean;
  hotkeys: { key: string; description: string }[];
}

export const ClickButton: React.FC<ClickButtonProps> = ({
  onClick,
  isRunning,
  hotkeys,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={onClick}
        disabled={!isRunning}
        className={`
          flex items-center gap-2 px-8 py-4 text-xl font-semibold rounded-lg
          select-none user-select-none
          transition-all duration-200 transform active:scale-95
          ${isRunning
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        <MousePointer className="w-6 h-6" />
        Click Here
      </button>
      <div className="text-sm text-gray-600">
        Use {hotkeys.map(h => h.description).join(', ')}, or mouse buttons
      </div>
    </div>
  );
};