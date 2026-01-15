/**
 * Unified Zod Schemas for User Prompt Optimizer
 *
 * This file combines the best features from both schema systems:
 * - Strict validation with refinements (from optimizerSchemas)
 * - Dual naming convention support (camelCase + snake_case) from types.ts
 * - Flexible variant structure (strict/loose modes)
 * - Comprehensive error messages
 * - Type guards and utility functions
 */

import { z } from 'zod';

// ============================================================================
// Base Enums and Constants
// ============================================================================

export const MODEL_TYPES = [
  'Generic',
  'ChatGPT',
  'Claude',
  'Gemini',
  'Kimi',
] as const;
export type ModelType = (typeof MODEL_TYPES)[number];

export const LANGUAGES = ['en', 'ar', 'both'] as const;
export type OptimizerLanguage = (typeof LANGUAGES)[number];

export const QUALITY_LEVELS = ['Poor', 'Fair', 'Good', 'Excellent'] as const;
export type QualityLevel = (typeof QUALITY_LEVELS)[number];

export const TONES = [
  'formal',
  'casual',
  'professional',
  'friendly',
  'neutral',
] as const;
export type Tone = (typeof TONES)[number];

// ============================================================================
// Diagnosis Schema
// ============================================================================

/**
 * Diagnosis schema - unified with dual naming support
 */
export const diagnosisSchema = z
  .object({
    // Primary camelCase fields
    missingInfo: z.array(z.string().min(1)).default([]),
    clarifyingQuestions: z
      .array(z.string().min(1))
      .min(2, 'At least 2 clarifying questions are recommended')
      .max(5, 'Maximum 5 clarifying questions allowed')
      .default([]),
    privacyWarnings: z.array(z.string()).default([]),
    qualityScore: z
      .number()
      .min(0, 'Quality score must be between 0 and 100')
      .max(100, 'Quality score must be between 0 and 100')
      .optional(),
    assumptions: z.array(z.string()).default([]),
    // Snake_case and legacy aliases for compatibility
    missing_info: z.array(z.string().min(1)).optional(),
    clarifying_questions: z.array(z.string().min(1)).optional(),
    privacy_warnings: z.array(z.string()).optional(),
    privacyWarning: z.string().optional(), // legacy singular form
    warnings: z.array(z.string()).optional(), // legacy form
  })
  .transform((data) => {
    // Normalize privacyWarnings from various legacy sources
    let privacyWarnings = data.privacyWarnings;
    if (privacyWarnings.length === 0) {
      // Try legacy sources in order of preference
      if (data.privacy_warnings) {
        privacyWarnings = data.privacy_warnings;
      } else if (data.warnings) {
        privacyWarnings = data.warnings;
      } else if (data.privacyWarning) {
        privacyWarnings = [data.privacyWarning];
      }
    }

    return {
      missingInfo:
        data.missingInfo.length > 0
          ? data.missingInfo
          : (data.missing_info ?? []),
      clarifyingQuestions:
        data.clarifyingQuestions.length > 0
          ? data.clarifyingQuestions
          : (data.clarifying_questions ?? []),
      privacyWarnings,
      qualityScore: data.qualityScore,
      assumptions: data.assumptions,
    };
  });

export type DiagnosisSchema = z.infer<typeof diagnosisSchema>;

// ============================================================================
// Variant Schemas (Dual Format Support)
// ============================================================================

/**
 * Individual variant schema with metadata
 */
export const variantSchema = z.object({
  type: z.enum(MODEL_TYPES),
  content: z.string().min(1, 'Variant content cannot be empty'),
  modelSpecificTips: z
    .array(z.string().min(1))
    .min(1, 'At least one model-specific tip is required')
    .default([]),
});

export type VariantSchema = z.infer<typeof variantSchema>;

/**
 * Strict prompt variants schema (all variants required)
 */
export const promptVariantsStrictSchema = z.object({
  generic: z.string().min(1, 'Generic variant is required'),
  chatgpt: z.string().min(1, 'ChatGPT variant is required'),
  claude: z.string().min(1, 'Claude variant is required'),
  gemini: z.string().min(1, 'Gemini variant is required'),
  kimi: z.string().min(1, 'Kimi variant is required'),
});

/**
 * Loose prompt variants schema (only generic required, others optional)
 */
export const promptVariantsLooseSchema = z.object({
  generic: z.string().min(1, 'Generic variant is required'),
  chatgpt: z.string().optional(),
  claude: z.string().optional(),
  gemini: z.string().optional(),
  kimi: z.string().optional(),
});

