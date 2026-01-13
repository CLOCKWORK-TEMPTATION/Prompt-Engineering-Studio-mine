// Common types used across the application

import React from 'react';

export interface PlaygroundExample {
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags?: string[];
  userInput?: string;
  customInstructions?: string;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  response: string;
  timestamp: string;
  model?: string;
  userInput?: string;
  customInstructions?: string;
  generatedPrompt?: string;
}

export interface OptimizerHistoryItem extends HistoryItem {
  originalPrompt: string;
  optimizedPrompt: string;
  improvements: string[];
  diagnosis?: {
    missingInfo?: string[];
    clarifyingQuestions?: string[];
    privacyWarnings?: string[];
    qualityScore?: number;
    assumptions?: string[];
  };
  result?: OptimizerResponse | string;
  isStructured?: boolean;
}

export interface OptimizerResponse {
  optimizedPrompt: string;
  improvements: string[];
  diagnosis?: {
    missingInfo?: string[];
    clarifyingQuestions?: string[];
    privacyWarnings?: string[];
    qualityScore?: number;
    assumptions?: string[];
  };
  variants: {
    generic: string;
    chatgpt?: string;
    claude?: string;
    gemini?: string;
    kimi?: string;
    [platform: string]: string | undefined;
  };
  analysis?: {
    qualityScore?: number;
    intent?: string;
    language?: string;
    assumptions?: string[];
    improvements?: string[];
    clarityScore?: number;
    specificityScore?: number;
  };
}

export interface PromptTemplate {
  id?: string;
  name?: string;
  title: string;
  useCase: string;
  description: string;
  category?: string;
  variables: { name: string; description: string }[] | string[];
  template: string;
  examples?: string[];
}

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  initiallyOpen?: boolean;
}

export interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface ContentBlock {
  type?: string;
  content?: string | React.ReactNode;
  id?: string;
  title?: string;
  description?: string | React.ReactNode;
  details?: string | React.ReactNode;
  examplePrompt?: string;
  subItems?: ContentBlock[];
}

export interface TemplateCategory {
  id: string;
  name: string;
  templates: PromptTemplate[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export type Section =
  | 'introduction'
  | 'playground'
  | 'prompt-library'
  | 'system-tester'
  | 'optimizer'
  | 'types'
  | 'use-cases'
  | 'strategies';

export interface OptimizerPreferences {
  model: string;
  language: string;
  privacy: boolean;
  context: string;
  industry: string;
  audience: string;
  tone: string;
  format: string;
}

export function parseOptimizerResponse(
  response: unknown,
):
  | { success: true; data: OptimizerResponse }
  | { success: false; error: string } {
  try {
    const parsed = typeof response === 'string' ? JSON.parse(response) : response;
    const data = parsed as OptimizerResponse;

    // --- Normalize analysis quality_score -> qualityScore ---
    if ((data as any).analysis) {
      const analysis = (data as any).analysis;
      if (analysis.quality_score !== undefined && analysis.qualityScore === undefined) {
        analysis.qualityScore = analysis.quality_score;
      }
    }

    // --- Normalize diagnosis fields ---
    if ((data as any).diagnosis) {
      const diag = (data as any).diagnosis;

      // warnings -> privacyWarnings (if applicable)
      if (diag.warnings && !diag.privacyWarnings) {
        diag.privacyWarnings = Array.isArray(diag.warnings) ? diag.warnings : [diag.warnings];
      }

      // privacyWarning (singular) -> privacyWarnings (array)
      if (diag.privacyWarning && !diag.privacyWarnings) {
        diag.privacyWarnings = Array.isArray(diag.privacyWarning)
          ? diag.privacyWarning
          : [diag.privacyWarning];
      }

      // If diagnosis lacks qualityScore, pull it from analysis (if exists)
      if (diag.qualityScore === undefined && (data as any).analysis) {
        const analysis = (data as any).analysis;
        diag.qualityScore = analysis.qualityScore ?? analysis.quality_score ?? undefined;
      }
    }

    return { success: true, data: data as OptimizerResponse };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse response',
    };
  }
}
