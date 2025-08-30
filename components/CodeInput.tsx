import React from 'react';
import { LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="language-select" className="block mb-2 font-medium text-light-text-secondary dark:text-dark-text-secondary">
          Programming Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
        >
          {LANGUAGES.map(lang => (
            <option key={lang.key} value={lang.key}>{lang.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="code-input" className="mb-2 font-medium text-light-text-secondary dark:text-dark-text-secondary">
          Code to Review
        </label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="p-3 font-mono text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow resize-none h-96"
        />
      </div>
    </div>
  );
};