/**
 * Unified variants schema supporting both strict and loose formats
 */
export const promptVariantsSchema = z.union([
  promptVariantsStrictSchema,
  promptVariantsLooseSchema,
]);

export type PromptVariantsSchema = z.infer<typeof promptVariantsSchema>;

// ============================================================================
// Analysis Schema
// ============================================================================

/**
 * Prompt analysis schema with dual naming convention support
 * and cross-field validation
 */
export const promptAnalysisSchema = z
  .object({
    // Primary camelCase fields
    qualityScore: z
      .number()
      .min(0, 'Quality score must be between 0 and 100')
      .max(100, 'Quality score must be between 0 and 100')
      .optional(),
    quality_score: z
      .number()
      .min(0, 'Quality score must be between 0 and 100')
      .max(100, 'Quality score must be between 0 and 100')
      .optional(),
    intent: z.string().min(1, 'Intent cannot be empty'),
    language: z.string().min(1, 'Language cannot be empty'),
    assumptions: z.array(z.string()).default([]),
    improvements: z
      .array(z.string())
      .min(1, 'At least one improvement must be listed')
      .optional(),
    clarityScore: z
      .number()
      .min(0, 'Clarity score must be between 0 and 100')
      .max(100, 'Clarity score must be between 0 and 100')
      .optional(),
    specificityScore: z
      .number()
      .min(0, 'Specificity score must be between 0 and 100')
      .max(100, 'Specificity score must be between 0 and 100')
      .optional(),
    // Snake_case aliases
    missing_info: z.array(z.string()).optional(),
    clarifying_questions: z.array(z.string()).optional(),
    privacy_warnings: z.array(z.string()).optional(),
  })
  .transform((data) => {
    // Normalize to camelCase with fallback from snake_case
    const qualityScore = data.qualityScore ?? data.quality_score ?? 70;
    return {
      qualityScore,
      intent: data.intent,
      language: data.language,
      assumptions: data.assumptions,
      improvements: data.improvements,
      clarityScore: data.clarityScore,
      specificityScore: data.specificityScore,
      // Aliases
      quality_score: qualityScore,
      missingInfo: data.missing_info ?? [],
      clarifyingQuestions: data.clarifying_questions ?? [],
      privacyWarnings: data.privacy_warnings ?? [],
    };
  })
  .refine(
    (data) => {
      // Quality score should align with clarity and specificity scores
      if (
        data.clarityScore !== undefined &&
        data.specificityScore !== undefined
      ) {
        const avgScore = (data.clarityScore + data.specificityScore) / 2;
        if (avgScore >= 80 && data.qualityScore < 60) return false;
        if (avgScore < 30 && data.qualityScore >= 80) return false;
      }
      return true;
    },
    {
      message:
        'Quality score should be consistent with clarity and specificity scores',
    },
  );

export type PromptAnalysisSchema = z.infer<typeof promptAnalysisSchema>;

// ============================================================================
// Main Optimizer Response Schema
// ============================================================================

/**
 * Complete optimizer response schema with comprehensive validation
 */
export const optimizerResponseSchema = z
  .object({
    diagnosis: diagnosisSchema.optional(),
    analysis: promptAnalysisSchema,
    variants: promptVariantsSchema,
    language: z.enum(LANGUAGES).optional(),
    originalPrompt: z
      .string()
      .min(1, 'Original prompt cannot be empty')
      .optional(),
    timestamp: z.string().optional(),
  })
  .refine(
    (data) => {
      // Validate that quality score aligns with analysis
      if (
        data.analysis.qualityScore !== undefined &&
        data.analysis.clarityScore !== undefined &&
        data.analysis.specificityScore !== undefined
      ) {
        const avgScore =
          (data.analysis.clarityScore + data.analysis.specificityScore) / 2;
        const scoreDiff = Math.abs(data.analysis.qualityScore - avgScore);
        return scoreDiff <= 20; // Allow up to 20 points difference
      }
      return true;
    },
    {
      message: 'Quality score should be consistent with analysis scores',
    },
  );

export type OptimizerResponseSchema = z.infer<typeof optimizerResponseSchema>;

// ============================================================================
// Preferences Schema
// ============================================================================

/**
 * User preferences schema with comprehensive validation
 */
