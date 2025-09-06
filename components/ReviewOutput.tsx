
import React, { useState } from 'react';
import type { ReviewResult } from '../types';
import { CopyButton } from './CopyButton';

const OutputCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg shadow-sm overflow-hidden">
        <h3 className="text-lg font-semibold p-4 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-b border-light-border dark:border-dark-border">
            {title}
        </h3>
        <div className="p-4 space-y-3 prose prose-sm dark:prose-invert max-w-none">
            {children}
        </div>
    </div>
);

const NoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

interface ReviewOutputProps {
  result: ReviewResult;
  onTakeNote: () => void;
}

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ result, onTakeNote }) => {
  const [noteTaken, setNoteTaken] = useState(false);

  const handleTakeNoteClick = () => {
    onTakeNote();
    setNoteTaken(true);
    setTimeout(() => {
        setNoteTaken(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Review Results</h2>
         <button
            onClick={handleTakeNoteClick}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold border rounded-md transition-all duration-300 ${
                noteTaken
                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                : 'border-light-border dark:border-dark-border hover:bg-black/5 dark:hover:bg-white/5 text-light-text-secondary dark:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary'
            }`}
            aria-label="Take note of this review"
          >
            {noteTaken ? <CheckIcon className="w-4 h-4" /> : <NoteIcon className="w-4 h-4" />}
            {noteTaken ? 'Note Taken!' : 'Take Note'}
          </button>
      </div>
      
      {result.socraticFeedback && (
        <OutputCard title="Socratic Feedback">
          <ul className="list-disc pl-5 space-y-2">
            {result.socraticFeedback.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </OutputCard>
      )}

      {result.requirementValidation && (
        <OutputCard title="Requirement Validation">
          <div className={`p-3 rounded-md mb-3 flex items-center gap-3 ${result.requirementValidation.isMet ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'}`}>
            <strong>Status:</strong> {result.requirementValidation.isMet ? "Requirements Met" : "Requirements Not Met"}
          </div>
          <p>{result.requirementValidation.summary}</p>
          {result.requirementValidation.discrepancies?.length > 0 && (
            <>
              <h4 className="font-semibold mt-3">Discrepancies:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {result.requirementValidation.discrepancies.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </>
          )}
        </OutputCard>
      )}

      {result.onboardingAssistance && (
        <OutputCard title="Onboarding Assistance">
          <h4 className="font-semibold">Suggested Comments:</h4>
          <div className="relative">
            <CopyButton textToCopy={result.onboardingAssistance.comments} />
            <pre className="bg-light-bg dark:bg-dark-bg p-3 rounded-md font-mono text-xs overflow-x-auto border-l-4 border-brand-secondary"><code className="whitespace-pre-wrap">{result.onboardingAssistance.comments}</code></pre>
          </div>
          <h4 className="font-semibold mt-3">Auto-Generated Documentation:</h4>
          <p>{result.onboardingAssistance.documentation}</p>
        </OutputCard>
      )}

      {result.generativeTesting && (
        <OutputCard title="Generative Testing">
            {result.generativeTesting.tests.map((test, i) => (
                <div key={i}>
                    <h4 className="font-semibold">{test.type}:</h4>
                    <div className="relative">
                        <CopyButton textToCopy={test.code} />
                        <pre className="bg-light-bg dark:bg-dark-bg p-3 rounded-md font-mono text-xs overflow-x-auto border-l-4 border-brand-secondary"><code>{test.code}</code></pre>
                    </div>
                </div>
            ))}
        </OutputCard>
      )}

    </div>
  );
};
