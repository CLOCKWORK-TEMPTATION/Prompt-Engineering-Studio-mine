import React, { useState, useEffect, useCallback, useRef } from 'react';
import { optimizeUserPromptStructured } from '../../services/geminiService';
import { LoadingSpinner } from '../LoadingSpinner';
import { Card } from '../Card';
import { Suggestions } from '../Suggestions';
import { AccordionItem } from '../Accordion';
import { playgroundSuggestions } from '../../constants/playgroundSuggestions';
import { optimizerExamples } from '../../constants/optimizerExamples';
import type { OptimizerHistoryItem, PlaygroundExample, OptimizerResponse } from '../../types';
import {
  PencilSquareIcon,
  ClipboardIcon,
  CheckIcon,
  TrashIcon,
  LinkIcon,
  ShareIcon,
  LightBulbIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '../Icons';

const LOCAL_STORAGE_KEY = 'optimizerHistory';

type PromptVariant = 'generic' | 'chatgpt' | 'claude' | 'gemini' | 'kimi';

// Variant display configuration
const VARIANT_CONFIG: Record<PromptVariant, { label: string; color: string; description: string }> = {
  generic: { label: 'Generic', color: 'teal', description: 'Works with most AI models' },
  chatgpt: { label: 'ChatGPT', color: 'emerald', description: 'Optimized for OpenAI models' },
  claude: { label: 'Claude', color: 'amber', description: 'Optimized for Anthropic models' },
  gemini: { label: 'Gemini', color: 'blue', description: 'Optimized for Google models' },
  kimi: { label: 'Kimi', color: 'purple', description: 'Optimized for Moonshot AI' }
};

interface UserPromptOptimizerSectionProps {
  onUseInPlayground?: (optimizedPrompt: string) => void;
}

export const UserPromptOptimizerSection: React.FC<UserPromptOptimizerSectionProps> = ({ onUseInPlayground }) => {
  // Input state
  const [userInput, setUserInput] = useState<string>('');
  const [customInstructions, setCustomInstructions] = useState<string>('');

  // Output state - now structured
  const [optimizerResponse, setOptimizerResponse] = useState<OptimizerResponse | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<PromptVariant>('generic');

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareStatus, setShareStatus] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(true);

  const [isChaining, setIsChaining] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);

  // History state with support for both legacy and structured formats
  const [history, setHistory] = useState<OptimizerHistoryItem[]>(() => {
    try {
      const savedHistory = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!savedHistory) return [];

      const parsed = JSON.parse(savedHistory);
      // Migrate legacy history items to new format
      return parsed.map((item: any) => ({
        ...item,
        isStructured: item.isStructured || false,
        result: item.result || item.generatedPrompt || ''
      }));
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
      return [];
    }
  });

  // Persist history to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  // Handle shared prompt from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPrompt = params.get('prompt');
    const sharedInstructions = params.get('instructions');

    if (sharedPrompt) {
      setUserInput(decodeURIComponent(sharedPrompt));
    }

    if (sharedInstructions) {
      setCustomInstructions(decodeURIComponent(sharedInstructions));
    }

    if (sharedPrompt || sharedInstructions) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Get available variants from response
  const availableVariants = React.useMemo(() => {
    if (!optimizerResponse) return ['generic' as PromptVariant];

    const variants: PromptVariant[] = ['generic'];
    if (optimizerResponse.variants.chatgpt) variants.push('chatgpt');
    if (optimizerResponse.variants.claude) variants.push('claude');
    if (optimizerResponse.variants.gemini) variants.push('gemini');
    if (optimizerResponse.variants.kimi) variants.push('kimi');

    return variants;
  }, [optimizerResponse]);

  // Get current selected prompt text
  const currentPrompt = React.useMemo(() => {
    if (!optimizerResponse) return '';

    const variantText = optimizerResponse.variants[selectedVariant];
    return variantText || optimizerResponse.variants.generic;
  }, [optimizerResponse, selectedVariant]);

  // Main optimization handler
  const handleOptimize = async () => {
    if (!userInput.trim()) {
      setError('Please enter a prompt to optimize.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOptimizerResponse(null);
    setSelectedVariant('generic');

    try {
      const result = await optimizeUserPromptStructured(userInput, customInstructions);
      setOptimizerResponse(result);

      // Save to history
      const newHistoryItem: OptimizerHistoryItem = {
        id: new Date().toISOString(),
        userInput,
        customInstructions,
        result,
        isStructured: true,
        timestamp: new Date().toLocaleString()
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 19)]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Copy handler
  const handleCopy = () => {
    if (currentPrompt) {
      navigator.clipboard.writeText(currentPrompt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  // Share handler
  const handleSharePrompt = useCallback(async () => {
    if (!currentPrompt) return;

    const shareData = {
      title: 'Optimized Prompt',
      text: currentPrompt,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      const shareUrl = `${window.location.origin}${window.location.pathname}?prompt=${encodeURIComponent(userInput)}&instructions=${encodeURIComponent(customInstructions)}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('Share link copied to clipboard!');
        setTimeout(() => setShareStatus(''), 2500);
      } catch (err) {
        setShareStatus('Failed to copy.');
        setTimeout(() => setShareStatus(''), 2500);
      }
    }
  }, [currentPrompt, userInput, customInstructions]);

  // Chain handler - use selected variant as new input
  const handleChainPrompt = useCallback(() => {
    if (!currentPrompt) return;

    setIsChaining(true);
    setUserInput(currentPrompt);
    setCustomInstructions('');
    setOptimizerResponse(null);
    setSelectedVariant('generic');

    topRef.current?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      inputAreaRef.current?.focus();
      setIsChaining(false);
    }, 500);
  }, [currentPrompt]);

  // Clear handler
  const handleClear = () => {
    setUserInput('');
    setCustomInstructions('');
    setOptimizerResponse(null);
    setError(null);
    setSelectedVariant('generic');
  };

  // Suggestion selection handler
  const handleSelectSuggestion = useCallback((suggestion: string) => {
    setUserInput(suggestion);
  }, []);

  // Example selection handler
  const handleSelectExample = (example: PlaygroundExample) => {
    setUserInput(example.userInput);
    setCustomInstructions(example.customInstructions);
  };

  // History reuse handler
  const handleReuseHistory = (item: OptimizerHistoryItem) => {
    setUserInput(item.userInput);
    setCustomInstructions(item.customInstructions);

    if (item.isStructured && typeof item.result === 'object') {
      setOptimizerResponse(item.result as OptimizerResponse);
      setSelectedVariant('generic');
    } else if (typeof item.result === 'string') {
      // Legacy format - display as-is
      setOptimizerResponse(null);
    }

    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // History delete handler
  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Use in Playground handler
  const handleUseInPlaygroundClick = useCallback(() => {
    if (currentPrompt && onUseInPlayground) {
      onUseInPlayground(currentPrompt);
    }
  }, [currentPrompt, onUseInPlayground]);

  // Render analysis section
  const renderAnalysis = () => {
    if (!optimizerResponse?.analysis) return null;

    const { analysis } = optimizerResponse;

    return (
      <Card
        title={
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex items-center gap-2 w-full text-left"
          >
            <InformationCircleIcon className="w-5 h-5" />
            <span>Analysis & Diagnosis</span>
            <span className={`ml-auto transition-transform ${showAnalysis ? 'rotate-180' : ''}`}>▼</span>
          </button>
        }
        className="bg-gray-850"
      >
        {showAnalysis && (
          <div className="space-y-4">
            {/* Quality Score */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">Quality Score:</div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                analysis.quality_score >= 80 ? 'bg-emerald-500/20 text-emerald-300' :
                analysis.quality_score >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {analysis.quality_score}/100
              </div>
              <div className="text-xs text-gray-500">
                {analysis.language} • {analysis.intent}
              </div>
            </div>

            {/* Privacy Warnings */}
            {analysis.privacy_warnings && analysis.privacy_warnings.length > 0 && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-red-300 mb-1">Privacy & Security Alerts</div>
                    <ul className="text-xs text-red-200 space-y-1">
                      {analysis.privacy_warnings.map((warning, idx) => (
                        <li key={idx}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Missing Info */}
            {analysis.missing_info && analysis.missing_info.length > 0 && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <InformationCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-amber-300 mb-1">Potentially Missing Information</div>
                    <ul className="text-xs text-amber-200 space-y-1">
                      {analysis.missing_info.map((info, idx) => (
                        <li key={idx}>• {info}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Clarifying Questions */}
            {analysis.clarifying_questions && analysis.clarifying_questions.length > 0 && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-blue-300 mb-1">Clarifying Questions</div>
                    <ul className="text-xs text-blue-200 space-y-1">
                      {analysis.clarifying_questions.map((question, idx) => (
                        <li key={idx}>• {question}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Assumptions */}
            {analysis.assumptions && analysis.assumptions.length > 0 && (
              <div className="p-3 bg-gray-700/30 border border-gray-600/30 rounded-lg">
                <div className="text-sm font-semibold text-gray-300 mb-2">Assumptions Made</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  {analysis.assumptions.map((assumption, idx) => (
                    <li key={idx}>• {assumption}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  // Render variant selector
  const renderVariantSelector = () => {
    if (!optimizerResponse) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {availableVariants.map((variant) => {
          const config = VARIANT_CONFIG[variant];
          const isActive = selectedVariant === variant;

          return (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                isActive
                  ? `bg-${config.color}-600 text-white border-${config.color}-500`
                  : `bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-${config.color}-500/50`
              }`}
              title={config.description}
            >
              {config.label}
            </button>
          );
        })}
      </div>
    );
  };

  // Get display text for history item
  const getHistoryItemDisplayText = (item: OptimizerHistoryItem): string => {
    if (item.isStructured && typeof item.result === 'object') {
      return (item.result as OptimizerResponse).variants.generic;
    }
    return item.result as string;
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto" ref={topRef}>
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 pb-2">
          User Prompt Optimizer
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl leading-relaxed">
          Take your everyday prompts to the next level. Refine, clarify, and enhance your instructions to get better, faster, and more accurate results from any AI.
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
          {optimizerExamples.map(ex => (
            <button
              key={ex.title}
              onClick={() => handleSelectExample(ex)}
              className="px-4 py-2 bg-gray-700/50 border border-gray-600 text-sm text-teal-300 rounded-full hover:bg-gray-600 hover:text-white transition-all hover:shadow-glow-secondary hover:border-teal-500/50"
            >
              {ex.title}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className={`bg-gray-850 h-full transition-all duration-300 ${isChaining ? 'ring-2 ring-teal-500 ring-opacity-50 scale-[1.01]' : ''}`}>
            <h2 className="text-xl font-semibold text-teal-300 mb-4 flex items-center">
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Input
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="userInput" className="block text-sm font-medium text-gray-300 mb-2">
                  Draft Prompt:
                </label>
                <textarea
                  ref={inputAreaRef}
                  id="userInput"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={6}
                  className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-inner focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-100 placeholder-gray-500 transition-all duration-300 text-sm leading-relaxed"
                  placeholder="Write your rough draft or basic idea here..."
                />
                {isChaining && (
                  <div className="absolute top-10 left-0 w-full h-full pointer-events-none bg-teal-500/10 animate-pulse rounded-xl" />
                )}
              </div>

              <div>
                <label htmlFor="customInstructions" className="block text-sm font-medium text-gray-300 mb-2">
                  Optimization Goals (Optional):
                </label>
                <textarea
                  id="customInstructions"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  rows={3}
                  className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-inner focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm leading-relaxed"
                  placeholder="e.g., Make it more professional, shorter, focus on clarity..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleOptimize}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-base font-semibold rounded-xl shadow-glow-secondary text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <LoadingSpinner size="w-5 h-5" />
                  ) : (
                    <>Optimize Prompt</>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="px-4 py-4 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-gray-300 bg-gray-800 hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 disabled:opacity-50 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card className="bg-gray-850 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-emerald-300 flex items-center">
                <span>Optimized Result</span>
              </h2>
              {currentPrompt && (
                <div className="flex gap-2">
                  <button
                    onClick={handleChainPrompt}
                    className="p-2 bg-gray-800 hover:bg-teal-600 rounded-lg text-teal-300 hover:text-white transition-all flex items-center gap-1.5 border border-gray-700"
                    title="Chain: Use this result as your new input"
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase hidden sm:inline">Chain</span>
                  </button>
                  {onUseInPlayground && (
                    <button
                      onClick={handleUseInPlaygroundClick}
                      className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg text-blue-300 hover:text-white transition-all flex items-center gap-1.5 border border-gray-700"
                      title="Use in Playground"
                    >
                      <SparklesIcon className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase hidden sm:inline">Playground</span>
                    </button>
                  )}
                  <button
                    onClick={handleSharePrompt}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-all border border-gray-700"
                    title="Share"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-gray-200 transition-all border border-gray-700"
                    title="Copy to clipboard"
                  >
                    {copied ? <CheckIcon className="w-4 h-4 text-emerald-400" /> : <ClipboardIcon className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {/* Variant Selector */}
            {renderVariantSelector()}

            {/* Result Display */}
            <div className="flex-grow bg-gray-900 rounded-xl border border-gray-700 p-6 relative min-h-[300px] shadow-inner">
              {currentPrompt ? (
                <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                  {currentPrompt}
                </pre>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 italic text-sm p-8 text-center space-y-2">
                  <LightBulbIcon className="w-8 h-8 opacity-20" />
                  <span>The optimized version of your prompt will appear here.</span>
                </div>
              )}
            </div>
            {shareStatus && <p className="text-xs text-emerald-400 mt-2 text-right">{shareStatus}</p>}

            {currentPrompt && (
              <div className="mt-4 p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                <p className="text-xs text-teal-300 flex items-center gap-2">
                  <LightBulbIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Tip: Click <strong>CHAIN</strong> to use this refined output as your next starting point.</span>
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Analysis Section */}
      {optimizerResponse && renderAnalysis()}

      {/* History Section */}
      {history.length > 0 && (
        <AccordionItem title="Optimization History">
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {history.map(item => {
              const displayText = getHistoryItemDisplayText(item);
              const isStructuredItem = item.isStructured && typeof item.result === 'object';

              return (
                <div key={item.id} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 mr-4 min-w-0">
                      <p className="text-sm font-medium text-teal-300 truncate" title={item.userInput}>
                        {item.userInput}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                        <ClockIcon className="w-3 h-3"/>
                        {item.timestamp}
                        {isStructuredItem && (
                          <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold uppercase">
                            Structured
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleDeleteHistory(item.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleReuseHistory(item)} className="px-3 py-1 text-xs font-semibold bg-teal-600/20 text-teal-300 border border-teal-500/30 rounded-lg hover:bg-teal-600 hover:text-white transition-all">
                        Reuse
                      </button>
                    </div>
                  </div>
                  <details className="mt-3 group">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 select-none flex items-center gap-2">
                      <span className="group-open:hidden">▶ View Details</span>
                      <span className="hidden group-open:inline">▼ Hide Details</span>
                    </summary>
                    <div className="mt-3 p-3 bg-gray-950 rounded-lg border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        {item.customInstructions && (
                          <>
                            <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Goals</p>
                            <p className="text-xs text-gray-300 mb-3">{item.customInstructions}</p>
                          </>
                        )}
                        <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Draft</p>
                        <p className="text-xs text-gray-400">{item.userInput}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Optimized</p>
                        <pre className="text-xs text-emerald-100 whitespace-pre-wrap font-mono bg-gray-900/50 p-2 rounded border border-gray-800/50">
                          {displayText.length > 500 ? displayText.substring(0, 500) + '...' : displayText}
                        </pre>
                      </div>
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </AccordionItem>
      )}
    </div>
  );
};
