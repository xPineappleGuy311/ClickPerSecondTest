import React from 'react';

interface TimerProps {
  timeLeft: number;
  duration: number;
  onDurationChange: (duration: number) => void;
  isRunning: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  duration,
  onDurationChange,
  isRunning,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold">
        {timeLeft.toFixed(1)}s
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="duration" className="text-sm font-medium">
          Test Duration (seconds):
        </label>
        <input
          id="duration"
          type="number"
          min="1"
          max="60"
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isRunning}
        />
      </div>
    </div>
  );
};