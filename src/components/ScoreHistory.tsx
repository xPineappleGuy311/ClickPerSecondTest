import React from 'react';
import { Score } from '../types';
import { Trophy, Clock, MousePointer } from 'lucide-react';

interface ScoreHistoryProps {
  scores: Score[];
  topScores: Score[];
  onClear: () => void;
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({
  scores,
  topScores,
  onClear,
}) => {
  const [activeTab, setActiveTab] = React.useState<'top' | 'history'>('top');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const ScoreRow: React.FC<{ score: Score; rank?: number }> = ({ score, rank }) => (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
      {rank && (
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
          <span className="font-bold text-blue-600">{rank}</span>
        </div>
      )}
      <div className="flex-grow grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <MousePointer className="w-4 h-4 text-gray-400" />
          <span>{score.clicks} clicks</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-gray-400" />
          <span>{score.cps.toFixed(2)} CPS</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{score.duration}s</span>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        {formatDate(score.timestamp)}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('top')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'top'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Top Scores
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            History
          </button>
        </div>
        <button
          onClick={onClear}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {activeTab === 'top' ? (
          topScores.length > 0 ? (
            topScores.map((score, index) => (
              <ScoreRow
                key={score.timestamp}
                score={score}
                rank={index + 1}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No top scores yet</p>
          )
        ) : scores.length > 0 ? (
          scores.map(score => (
            <ScoreRow key={score.timestamp} score={score} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No history yet</p>
        )}
      </div>
    </div>
  );
};