import { useState, useEffect } from 'react';
import { Score, ScoreStore } from '../types';

const STORAGE_KEY = 'cps-scores';
const MAX_SCORES = 100;
const MAX_TOP_SCORES = 10;

export const useScores = () => {
  const [scoreStore, setScoreStore] = useState<ScoreStore>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { scores: [], topScores: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scoreStore));
  }, [scoreStore]);

  const addScore = (score: Omit<Score, 'timestamp'>) => {
    const newScore: Score = { ...score, timestamp: Date.now() };
    
    setScoreStore(prev => {
      const newScores = [newScore, ...prev.scores].slice(0, MAX_SCORES);
      const allScores = [...prev.topScores, newScore];
      
      // Sort by CPS and duration (longer duration wins ties)
      const sortedScores = allScores.sort((a, b) => 
        b.cps === a.cps ? b.duration - a.duration : b.cps - a.cps
      );
      
      const newTopScores = Array.from(new Map(
        sortedScores.map(score => [score.timestamp, score])
      ).values()).slice(0, MAX_TOP_SCORES);

      return { scores: newScores, topScores: newTopScores };
    });
  };

  const clearScores = () => {
    setScoreStore({ scores: [], topScores: [] });
  };

  return { scoreStore, addScore, clearScores };
};