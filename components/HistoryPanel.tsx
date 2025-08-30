import React from 'react';
import type { ReviewItem } from '../types';

interface HistoryPanelProps {
  history: ReviewItem[];
  onSelect: (item: ReviewItem) => void;
  onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  return (
    <div className="p-3">
      {history.length > 0 && (
         <div className="flex justify-end mb-2">
            <button
              onClick={onClear}
              className="text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Clear History
            </button>
          </div>
      )}
      {history.length === 0 ? (
        <p className="text-sm text-center text-light-text-secondary dark:text-dark-text-secondary py-10">
          No review history yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {history.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item)}
                className="w-full text-left p-3 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-colors"
              >
                <p className="text-sm font-medium truncate text-light-text-primary dark:text-dark-text-primary">{item.code || `Review from ${item.timestamp}`}</p>
                 {item.summary && (
                    <p className="text-xs font-semibold mt-2">
                        <span className="px-2 py-0.5 inline-block rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-secondary dark:bg-brand-secondary/20">
                            {item.summary}
                        </span>
                    </p>
                )}
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">{item.timestamp}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
