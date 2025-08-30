
import React from 'react';

interface NotesPanelProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ notes, setNotes }) => {
  return (
    <div className="p-3 h-full flex flex-col">
      <h3 className="text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Scratchpad</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Take notes on your code reviews here..."
        className="w-full flex-grow p-2 text-sm bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-brand-primary focus:outline-none resize-none"
      />
    </div>
  );
};
