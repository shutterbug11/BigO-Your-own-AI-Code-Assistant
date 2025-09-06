import React, { useRef } from 'react';
import { LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);


export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCode(text);

      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension) {
        const detectedLang = LANGUAGES.find(lang => lang.extensions.includes(extension));
        if (detectedLang) {
          setLanguage(detectedLang.key);
        }
      }
    };
    reader.onerror = () => {
        console.error("Failed to read file.");
    }
    reader.readAsText(file);

    event.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const acceptedFileTypes = LANGUAGES.flatMap(lang => lang.extensions).map(ext => `.${ext}`).join(',');

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
        <div className="flex justify-between items-center mb-2">
            <label htmlFor="code-input" className="font-medium text-light-text-secondary dark:text-dark-text-secondary">
              Code to Review
            </label>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept={acceptedFileTypes}
            />
            <button
                onClick={handleUploadClick}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold border border-light-border dark:border-dark-border rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-light-text-secondary dark:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Upload a code file"
            >
                <UploadIcon className="w-4 h-4" />
                Upload File
            </button>
        </div>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here or upload a file..."
          className="p-3 font-mono text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow resize-none h-96"
        />
      </div>
    </div>
  );
};