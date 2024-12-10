import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard, X } from 'lucide-react';
import { HotkeyConfig } from '../types';

interface HotkeySettingsProps {
  hotkeys: HotkeyConfig[];
  onChange: (hotkeys: HotkeyConfig[]) => void;
}

export const HotkeySettings: React.FC<HotkeySettingsProps> = ({
  hotkeys,
  onChange,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isListening || editingIndex === null) return;

    e.preventDefault();
    const key = e.key;
    
    // Prevent duplicate hotkeys
    if (hotkeys.some((h, i) => i !== editingIndex && h.key === key)) {
      return;
    }

    const newHotkeys = [...hotkeys];
    newHotkeys[editingIndex] = {
      key,
      description: key === ' ' ? 'Space' : key,
    };
    
    onChange(newHotkeys);
    setIsListening(false);
    setEditingIndex(null);
  }, [isListening, editingIndex, hotkeys, onChange]);

  useEffect(() => {
    if (isListening) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isListening, handleKeyDown]);

  const startListening = (index: number) => {
    setIsListening(true);
    setEditingIndex(index);
  };

  const removeHotkey = (index: number) => {
    onChange(hotkeys.filter((_, i) => i !== index));
  };

  const addHotkey = () => {
    if (hotkeys.length >= 5) return;
    onChange([...hotkeys, { key: '', description: '' }]);
    startListening(hotkeys.length);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Keyboard className="w-5 h-5" />
          Hotkey Settings
        </h3>
        <button
          onClick={addHotkey}
          disabled={hotkeys.length >= 5}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Hotkey
        </button>
      </div>

      <div className="space-y-3">
        {hotkeys.map((hotkey, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
          >
            <button
              onClick={() => startListening(index)}
              className={`flex-grow p-2 text-left rounded border ${
                editingIndex === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {editingIndex === index
                ? 'Press any key...'
                : hotkey.description || 'Click to set'}
            </button>
            <button
              onClick={() => removeHotkey(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};