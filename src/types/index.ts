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
    warnings?: string[];
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
    warnings?: string[];
    privacyWarning?: string;
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
    quality_score?: number;
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
    if (typeof response === 'string') {
      const parsed = JSON.parse(response);
      return { success: true, data: parsed as OptimizerResponse };
    }
    return { success: true, data: response as OptimizerResponse };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to parse response',
    };
  }
}
