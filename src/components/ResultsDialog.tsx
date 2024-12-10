import React from 'react';
import { X } from 'lucide-react';

interface ResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clicks: number;
  duration: number;
}

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
  isOpen,
  onClose,
  clicks,
  duration,
}) => {
  if (!isOpen) return null;

  const averageCPS = (clicks / duration).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6">Test Results</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Total Clicks:</span>
            <span className="text-xl font-bold">{clicks}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Test Duration:</span>
            <span className="text-xl font-bold">{duration} seconds</span>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-600">Average CPS:</span>
            <span className="text-2xl font-bold text-blue-600">{averageCPS}</span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Start New Test
        </button>
      </div>
    </div>
  );
};