import React from 'react';
import type { ReviewResult } from '../types';

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

export const ReviewOutput: React.FC<{ result: ReviewResult }> = ({ result }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Review Results</h2>
      
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
          <pre className="bg-light-bg dark:bg-dark-bg p-3 rounded-md font-mono text-xs overflow-x-auto border-l-4 border-brand-secondary"><code className="whitespace-pre-wrap">{result.onboardingAssistance.comments}</code></pre>
          <h4 className="font-semibold mt-3">Auto-Generated Documentation:</h4>
          <p>{result.onboardingAssistance.documentation}</p>
        </OutputCard>
      )}

      {result.generativeTesting && (
        <OutputCard title="Generative Testing">
            {result.generativeTesting.tests.map((test, i) => (
                <div key={i}>
                    <h4 className="font-semibold">{test.type}:</h4>
                    <pre className="bg-light-bg dark:bg-dark-bg p-3 rounded-md font-mono text-xs overflow-x-auto border-l-4 border-brand-secondary"><code>{test.code}</code></pre>
                </div>
            ))}
        </OutputCard>
      )}

    </div>
  );
};