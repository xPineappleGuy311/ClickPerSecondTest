import React from 'react';

interface StatsProps {
  clicks: number;
  timeLeft: number;
  duration: number;
}

export const Stats: React.FC<StatsProps> = ({ clicks, timeLeft, duration }) => {
  const cps = timeLeft < duration ? clicks / (duration - timeLeft) : 0;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl font-bold text-blue-600">
        {cps.toFixed(2)} CPS
      </div>
      <div className="text-lg">
        Total Clicks: {clicks}
      </div>
    </div>
  );
};