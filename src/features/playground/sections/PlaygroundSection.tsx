import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateEnhancedPrompt } from '@/services/geminiService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { AccordionItem } from '@/components/ui/Accordion';
import {
  SparklesIcon,
  ClipboardIcon,
  CheckIcon,
  ShareIcon,
  TrashIcon,
  ClockIcon,
  LinkIcon,
  LightBulbIcon,
} from '@/components/ui/Icons';
import { playgroundExamples } from '@/constants/playgroundExamples';
import type { PlaygroundExample, HistoryItem } from '@/types';
import { Suggestions } from '@/components/ui/Suggestions';
import { playgroundSuggestions } from '@/constants/playgroundSuggestions';

const LOCAL_STORAGE_KEY = 'promptHistory';

interface PlaygroundSectionProps {
  initialPrompt?: string;
  onPromptUsed?: () => void;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  initialPrompt,
  onPromptUsed,
}) => {
  const [userInput, setUserInput] = useState<string>(initialPrompt || '');
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareStatus, setShareStatus] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [isChaining, setIsChaining] = useState<boolean>(false);

  const topRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const savedHistory = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Failed to load history from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history to localStorage', error);
    }
  }, [history]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPrompt = params.get('prompt');
    const sharedInstructions = params.get('instructions');

    if (initialPrompt && onPromptUsed) {
      setUserInput(initialPrompt);
      setCustomInstructions('');
      onPromptUsed();
    } else if (sharedPrompt) {
      setUserInput(decodeURIComponent(sharedPrompt));
    }

    if (sharedInstructions) {
      setCustomInstructions(decodeURIComponent(sharedInstructions));
    }

    if (sharedPrompt || sharedInstructions) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [initialPrompt, onPromptUsed]);

  const handleGeneratePrompt = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a base idea or prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');
    try {
      const enhancedPrompt = await generateEnhancedPrompt(
        userInput,
        customInstructions,
      );
      setGeneratedPrompt(enhancedPrompt);

      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        prompt: userInput,
        response: enhancedPrompt,
        userInput,
        customInstructions,
        generatedPrompt: enhancedPrompt,
        timestamp: new Date().toISOString(),
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]);
    } catch (catchError) {
      if (catchError instanceof Error) {
        setError(catchError.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userInput, customInstructions]);

  const handleCopyToClipboard = useCallback(() => {
    if (generatedPrompt) {
      navigator.clipboard
        .writeText(generatedPrompt)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          console.error('Failed to copy text: ');
          setError('Failed to copy text to clipboard.');
        });
    }
  }, [generatedPrompt]);

  const handleSharePrompt = useCallback(async () => {
    if (!generatedPrompt) return;

    const shareData = {
      title: 'AI-Generated Prompt',
      text: generatedPrompt,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        console.error('Error sharing');
      }
    } else {
      const shareUrl = `${window.location.origin}${window.location.pathname}?prompt=${encodeURIComponent(userInput)}&instructions=${encodeURIComponent(customInstructions)}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('Share link copied to clipboard!');
        setTimeout(() => setShareStatus(''), 2500);
      } catch {
        setShareStatus('Failed to copy share link.');
        setTimeout(() => setShareStatus(''), 2500);
      }
    }
  }, [generatedPrompt, userInput, customInstructions]);

  const handleChainPrompt = useCallback(() => {
    if (!generatedPrompt) return;

    setIsChaining(true);
    setUserInput(generatedPrompt);
    setCustomInstructions('');
    setGeneratedPrompt('');

    topRef.current?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      inputAreaRef.current?.focus();
      setIsChaining(false);
    }, 500);
  }, [generatedPrompt]);

  const handleClearAll = useCallback(() => {
    setUserInput('');
    setCustomInstructions('');
    setGeneratedPrompt('');
    setError(null);
    setCopied(false);
  }, []);

  const handleSelectExample = (example: PlaygroundExample) => {
    setUserInput(example.userInput);
    setCustomInstructions(example.customInstructions);
  };

  const handleSelectSuggestion = useCallback((suggestion: string) => {
    setUserInput(suggestion);
  }, []);

  const handleReuseHistory = (item: HistoryItem) => {
    setUserInput(item.userInput);
    setCustomInstructions(item.customInstructions);
    setGeneratedPrompt(item.generatedPrompt);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto" ref={topRef}>
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          Prompt Playground
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl leading-relaxed">
          Transform your basic ideas into powerful, high-performance AI prompts.
          Enter your concept, or start with an example, and let our AI Prompt
          Genius craft an enhanced version for you.
        </p>
      </header>

      {showSuggestions && (
        <Suggestions
          suggestions={playgroundSuggestions}
          onSelect={handleSelectSuggestion}
          onClose={() => setShowSuggestions(false)}
        />
      )}

      <Card title="Start with an Example" className="bg-gray-850">
        <div className="flex flex-wrap gap-2">
          {playgroundExamples.map((ex) => (
            <button
              key={ex.title}
              onClick={() => handleSelectExample(ex)}
              className="px-4 py-2 bg-gray-700/50 border border-gray-600 text-sm text-blue-300 rounded-full hover:bg-gray-600 hover:text-white transition-all hover:shadow-glow-primary hover:border-blue-500/50"
            >
              {ex.title}
            </button>
          ))}
        </div>
      </Card>

      <Card
        className={`bg-gray-850 transition-all duration-300 ${isChaining ? 'ring-2 ring-blue-500 ring-opacity-50 scale-[1.01]' : ''}`}
      >
        <div className="space-y-6">
          <div className="relative">
            <label
              htmlFor="userInput"
              className="block text-sm font-medium text-blue-300 mb-2"
            >
              Your Base Idea or Existing Prompt:
            </label>
            <textarea
              ref={inputAreaRef}
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={6}
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500 transition-all duration-300 text-sm leading-relaxed"
              placeholder="e.g., A story about a time-traveling cat."
              aria-label="Your Base Idea or Existing Prompt"
            />
            {isChaining && (
              <div className="absolute top-10 left-0 w-full h-full pointer-events-none bg-blue-500/10 animate-pulse rounded-xl" />
            )}
          </div>

          <div>
            <label
              htmlFor="customInstructions"
              className="block text-sm font-medium text-blue-300 mb-2"
            >
              Optional: Specific Instructions for Enhancement:
            </label>
            <textarea
              id="customInstructions"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              rows={3}
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500 transition-all duration-300 text-sm leading-relaxed"
              placeholder="e.g., Target audience: young adults. Tone: humorous and witty..."
              aria-label="Optional: Specific Instructions for Enhancement"
            />
            <p className="mt-2 text-xs text-gray-400">
              Examples: desired tone, style, length, target audience, key
              elements to include/exclude.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleGeneratePrompt}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-glow-primary text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="w-5 h-5" />
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  Generate Enhanced Prompt
                </>
              )}
            </button>
            <button
              onClick={handleClearAll}
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-4 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-gray-300 bg-gray-800 hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              aria-label="Clear all inputs and results"
            >
              Clear All
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm"
            >
              <p className="font-semibold mb-1">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </Card>

      {generatedPrompt && (
        <Card
          title="✨ Genius-Level Prompt ✨"
          className="bg-gray-850 animate-slide-up"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <pre
              className="relative whitespace-pre-wrap p-6 bg-gray-900 rounded-xl text-gray-200 text-sm overflow-x-auto border border-gray-700 shadow-2xl font-mono leading-relaxed"
              aria-label="Generated enhanced prompt"
            >
              <code>{generatedPrompt}</code>
            </pre>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleChainPrompt}
                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg text-blue-300 hover:text-white transition-all shadow-lg border border-gray-700 flex items-center gap-1.5"
                title="Chain to Input"
              >
                <LinkIcon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline text-[10px] font-bold tracking-wider uppercase">
                  Chain
                </span>
              </button>
              <button
                onClick={handleSharePrompt}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all shadow-lg border border-gray-700"
                title="Share prompt"
              >
                <ShareIcon className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={handleCopyToClipboard}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all shadow-lg border border-gray-700"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 text-teal-400" />
                ) : (
                  <ClipboardIcon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          {shareStatus && (
            <p className="text-xs text-teal-400 mt-2 text-right">
              {shareStatus}
            </p>
          )}
          <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <p className="text-xs text-blue-300 flex items-center gap-3">
              <LightBulbIcon className="w-5 h-5 flex-shrink-0" />
              <span>
                Tip: Click <strong>CHAIN</strong> to use this refined output as
                your next starting point for iterative prompt engineering.
              </span>
            </p>
          </div>
        </Card>
      )}

      {history.length > 0 && (
        <AccordionItem title="Prompt History">
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium text-blue-300 truncate"
                      title={item.userInput}
                    >
                      {item.userInput}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                      <ClockIcon className="w-3 h-3" />
                      {item.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReuseHistory(item)}
                      className="px-3 py-1 text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Reuse
                    </button>
                  </div>
                </div>
                <details className="mt-3 group">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 select-none flex items-center gap-2">
                    <span className="group-open:hidden">▶ View Details</span>
                    <span className="hidden group-open:inline">
                      ▼ Hide Details
                    </span>
                  </summary>
                  <div className="mt-3 p-3 bg-gray-950 rounded-lg border border-gray-800">
                    {item.customInstructions && (
                      <div className="mb-3">
                        <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                          Instructions
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.customInstructions}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                        Result
                      </p>
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                        <code>{item.generatedPrompt}</code>
                      </pre>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </AccordionItem>
      )}
    </div>
  );
};
