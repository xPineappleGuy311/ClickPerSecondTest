import { useEffect } from 'react';

export const useMouseButtons = (callback: () => void, enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Left click (0) or right click (2)
      if (e.button === 0 || e.button === 2) {
        e.preventDefault();
        callback();
      }
    };

    // Prevent context menu on right click
    const preventContext = (e: Event) => e.preventDefault();

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', preventContext);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', preventContext);
    };
  }, [callback, enabled]);
};