import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="flex items-center justify-between p-4 h-16 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border shadow-sm">
      <div className="flex items-center gap-3">
         <Logo className="w-8 h-8" />
        <h1 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
          BigO
        </h1>
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
};
