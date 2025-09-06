import React from 'react';
import type { Feature } from './types';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-8 h-8 mb-2 text-brand-primary dark:text-brand-secondary">{children}</div>
);

export const FEATURES: Feature[] = [
  {
    key: 'requirementValidation',
    title: 'Requirement Validation',
    description: "Analyzes if the code's logic fully implements a given user story.",
    icon: (
        <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        </IconWrapper>
    ),
  },
  {
    key: 'onboardingAssistance',
    title: 'Onboarding Assistance',
    description: 'Auto-generates comments and documentation for complex code.',
    icon: (
        <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
        </IconWrapper>
    ),
  },
  {
    key: 'generativeTesting',
    title: 'Generative Testing',
    description: 'Creates meaningful unit, integration, and edge-case tests.',
    icon: (
        <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
        </IconWrapper>
    ),
  },
  {
    key: 'socraticFeedback',
    title: 'Socratic Feedback',
    description: 'Delivers feedback as guiding questions to encourage critical thinking.',
    icon: (
        <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h8.25M8.25 12h5.25m-5.25 5.25h3M3.75 6a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" /></svg>
        </IconWrapper>
    ),
  },
];

export const LANGUAGES = [
    { key: 'javascript', name: 'JavaScript', extensions: ['js', 'jsx', 'mjs', 'cjs'] },
    { key: 'typescript', name: 'TypeScript', extensions: ['ts', 'tsx'] },
    { key: 'python', name: 'Python', extensions: ['py'] },
    { key: 'java', name: 'Java', extensions: ['java'] },
    { key: 'csharp', name: 'C#', extensions: ['cs'] },
    { key: 'go', name: 'Go', extensions: ['go'] },
    { key: 'rust', name: 'Rust', extensions: ['rs'] },
    { key: 'html', name: 'HTML', extensions: ['html', 'htm'] },
    { key: 'css', name: 'CSS', extensions: ['css'] },
    { key: 'sql', name: 'SQL', extensions: ['sql'] },
];