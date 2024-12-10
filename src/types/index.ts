export interface TimerConfig {
  duration: number;
  isRunning: boolean;
  timeLeft: number;
}

export interface HotkeyConfig {
  key: string;
  description: string;
}

export interface Score {
  clicks: number;
  cps: number;
  duration: number;
  timestamp: number;
}

export interface ScoreStore {
  scores: Score[];
  topScores: Score[];
}