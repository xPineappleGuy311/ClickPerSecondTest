import { useCallback, useRef } from 'react';
import { TimerConfig } from '../types';

interface UseClickHandlerProps {
  config: TimerConfig;
  startTimer: () => void;
  setClicks: (updater: (prev: number) => number) => void;
  showResults: boolean;
}

export const useClickHandler = ({
  config,
  startTimer,
  setClicks,
  showResults,
}: UseClickHandlerProps) => {
  const lastClickTime = useRef(0);
  const MIN_CLICK_INTERVAL = 1; // 1ms minimum between clicks

  return useCallback(() => {
    if (showResults) return;

    const now = performance.now();
    if (now - lastClickTime.current < MIN_CLICK_INTERVAL) {
      return; // Prevent clicks that are too close together
    }
    lastClickTime.current = now;

    if (!config.isRunning) {
      setClicks(() => 0);
      startTimer();
    }
    
    if (config.timeLeft > 0) {
      setClicks(prev => prev + 1);
    }
  }, [config.isRunning, config.timeLeft, startTimer, setClicks, showResults]);
};