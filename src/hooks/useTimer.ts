import { useState, useEffect, useCallback } from 'react';
import { TimerConfig } from '../types';

export const useTimer = (initialDuration: number) => {
  const [config, setConfig] = useState<TimerConfig>({
    duration: initialDuration,
    isRunning: false,
    timeLeft: initialDuration,
  });

  const startTimer = useCallback(() => {
    setConfig(prev => ({ ...prev, isRunning: true, timeLeft: prev.duration }));
  }, []);

  const stopTimer = useCallback(() => {
    setConfig(prev => ({ ...prev, isRunning: false }));
  }, []);

  const updateDuration = useCallback((newDuration: number) => {
    setConfig(prev => ({ ...prev, duration: newDuration, timeLeft: newDuration }));
  }, []);

  useEffect(() => {
    let interval: number;
    if (config.isRunning && config.timeLeft > 0) {
      interval = setInterval(() => {
        setConfig(prev => {
          const newTimeLeft = prev.timeLeft - 0.1;
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            return { ...prev, isRunning: false, timeLeft: 0 };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [config.isRunning]);

  return { config, startTimer, stopTimer, updateDuration };
};