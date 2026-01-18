import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LightBulbIcon,
  BeakerIcon,
} from '@/components/ui/Icons';

export interface MissingInfo {
  type: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ClarifyingQuestion {
  question: string;
  category: string;
  answer?: string;
}

export interface DiagnosisData {
  missingInfo?: MissingInfo[];
  clarifyingQuestions?: ClarifyingQuestion[];
  privacyWarnings?: string[];
  qualityScore?: number;
  assumptions?: string[];
}

export interface DiagnosisCardProps {
  diagnosis: DiagnosisData;
  onQuestionAnswer?: (questionIndex: number, answer: string) => void;
  className?: string;
}

const PRIORITY_CONFIG = {
  high: {
    label: 'High',
    color: 'text-red-300',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    dotColor: 'bg-red-400',
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    dotColor: 'bg-yellow-400',
  },
  low: {
    label: 'Low',
    color: 'text-gray-300',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    dotColor: 'bg-gray-400',
  },
};

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({
  diagnosis,
  onQuestionAnswer,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['missingInfo', 'questions']),
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return {
        color: 'text-emerald-300',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/40',
      };
    if (score >= 60)
      return {
        color: 'text-yellow-300',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/40',
      };
    return {
      color: 'text-red-300',
      bg: 'bg-red-500/20',
      border: 'border-red-500/40',
    };
  };

  const scoreConfig = diagnosis.qualityScore
    ? getScoreColor(diagnosis.qualityScore)
    : null;

  return (
    <div
      className={`bg-gray-850 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header with Quality Score */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30">
              <BeakerIcon className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-300">
                Prompt Analysis
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                AI-powered diagnosis and recommendations
              </p>
            </div>
          </div>

          {scoreConfig && diagnosis.qualityScore !== undefined && (
            <div
              className={`px-4 py-2 rounded-xl border-2 ${scoreConfig.bg} ${scoreConfig.border}`}
            >
              <div className="text-center">
                <div className={`text-2xl font-bold ${scoreConfig.color}`}>
                  {diagnosis.qualityScore}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Score
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-700/50">
        {/* Missing Info Section */}
        {diagnosis.missingInfo && diagnosis.missingInfo.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection('missingInfo')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                  <span className="text-orange-300 text-sm font-bold">!</span>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Missing Information
                  </h4>
                  <p className="text-xs text-gray-400">
                    {diagnosis.missingInfo.length} item(s) identified
                  </p>
                </div>
              </div>
              {expandedSections.has('missingInfo') ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.has('missingInfo') && (
              <div className="px-6 pb-4 space-y-3">
                {diagnosis.missingInfo.map((info, index) => {
                  const config = PRIORITY_CONFIG[info.priority];
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${config.bgColor} ${config.borderColor}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${config.dotColor} mt-1.5 flex-shrink-0`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {info.type}
                            </span>
                            <span
                              className={`text-xs font-medium ${config.color}`}
                            >
                              {config.label} Priority
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Clarifying Questions Section */}
        {diagnosis.clarifyingQuestions &&
          diagnosis.clarifyingQuestions.length > 0 && (
            <div>
              <button
                onClick={() => toggleSection('questions')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <span className="text-blue-300 text-sm font-bold">?</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-gray-200">
                      Clarifying Questions
                    </h4>
                    <p className="text-xs text-gray-400">
                      {diagnosis.clarifyingQuestions.length} question(s) to
                      improve your prompt
                    </p>
                  </div>
                </div>
                {expandedSections.has('questions') ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.has('questions') && (
                <div className="px-6 pb-4 space-y-3">
                  {diagnosis.clarifyingQuestions.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal-300 text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-200 mb-3">
                            {item.question}
                          </p>
                          {onQuestionAnswer && (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Type your answer..."
                                className="flex-1 px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                value={item.answer || ''}
                                onChange={(e) =>
                                  onQuestionAnswer(index, e.target.value)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        {/* Privacy Warnings Section */}
        {diagnosis.privacyWarnings && diagnosis.privacyWarnings.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection('privacy')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <span className="text-red-300 text-sm">!</span>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-red-300">
                    Privacy Warnings
                  </h4>
                  <p className="text-xs text-gray-400">
                    {diagnosis.privacyWarnings.length} warning(s) detected
                  </p>
                </div>
              </div>
              {expandedSections.has('privacy') ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.has('privacy') && (
              <div className="px-6 pb-4">
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-2">
                  {diagnosis.privacyWarnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-red-200">{warning}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <p className="text-xs text-gray-400 flex items-center gap-2">
                    <LightBulbIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>
                      Consider removing sensitive information before sharing
                      your prompt.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Assumptions Section */}
        {diagnosis.assumptions && diagnosis.assumptions.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection('assumptions')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-300 text-sm">a</span>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Assumptions Made
                  </h4>
                  <p className="text-xs text-gray-400">
                    {diagnosis.assumptions.length} assumption(s)
                  </p>
                </div>
              </div>
              {expandedSections.has('assumptions') ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.has('assumptions') && (
              <div className="px-6 pb-4">
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                  <ul className="space-y-2">
                    {diagnosis.assumptions.map((assumption, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-purple-100"
                      >
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Tip */}
      <div className="p-4 bg-teal-500/5 border-t border-teal-500/10">
        <p className="text-xs text-teal-300 flex items-center gap-2">
          <LightBulbIcon className="w-4 h-4 flex-shrink-0" />
          <span>Address these items to create a more effective prompt.</span>
        </p>
      </div>
    </div>
  );
};

// Compact version for smaller displays
export interface CompactDiagnosisCardProps extends Omit<
  DiagnosisCardProps,
  'className'
> {
  className?: string;
}

export const CompactDiagnosisCard: React.FC<CompactDiagnosisCardProps> = ({
  diagnosis,
  className = '',
}) => {
  const scoreConfig = diagnosis.qualityScore
    ? getScoreColor(diagnosis.qualityScore)
    : null;

  function getScoreColor(score: number) {
    if (score >= 80)
      return { color: 'text-emerald-300', bg: 'bg-emerald-500/20' };
    if (score >= 60)
      return { color: 'text-yellow-300', bg: 'bg-yellow-500/20' };
    return { color: 'text-red-300', bg: 'bg-red-500/20' };
  }

  const totalIssues =
    (diagnosis.missingInfo?.length || 0) +
    (diagnosis.privacyWarnings?.length || 0);

  return (
    <div
      className={`bg-gray-850 backdrop-blur-xl border border-gray-700 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BeakerIcon className="w-5 h-5 text-teal-300" />
          <div>
            {scoreConfig && diagnosis.qualityScore !== undefined && (
              <div className={`text-lg font-bold ${scoreConfig.color}`}>
                {diagnosis.qualityScore}
              </div>
            )}
            <div className="text-xs text-gray-400">
              {totalIssues} item(s) to review
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {diagnosis.missingInfo && diagnosis.missingInfo.length > 0 && (
            <div className="px-2 py-1 bg-orange-500/10 rounded text-xs text-orange-300">
              {diagnosis.missingInfo.length} missing
            </div>
          )}
          {diagnosis.privacyWarnings &&
            diagnosis.privacyWarnings.length > 0 && (
              <div className="px-2 py-1 bg-red-500/10 rounded text-xs text-red-300">
                {diagnosis.privacyWarnings.length} warnings
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
