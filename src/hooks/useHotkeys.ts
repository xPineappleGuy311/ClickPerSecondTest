import { useEffect, useCallback } from 'react';
import { HotkeyConfig } from '../types';

export const useHotkeys = (hotkeys: HotkeyConfig[], callback: () => void) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (hotkeys.some(hotkey => hotkey.key.toLowerCase() === event.key.toLowerCase())) {
      event.preventDefault();
      callback();
    }
  }, [hotkeys, callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};