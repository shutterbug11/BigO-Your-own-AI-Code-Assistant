import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { FeatureSelector } from './components/FeatureSelector';
import { ReviewOutput } from './components/ReviewOutput';
import { HistoryPanel } from './components/HistoryPanel';
import { NotesPanel } from './components/NotesPanel';
import { Logo } from './components/Logo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { getAICodeReview, getCorrectedCode } from './services/geminiService';
import type { ReviewResult, ReviewItem, FeatureKey } from './types';
import { FEATURES } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useTheme();
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureKey>>(new Set(['socraticFeedback']));
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCorrecting, setIsCorrecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [history, setHistory] = useLocalStorage<ReviewItem[]>('codeReviewHistory', []);
  const [notes, setNotes] = useLocalStorage<string>('codeReviewNotes', '');
  
  const [activeTab, setActiveTab] = useState<'history' | 'notes'>('history');

  const generateHistorySummary = (result: ReviewResult): string => {
    const summaryParts: string[] = [];
    if (result.requirementValidation) {
        summaryParts.push(result.requirementValidation.isMet ? 'Reqs Met' : 'Reqs Not Met');
    }
    if (result.generativeTesting && result.generativeTesting.tests.length > 0) {
        summaryParts.push('Tests Generated');
    }
    if (summaryParts.length === 0 && result.socraticFeedback) {
        summaryParts.push('Socratic Feedback');
    }
    return summaryParts.slice(0, 2).join(', ');
  };


  const handleFeatureToggle = (featureKey: FeatureKey) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureKey)) {
        newSet.delete(featureKey);
      } else {
        newSet.add(featureKey);
      }
      return newSet;
    });
  };

  const handleReview = useCallback(async () => {
    if (!code.trim() || selectedFeatures.size === 0) {
      setError('Code and at least one feature must be provided.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReviewResult(null);

    try {
      const result = await getAICodeReview(code, Array.from(selectedFeatures), language);
      setReviewResult(result);
      
      const newHistoryItem: ReviewItem = {
        id: new Date().toISOString(),
        code,
        features: Array.from(selectedFeatures),
        result,
        timestamp: new Date().toLocaleString(),
        language,
        summary: generateHistorySummary(result),
      };
      setHistory([newHistoryItem, ...history]);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get code review. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [code, selectedFeatures, language, history, setHistory]);

  const handleCorrectCode = async () => {
    if (!code.trim()) {
        setError('Please provide some code to correct.');
        return;
    }
    setIsCorrecting(true);
    setError(null);
    setReviewResult(null);

    try {
        const correctedCode = await getCorrectedCode(code, language);
        setCode(correctedCode);
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to correct code. ${errorMessage}`);
    } finally {
        setIsCorrecting(false);
    }
  };

  const loadFromHistory = (item: ReviewItem) => {
    setCode(item.code);
    setSelectedFeatures(new Set(item.features));
    setReviewResult(item.result);
    setLanguage(item.language);
    setError(null);
  };
  
  const clearHistory = () => {
    setHistory([]);
  };

  const isBusy = isLoading || isCorrecting;

  return (
    <div className={`min-h-screen font-sans text-light-text-primary dark:text-dark-text-primary ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-light-surface dark:bg-dark-surface border-t lg:border-t-0 lg:border-r border-light-border dark:border-dark-border flex flex-col">
          <div className="flex border-b border-light-border dark:border-dark-border">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 p-3 text-sm font-medium transition-colors ${activeTab === 'history' ? 'bg-brand-primary/10 text-brand-primary dark:text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-light-text-secondary dark:text-dark-text-secondary'}`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 p-3 text-sm font-medium transition-colors ${activeTab === 'notes' ? 'bg-brand-primary/10 text-brand-primary dark:text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-light-text-secondary dark:text-dark-text-secondary'}`}
            >
              Notes
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {activeTab === 'history' ? (
              <HistoryPanel history={history} onSelect={loadFromHistory} onClear={clearHistory} />
            ) : (
              <NotesPanel notes={notes} setNotes={setNotes} />
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Column: Inputs */}
          <div className="p-4 md:p-6 lg:p-8 overflow-y-auto space-y-8">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary tracking-wider uppercase">Code & Language</h2>
                <CodeInput 
                  code={code}
                  setCode={setCode}
                  language={language}
                  setLanguage={setLanguage}
                />
                 <div className="flex justify-start gap-4">
                    <button
                        onClick={handleReview}
                        disabled={isBusy}
                        className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50 transition-all duration-300 disabled:from-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Analyzing...</span>
                            </>
                        ) : '✨ Review with BigO'}
                    </button>
                    <button
                        onClick={handleCorrectCode}
                        disabled={isBusy}
                        className="px-6 py-3 bg-light-surface dark:bg-dark-surface border border-brand-primary text-brand-primary dark:text-white dark:border-brand-secondary font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 flex items-center gap-2"
                    >
                         {isCorrecting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                                <span>Correcting...</span>
                            </>
                        ) : '🔧 Correct with BigO'}
                    </button>
                </div>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary tracking-wider uppercase">Analysis Features</h2>
                <FeatureSelector features={FEATURES} selectedFeatures={selectedFeatures} onToggle={handleFeatureToggle} />
            </div>
          </div>
          
          {/* Right Column: Outputs */}
          <div className="relative p-4 md:p-6 lg:p-8 overflow-y-auto border-t lg:border-t-0 lg:border-l border-light-border dark:border-dark-border">
            {(isLoading || isCorrecting) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-light-bg/80 dark:bg-dark-bg/80 z-10">
                <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                  {isLoading ? 'BigO is thinking...' : 'Applying corrections...'}
                </p>
              </div>
            )}
            {!isBusy && !reviewResult && !error && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-64 h-64 opacity-20 dark:opacity-10">
                  <Logo />
                </div>
                <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
                  Your review results will appear here.
                </p>
              </div>
            )}
            
            {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg text-center">{error}</div>}
            
            {reviewResult && <ReviewOutput result={reviewResult} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;