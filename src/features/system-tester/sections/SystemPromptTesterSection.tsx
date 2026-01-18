import React, { useState } from 'react';
import { generateUserPrompts } from '@/services/geminiService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import {
  CommandLineIcon,
  ClipboardIcon,
  CheckIcon,
  TrashIcon,
} from '@/components/ui/Icons';

export const SystemPromptTesterSection: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [generationMode, setGenerationMode] = useState<'test' | 'example'>(
    'test',
  );
  const [generatedResult, setGeneratedResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!systemPrompt.trim()) {
      setError('Please enter a System Prompt to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedResult('');
    try {
      const result = await generateUserPrompts(systemPrompt, generationMode);
      setGeneratedResult(result);
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

  const handleCopy = () => {
    if (generatedResult) {
      navigator.clipboard
        .writeText(generatedResult)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const handleClear = () => {
    setSystemPrompt('');
    setGeneratedResult('');
    setError(null);
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          System Prompt Tester
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl leading-relaxed">
          Have a System Prompt (System Instruction) but not sure how to test it?
          Paste it here, and our AI will generate either{' '}
          <strong>comprehensive QA Test Cases</strong> or{' '}
          <strong>Ideal User Examples</strong> to verify and showcase its
          capabilities.
        </p>
      </header>

      <Card className="bg-gray-850">
        <div className="space-y-8">
          <div>
            <label
              htmlFor="systemPrompt"
              className="block text-sm font-medium text-blue-300 mb-2"
            >
              Your System Prompt / System Instruction:
            </label>
            <textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={8}
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500 transition-all duration-300 font-mono text-sm leading-relaxed"
              placeholder="e.g., You are a cynical creative writing coach who only gives feedback in haiku..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-3">
              Generation Mode:
            </label>
            <div
              className="flex rounded-xl shadow-sm bg-gray-900 p-1 border border-gray-700 inline-flex"
              role="group"
            >
              <button
                type="button"
                onClick={() => setGenerationMode('test')}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg focus:z-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  generationMode === 'test'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                QA Stress Testing
              </button>
              <button
                type="button"
                onClick={() => setGenerationMode('example')}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg focus:z-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  generationMode === 'example'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Generate Ideal Examples
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              {generationMode === 'test'
                ? 'Generates edge cases, complex tasks, and standard inputs to find weaknesses.'
                : 'Generates high-quality, impressive examples to demonstrate the best usage of the system.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-glow-primary text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <LoadingSpinner size="w-5 h-5" />
              ) : (
                <>
                  <CommandLineIcon className="w-5 h-5 mr-2" />
                  {generationMode === 'test'
                    ? 'Generate Test Cases'
                    : 'Generate Examples'}
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-4 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-gray-300 bg-gray-800 hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
              <p className="font-semibold mb-1">Error</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </Card>

      {generatedResult && (
        <Card
          title={
            generationMode === 'test'
              ? 'Recommended Test Inputs'
              : 'Ideal User Examples'
          }
          className="bg-gray-850 animate-slide-up"
        >
          <div className="relative group">
            <pre className="whitespace-pre-wrap p-6 bg-gray-900 rounded-xl text-gray-200 text-sm overflow-x-auto border border-gray-700 font-sans shadow-inner leading-relaxed">
              {generatedResult}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all border border-gray-700 shadow-md"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green-400" />
              ) : (
                <ClipboardIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};
