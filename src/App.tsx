import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { ClickButton } from './components/ClickButton';
import { Stats } from './components/Stats';
import { ResultsDialog } from './components/ResultsDialog';
import { ScoreHistory } from './components/ScoreHistory';
import { HotkeySettings } from './components/HotkeySettings';
import { useTimer } from './hooks/useTimer';
import { useHotkeys } from './hooks/useHotkeys';
import { useMouseButtons } from './hooks/useMouseButtons';
import { useClickHandler } from './hooks/useClickHandler';
import { useScores } from './hooks/useScores';
import { HotkeyConfig } from './types';

function App() {
  const [clicks, setClicks] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hotkeys, setHotkeys] = useState<HotkeyConfig[]>([
    { key: ' ', description: 'Space' },
    { key: 'Enter', description: 'Enter' },
  ]);
  
  const { config, startTimer, stopTimer, updateDuration } = useTimer(5);
  const { scoreStore, addScore, clearScores } = useScores();

  const handleClick = useClickHandler({
    config,
    startTimer,
    setClicks,
    showResults,
  });

  // Enable both keyboard and mouse input
  useHotkeys(hotkeys, handleClick);
  useMouseButtons(handleClick, !showResults);

  // Show results when timer ends
  React.useEffect(() => {
    if (config.timeLeft === 0 && !showResults && clicks > 0) {
      const cps = clicks / config.duration;
      addScore({ clicks, cps, duration: config.duration });
      setShowResults(true);
    }
  }, [config.timeLeft, clicks, showResults, config.duration, addScore]);

  const handleCloseResults = () => {
    setShowResults(false);
    setClicks(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              CPS Test
            </h1>
            <p className="text-gray-600">
              Test your CPS Speed! Use mouse buttons and hotkeys to begin.
            </p>
          </div>

          <Timer
            timeLeft={config.timeLeft}
            duration={config.duration}
            onDurationChange={updateDuration}
            isRunning={config.isRunning}
          />

          <Stats
            clicks={clicks}
            timeLeft={config.timeLeft}
            duration={config.duration}
          />

          <ClickButton
            onClick={handleClick}
            isRunning={config.isRunning && !showResults}
            hotkeys={hotkeys}
          />
        </div>

        <HotkeySettings
          hotkeys={hotkeys}
          onChange={setHotkeys}
        />

        <ScoreHistory
          scores={scoreStore.scores}
          topScores={scoreStore.topScores}
          onClear={clearScores}
        />

        <ResultsDialog
          isOpen={showResults}
          onClose={handleCloseResults}
          clicks={clicks}
          duration={config.duration}
        />
      </div>
    </div>
  );
}

export default App;