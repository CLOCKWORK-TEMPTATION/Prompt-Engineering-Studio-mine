import React from 'react';
import { z } from 'zod';

// ==================== Existing Types ====================

// ============================================================================
// Existing Component Props Types
// ============================================================================

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

export interface CardProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface ContentBlock {
  id: string;
  title:string;
  description?: string | React.ReactNode;
  details?: string | React.ReactNode;
  examplePrompt?: string | React.ReactNode;
  subItems?: ContentBlock[];
}

export interface PlaygroundExample {
  title: string;
  userInput: string;
  customInstructions: string;
}

export interface HistoryItem {
  id: string;
  userInput: string;
  customInstructions: string;
  generatedPrompt: string;
  timestamp: string;
}

export interface PromptTemplate {
  title: string;
  useCase: string;
  description: string;
  variables: { name: string; description: string }[];
  template: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  templates: PromptTemplate[];
}

// ============================================================================
// v2.0 User Prompt Optimizer Types
// ============================================================================

/**
 * Diagnosis information extracted from the user's prompt
 * Combines both type definition approaches for maximum compatibility
 */
export interface PromptDiagnosis {
  /** Information that is missing from the user's prompt */
  missingInfo: string[];
  /** Questions to clarify the user's intent (2-5 questions recommended) */
  clarifyingQuestions: string[];
  /** Warning if sensitive/private information is detected */
  privacyWarning?: string;
}

/**
 * Optimized prompt variants for different AI platforms
 * Each variant is tailored for specific model characteristics
 */
export interface PromptVariants {
  /** Generic optimized prompt suitable for most AI models */
  generic: string;
  /** Optimized specifically for ChatGPT/GPT models */
  chatgpt: string;
  /** Optimized specifically for Claude/Anthropic models */
  claude: string;
  /** Optimized specifically for Gemini/Google models */
  gemini: string;
  /** Optimized specifically for Kimi/Moonshot models */
  kimi: string;
}

/**
 * Represents a single variant with additional metadata
 * Used for UI components that need model-specific tips
 */
export interface Variant {
  /** The type/brand of AI model this variant is optimized for */
  type: 'Generic' | 'ChatGPT' | 'Claude' | 'Gemini' | 'Kimi';
  /** The optimized prompt content tailored for this specific model */
  content: string;
  /** Model-specific tips and best practices for using this prompt */
  modelSpecificTips: string[];
}

/**
 * Analysis of the prompt quality and characteristics
 * Supports both naming conventions (camelCase and snake_case) for compatibility
 */
export interface PromptAnalysis {
  /** Overall quality score (0-100) */
  qualityScore: number;
  /** Alias for quality_score (snake_case) */
  quality_score?: number;
  /** Detected intent of the prompt */
  intent: string;
  /** Detected language of the prompt */
  language: string;
  /** Assumptions made during optimization */
  assumptions: string[];
  /** List of specific improvements made during optimization */
  improvements?: string[];
  /** Clarity score from 0 to 100 */
  clarityScore?: number;
  /** Specificity score from 0 to 100 */
  specificityScore?: number;
  /** Information that appears to be missing (alias for missingInfo) */
  missing_info?: string[];
  /** Questions to clarify intent (alias for clarifyingQuestions) */
  clarifying_questions?: string[];
  /** Privacy/security warnings detected */
  privacy_warnings?: string[];
}

/**
 * Complete structured response from the prompt optimizer
 * Contains all optimized variants, analysis, and metadata
 * Supports both naming conventions for maximum compatibility
 */
export interface OptimizerResponse {
  /** Diagnosis of the original prompt */
  diagnosis?: PromptDiagnosis;
  /** Analysis of prompt quality and characteristics */
  analysis: PromptAnalysis;
  /** Optimized variants for different platforms */
  variants: PromptVariants | { generic: string; chatgpt?: string; claude?: string; gemini?: string; kimi?: string; };
  /** Detected or specified language (e.g., 'en', 'ar', 'both') */
  language?: 'en' | 'ar' | 'both';
  /** The original user input prompt */
  originalPrompt?: string;
  /** Timestamp of when the optimization was performed */
  timestamp?: string;
  /** Any warnings or additional notes */
  warnings?: string[];
}

/**
 * User preferences for prompt optimization
 * Used to guide the optimization process
 */
export interface OptimizerPreferences {
  /** Target language for the optimized prompt */
  language?: string;
  /** Intended audience for the prompt */
  audience?: string;
  /** Desired tone of the prompt */
  tone?: string;
  /** Expected output format */
  outputFormat?: string;
  /** Desired length of the response */
  length?: string;
  /** Target AI model or platform */
  targetModel?: 'Generic' | 'ChatGPT' | 'Claude' | 'Gemini' | 'Kimi' | 'all';
  /** Maximum desired length of the optimized prompt */
  maxLength?: number;
  /** Whether to include privacy warnings */
  includePrivacyCheck?: boolean;
  /** Custom instructions to include in optimization */
  customInstructions?: string;
}

/**
 * Optimizer service error types
 */