export const optimizerPreferencesSchema = z.object({
  language: z.enum(LANGUAGES).optional(),
  targetModel: z.enum([...MODEL_TYPES, 'all'] as const).optional(),
  tone: z.enum(TONES).optional(),
  maxLength: z.number().positive('Max length must be positive').optional(),
  includePrivacyCheck: z.boolean().optional(),
  customInstructions: z
    .string()
    .max(2000, 'Custom instructions must not exceed 2000 characters')
    .optional(),
  // Additional preferences from types.ts
  audience: z.string().optional(),
  outputFormat: z.string().optional(),
  length: z.string().optional(),
});

export type OptimizerPreferencesSchema = z.infer<
  typeof optimizerPreferencesSchema
>;

// ============================================================================
// Error Schemas
// ============================================================================

/**
 * Discriminated union for error types
 */
export const optimizerErrorSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('PARSE_ERROR'),
    message: z.string(),
    rawResponse: z.string().optional(),
  }),
  z.object({
    type: z.literal('API_ERROR'),
    message: z.string(),
    statusCode: z.number().optional(),
  }),
  z.object({
    type: z.literal('VALIDATION_ERROR'),
    message: z.string(),
    field: z.string().optional(),
  }),
  z.object({
    type: z.literal('NETWORK_ERROR'),
    message: z.string(),
  }),
  z.object({
    type: z.literal('UNKNOWN_ERROR'),
    message: z.string(),
  }),
]);

export type OptimizerErrorSchema = z.infer<typeof optimizerErrorSchema>;

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates an unknown object against the optimizer response schema
 */
export const validateOptimizerResponse = <T = unknown>(
  data: T,
): [true, OptimizerResponseSchema] | [false, z.ZodError<unknown>] => {
  const result = optimizerResponseSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the diagnosis schema
 */
export const validateDiagnosis = <T = unknown>(
  data: T,
): [true, DiagnosisSchema] | [false, z.ZodError<unknown>] => {
  const result = diagnosisSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the variant schema
 */
export const validateVariant = <T = unknown>(
  data: T,
): [true, VariantSchema] | [false, z.ZodError<unknown>] => {
  const result = variantSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the prompt analysis schema
 */
export const validatePromptAnalysis = <T = unknown>(
  data: T,
): [true, PromptAnalysisSchema] | [false, z.ZodError<unknown>] => {
  const result = promptAnalysisSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the preferences schema
 */
export const validateOptimizerPreferences = <T = unknown>(
  data: T,
): [true, OptimizerPreferencesSchema] | [false, z.ZodError<unknown>] => {
  const result = optimizerPreferencesSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Safely parses JSON and validates against the optimizer response schema
 */
export const parseAndValidateOptimizerResponse = (
  jsonString: string,
):
  | [true, OptimizerResponseSchema]
  | [false, z.ZodError<unknown> | SyntaxError] => {
  try {
    const parsed = JSON.parse(jsonString);
    return validateOptimizerResponse(parsed);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return [false, error];
    }
    return [false, new z.ZodError([])];
  }
};

/**
 * Formats Zod validation errors into a human-readable string
 */
export const formatZodError = (error: z.ZodError<unknown>): string => {
  const issues = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
    return `${path}: ${issue.message}`;
  });

  return `Validation failed:\n${issues.join('\n')}`;
};

/**
 * Creates a partial optimizer response schema for partial updates
 */
export const partialOptimizerResponseSchema = optimizerResponseSchema.partial();

/**
 * Type guard to check if an object is a valid OptimizerResponse
 */
export const isOptimizerResponse = (
  data: unknown,
): data is OptimizerResponseSchema => {
  return optimizerResponseSchema.safeParse(data).success;
};

/**
 * Type guard to check if an object is a valid Diagnosis
 */
export const isDiagnosis = (data: unknown): data is DiagnosisSchema => {
  return diagnosisSchema.safeParse(data).success;
};

/**
 * Type guard to check if an object is a valid Variant
 */
export const isVariant = (data: unknown): data is VariantSchema => {
  return variantSchema.safeParse(data).success;
};

/**
 * Type guard to check if an object is a valid PromptAnalysis
 */
export const isPromptAnalysis = (
  data: unknown,
): data is PromptAnalysisSchema => {
  return promptAnalysisSchema.safeParse(data).success;
};

/**
 * Type guard to check if an object is a valid OptimizerPreferences
 */
export const isOptimizerPreferences = (
  data: unknown,
): data is OptimizerPreferencesSchema => {
  return optimizerPreferencesSchema.safeParse(data).success;
};

/**
 * Type guard to check if an object is a valid OptimizerError
 */
export const isOptimizerError = (
  data: unknown,
): data is OptimizerErrorSchema => {
  return optimizerErrorSchema.safeParse(data).success;
};
