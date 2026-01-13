import React, { useState } from 'react';
import {
  ClipboardIcon,
  CheckIcon,
  CodeBracketIcon,
} from '@/components/ui/Icons';

export interface DiffLine {
  content: string;
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  lineNumber?: number;
}

export interface DiffViewProps {
  original: string;
  optimized: string;
  language?: string;
  className?: string;
  onCopyOptimized?: () => void;
  showLineNumbers?: boolean;
}

type ViewMode = 'side-by-side' | 'unified' | 'inline';

export const DiffView: React.FC<DiffViewProps> = ({
  original,
  optimized,
  className = '',
  onCopyOptimized,
  showLineNumbers = true,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
  const [copied, setCopied] = useState(false);

  // Simple diff calculation - in production, use a proper diff library
  const calculateDiff = (): DiffLine[] => {
    const originalLines = original.split('\n');
    const optimizedLines = optimized.split('\n');
    const diff: DiffLine[] = [];

    // This is a simplified diff algorithm
    let i = 0;
    let j = 0;

    while (i < originalLines.length || j < optimizedLines.length) {
      if (i >= originalLines.length) {
        diff.push({
          content: optimizedLines[j],
          type: 'added',
          lineNumber: j + 1,
        });
        j++;
      } else if (j >= optimizedLines.length) {
        diff.push({
          content: originalLines[i],
          type: 'removed',
          lineNumber: i + 1,
        });
        i++;
      } else if (originalLines[i] === optimizedLines[j]) {
        diff.push({
          content: originalLines[i],
          type: 'unchanged',
          lineNumber: i + 1,
        });
        i++;
        j++;
      } else {
        // Lines are different - mark as removed/added
        diff.push({
          content: originalLines[i],
          type: 'removed',
          lineNumber: i + 1,
        });
        diff.push({
          content: optimizedLines[j],
          type: 'added',
          lineNumber: j + 1,
        });
        i++;
        j++;
      }
    }

    return diff;
  };

  const diff = calculateDiff();

  const handleCopy = () => {
    navigator.clipboard.writeText(optimized).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopyOptimized?.();
    });
  };

  const getLineClass = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return 'bg-emerald-500/10 border-l-2 border-emerald-500';
      case 'removed':
        return 'bg-red-500/10 border-l-2 border-red-500';
      case 'modified':
        return 'bg-yellow-500/10 border-l-2 border-yellow-500';
      default:
        return 'border-l-2 border-transparent';
    }
  };

  const getLineIcon = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return '<span class="text-emerald-400">+</span>';
      case 'removed':
        return '<span class="text-red-400">-</span>';
      default:
        return '<span class="text-gray-600"> </span>';
    }
  };

  const stats = {
    added: diff.filter((d) => d.type === 'added').length,
    removed: diff.filter((d) => d.type === 'removed').length,
    unchanged: diff.filter((d) => d.type === 'unchanged').length,
    total: diff.length,
  };

  const showStats = true;

  return (
    <div
      className={`bg-gray-850 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CodeBracketIcon className="w-5 h-5 text-teal-300" />
            <h3 className="text-lg font-semibold text-gray-200">
              Before & After
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Side by Side
              </button>
              <button
                onClick={() => setViewMode('unified')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  viewMode === 'unified'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Unified
              </button>
              <button
                onClick={() => setViewMode('inline')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  viewMode === 'inline'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Inline
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-gray-400">{stats.added} added</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-gray-400">{stats.removed} removed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-gray-400">
                  {stats.unchanged} unchanged
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-800 hover:bg-gray-750 text-gray-300 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-3.5 h-3.5" />
                  Copy Optimized
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="overflow-auto">
        {viewMode === 'side-by-side' && (
          <div className="grid grid-cols-2 divide-x divide-gray-700/50">
            {/* Original */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-red-300 uppercase tracking-wide">
                  Original
                </span>
                <span className="text-xs text-gray-500">
                  {original.split('\n').length} lines
                </span>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 shadow-inner">
                <pre className="text-sm text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
                  {original || '<empty>'}
                </pre>
              </div>
            </div>

            {/* Optimized */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                  Optimized
                </span>
                <span className="text-xs text-gray-500">
                  {optimized.split('\n').length} lines
                </span>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 shadow-inner border border-emerald-500/20">
                <pre className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap">
                  {optimized || '<empty>'}
                </pre>
              </div>
            </div>
          </div>
        )}

        {(viewMode === 'unified' || viewMode === 'inline') && (
          <div className="p-4">
            <div className="bg-gray-900 rounded-xl shadow-inner overflow-hidden">
              <div className="max-h-96 overflow-auto">
                <table className="w-full text-sm font-mono">
                  <tbody>
                    {diff.map((line, index) => (
                      <tr
                        key={index}
                        className={`${getLineClass(line.type)} hover:bg-white/5 transition-colors`}
                      >
                        {showLineNumbers && (
                          <td className="px-3 py-1 text-right text-gray-600 text-xs select-none w-12 sticky left-0 bg-gray-900">
                            {line.lineNumber}
                          </td>
                        )}
                        <td
                          className="px-3 py-1 text-gray-300 whitespace-pre"
                          dangerouslySetInnerHTML={{
                            __html: getLineIcon(line.type) + ' ' + line.content,
                          }}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700/50">
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-emerald-500/20 border-l-2 border-emerald-500 rounded" />
            <span className="text-gray-400">Added</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500/20 border-l-2 border-red-500 rounded" />
            <span className="text-gray-400">Removed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-800 border-l-2 border-transparent rounded" />
            <span className="text-gray-400">Unchanged</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified inline comparison component
export interface InlineComparisonProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const InlineComparison: React.FC<InlineComparisonProps> = ({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}) => {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div
      className={`bg-gray-850 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden ${className}`}
    >
      <div className="flex border-b border-gray-700/50">
        <button
          onClick={() => setShowAfter(false)}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
            !showAfter
              ? 'bg-red-500/10 text-red-300 border-b-2 border-red-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {beforeLabel}
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
            showAfter
              ? 'bg-emerald-500/10 text-emerald-300 border-b-2 border-emerald-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {afterLabel}
        </button>
      </div>

      <div className="p-4">
        <div
          className={`bg-gray-900 rounded-xl p-4 shadow-inner transition-all ${showAfter ? 'border border-emerald-500/20' : ''}`}
        >
          <pre
            className={`text-sm font-mono leading-relaxed whitespace-pre-wrap ${showAfter ? 'text-gray-200' : 'text-gray-400'}`}
          >
            {showAfter ? after || '<empty>' : before || '<empty>'}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Mini diff indicator component
export interface DiffIndicatorProps {
  diffCount: number;
  className?: string;
}

export const DiffIndicator: React.FC<DiffIndicatorProps> = ({
  diffCount,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-xs text-gray-400">
        {diffCount} change{diffCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
};