export type OptimizerError =
  | { type: 'PARSE_ERROR'; message: string; rawResponse?: string }
  | { type: 'API_ERROR'; message: string; statusCode?: number }
  | { type: 'VALIDATION_ERROR'; message: string; field?: string }
  | { type: 'NETWORK_ERROR'; message: string }
  | { type: 'UNKNOWN_ERROR'; message: string };

/**
 * History item structure - supports both legacy string format and new structured format
 */
export interface OptimizerHistoryItem {
  id: string;
  userInput: string;
  customInstructions: string;
  /** Legacy: string for backward compatibility, or new structured response */
  result?: string | OptimizerResponse;
  /** Legacy alias for result */
  generatedPrompt?: string;
  /** Indicates if this is the new structured format */
  isStructured?: boolean;
  timestamp: string;
}

// ============================================================================
// Zod Schemas for Runtime Validation
// ============================================================================

/**
 * Zod schema for validating PromptDiagnosis
 */
export const PromptDiagnosisSchema = z.object({
  missingInfo: z.array(z.string()).default([]),
  clarifyingQuestions: z.array(z.string()).default([]),
  privacyWarning: z.string().optional(),
});

/**
 * Zod schema for validating PromptVariants (strict - all required)
 */
export const PromptVariantsSchema = z.object({
  generic: z.string().min(1, 'Generic variant is required'),
  chatgpt: z.string().min(1, 'ChatGPT variant is required'),
  claude: z.string().min(1, 'Claude variant is required'),
  gemini: z.string().min(1, 'Gemini variant is required'),
  kimi: z.string().min(1, 'Kimi variant is required'),
});

/**
 * Zod schema for validating PromptVariants (loose - optional variants)
 */
export const PromptVariantsSchemaLoose = z.object({
  generic: z.string().min(1, 'Generic variant is required'),
  chatgpt: z.string().optional(),
  claude: z.string().optional(),
  gemini: z.string().optional(),
  kimi: z.string().optional(),
});

/**
 * Zod schema for validating Variant (with tips)
 */
export const VariantSchema = z.object({
  type: z.enum(['Generic', 'ChatGPT', 'Claude', 'Gemini', 'Kimi']),
  content: z.string().min(1),
  modelSpecificTips: z.array(z.string()).default([]),
});

/**
 * Zod schema for validating PromptAnalysis
 * Supports both naming conventions
 */
export const PromptAnalysisSchema = z.object({
  qualityScore: z.number().min(0).max(100).optional(),
  quality_score: z.number().min(0).max(100).optional(),
  intent: z.string(),
  language: z.string(),
  assumptions: z.array(z.string()).default([]),
  improvements: z.array(z.string()).optional(),
  clarityScore: z.number().min(0).max(100).optional(),
  specificityScore: z.number().min(0).max(100).optional(),
  missing_info: z.array(z.string()).optional(),
  clarifying_questions: z.array(z.string()).optional(),
  privacy_warnings: z.array(z.string()).optional(),
}).transform((data) => {
  // Normalize to camelCase
  return {
    ...data,
    qualityScore: data.qualityScore ?? data.quality_score ?? 70,
    missingInfo: data.missing_info ?? [],
    clarifyingQuestions: data.clarifying_questions ?? [],
    privacyWarnings: data.privacy_warnings ?? [],
  };
});

/**
 * Zod schema for validating OptimizerPreferences
 */
export const OptimizerPreferencesSchema = z.object({
  language: z.string().optional(),
  audience: z.string().optional(),
  tone: z.string().optional(),
  outputFormat: z.string().optional(),
  length: z.string().optional(),
  targetModel: z.enum(['Generic', 'ChatGPT', 'Claude', 'Gemini', 'Kimi', 'all']).optional(),
  maxLength: z.number().optional(),
  includePrivacyCheck: z.boolean().optional(),
  customInstructions: z.string().optional(),
});

/**
 * Zod schema for validating the complete OptimizerResponse
 * Supports both strict and loose variant formats
 */
export const OptimizerResponseSchema = z.object({
  diagnosis: PromptDiagnosisSchema.optional(),
  analysis: PromptAnalysisSchema,
  variants: z.union([PromptVariantsSchema, PromptVariantsSchemaLoose]),
  language: z.enum(['en', 'ar', 'both']).optional(),
  originalPrompt: z.string().optional(),
  timestamp: z.string().optional(),
  warnings: z.array(z.string()).optional(),
});

/**
 * Type guard to check if a value is a valid OptimizerResponse
 */
export function isValidOptimizerResponse(data: unknown): data is OptimizerResponse {
  try {
    OptimizerResponseSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely parse an OptimizerResponse with detailed error handling
 */
export function parseOptimizerResponse(
  data: unknown
): { success: true; data: OptimizerResponse } | { success: false; error: string } {
  try {
    const parsed = OptimizerResponseSchema.parse(data);
    return { success: true, data: parsed as OptimizerResponse };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (e) => `${e.path.join('.')}: ${e.message}`
      ).join(', ');
      return { success: false, error: `Validation failed: ${errorMessages}` };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}