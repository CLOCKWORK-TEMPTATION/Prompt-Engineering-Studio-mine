/**
 * Zod Schemas for User Prompt Optimizer v2.0
 * 
 * This file contains runtime validation schemas for all optimizer-related types.
 * These schemas ensure that API responses conform to the expected structure.
 */

import { z } from 'zod';

// ============================================================================
// Base Enums and Constants
// ============================================================================

/**
 * Supported AI model types for prompt variants
 */
export const MODEL_TYPES = ['Generic', 'ChatGPT', 'Claude', 'Gemini', 'Kimi'] as const;
export type ModelType = typeof MODEL_TYPES[number];

/**
 * Supported languages
 */
export const LANGUAGES = ['en', 'ar', 'both'] as const;
export type Language = typeof LANGUAGES[number];

/**
 * Quality assessment levels
 */
export const QUALITY_LEVELS = ['Poor', 'Fair', 'Good', 'Excellent'] as const;
export type QualityLevel = typeof QUALITY_LEVELS[number];

/**
 * Supported tones for prompt optimization
 */
export const TONES = ['formal', 'casual', 'professional', 'friendly', 'neutral'] as const;
export type Tone = typeof TONES[number];

// ============================================================================
// Variant Schema
// ============================================================================

/**
 * Schema for validating a single prompt variant
 */
export const variantSchema = z.object({
  type: z.enum(MODEL_TYPES, {
    message: 'Invalid model type. Must be one of: Generic, ChatGPT, Claude, Gemini, Kimi'
  }),
  content: z.string().min(1, 'Variant content cannot be empty'),
  modelSpecificTips: z.array(z.string().min(1)).min(1, 'At least one model-specific tip is required')
});

export type VariantSchema = z.infer<typeof variantSchema>;

// ============================================================================
// Diagnosis Schema
// ============================================================================

/**
 * Schema for validating privacy warning information
 */
const privacyWarningSchema = z.object({
  detected: z.boolean({
    message: 'Privacy warning detected field must be a boolean'
  }),
  concern: z.string().optional(),
  suggestion: z.string().optional()
}).refine(
  (data) => !data.detected || (data.concern !== undefined && data.suggestion !== undefined),
  {
    message: 'When privacy warning is detected, both concern and suggestion must be provided',
    path: ['detected']
  }
);

/**
 * Schema for validating diagnosis information
 */
export const diagnosisSchema = z.object({
  missingInfo: z.array(z.string().min(1)),
  clarifyingQuestions: z.array(z.string().min(1))
    .min(2, 'At least 2 clarifying questions are required')
    .max(5, 'Maximum 5 clarifying questions allowed'),
  privacyWarning: privacyWarningSchema.optional()
});

export type DiagnosisSchema = z.infer<typeof diagnosisSchema>;

// ============================================================================
// Prompt Analysis Schema
// ============================================================================

/**
 * Schema for validating prompt analysis metrics
 */
export const promptAnalysisSchema = z.object({
  improvements: z.array(z.string().min(1))
    .min(1, 'At least one improvement must be listed'),
  clarityScore: z.number()
    .min(0, 'Clarity score must be between 0 and 100')
    .max(100, 'Clarity score must be between 0 and 100'),
  specificityScore: z.number()
    .min(0, 'Specificity score must be between 0 and 100')
    .max(100, 'Specificity score must be between 0 and 100'),
  qualityAssessment: z.enum(QUALITY_LEVELS, {
    message: 'Invalid quality assessment. Must be one of: Poor, Fair, Good, Excellent'
  }),
  feedback: z.string().optional()
}).refine(
  (data) => {
    // Quality assessment should align with scores
    const avgScore = (data.clarityScore + data.specificityScore) / 2;
    if (avgScore >= 80 && data.qualityAssessment === 'Poor') return false;
    if (avgScore < 30 && data.qualityAssessment === 'Excellent') return false;
    return true;
  },
  {
    message: 'Quality assessment should be consistent with clarity and specificity scores'
  }
);

export type PromptAnalysisSchema = z.infer<typeof promptAnalysisSchema>;

// ============================================================================
// Optimizer Response Schema
// ============================================================================

/**
 * Main schema for validating the complete optimizer response
 */
export const optimizerResponseSchema = z.object({
  language: z.enum(LANGUAGES, {
    message: 'Invalid language. Must be one of: en, ar, both'
  }),
  intent: z.string().min(1, 'Intent cannot be empty'),
  qualityScore: z.number()
    .min(0, 'Quality score must be between 0 and 100')
    .max(100, 'Quality score must be between 0 and 100'),
  diagnosis: diagnosisSchema,
  variants: z.array(variantSchema)
    .min(1, 'At least one variant must be provided')
    .refine(
      (variants) => {
        const types = new Set(variants.map(v => v.type));
        return types.size === variants.length;
      },
      { message: 'Each variant must have a unique type' }
    ),
  analysis: promptAnalysisSchema,
  originalPrompt: z.string().min(1, 'Original prompt cannot be empty'),
  timestamp: z.string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      { message: 'Timestamp must be a valid ISO 8601 date string' }
    ),
  warnings: z.array(z.string().min(1)).optional()
}).refine(
  (data) => {
    // Validate that quality score aligns with analysis
    const avgScore = (data.analysis.clarityScore + data.analysis.specificityScore) / 2;
    const scoreDiff = Math.abs(data.qualityScore - avgScore);
    return scoreDiff <= 20; // Allow up to 20 points difference
  },
  {
    message: 'Quality score should be consistent with analysis scores'
  }
);

export type OptimizerResponseSchema = z.infer<typeof optimizerResponseSchema>;

// ============================================================================
// Optimizer Preferences Schema
// ============================================================================

/**
 * Schema for validating user preferences for optimization
 */
export const optimizerPreferencesSchema = z.object({
  language: z.enum(LANGUAGES).optional(),
  targetModel: z.enum([...MODEL_TYPES, 'all'] as const).optional(),
  tone: z.enum(TONES).optional(),
  maxLength: z.number()
    .positive('Max length must be positive')
    .optional(),
  includePrivacyCheck: z.boolean().optional(),
  customInstructions: z.string()
    .max(2000, 'Custom instructions must not exceed 2000 characters')
    .optional()
});

export type OptimizerPreferencesSchema = z.infer<typeof optimizerPreferencesSchema>;

// ============================================================================
// Optimizer Error Schema
// ============================================================================

/**
 * Schema for validating optimizer error objects
 */
export const optimizerErrorSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('PARSE_ERROR'),
    message: z.string(),
    rawResponse: z.string().optional()
  }),
  z.object({
    type: z.literal('API_ERROR'),
    message: z.string(),
    statusCode: z.number().optional()
  }),
  z.object({
    type: z.literal('VALIDATION_ERROR'),
    message: z.string(),
    field: z.string().optional()
  }),
  z.object({
    type: z.literal('NETWORK_ERROR'),
    message: z.string()
  }),
  z.object({
    type: z.literal('UNKNOWN_ERROR'),
    message: z.string()
  })
]);

export type OptimizerErrorSchema = z.infer<typeof optimizerErrorSchema>;

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates an unknown object against the optimizer response schema
 * 
 * @param data - The data to validate
 * @returns A tuple of [success, data or error]
 * 
 * @example
 * ```ts
 * const [isValid, result] = validateOptimizerResponse(apiResponse);
 * if (isValid) {
 *   // result is OptimizerResponse
 *   console.log(result.variants);
 * } else {
 *   // result is ZodError
 *   console.error(result.errors);
 * }
 * ```
 */
export const validateOptimizerResponse = <T = unknown>(
  data: T
): [true, OptimizerResponseSchema] | [false, z.ZodError<unknown>] => {
  const result = optimizerResponseSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the diagnosis schema
 * 
 * @param data - The data to validate
 * @returns A tuple of [success, data or error]
 */
export const validateDiagnosis = <T = unknown>(
  data: T
): [true, DiagnosisSchema] | [false, z.ZodError<unknown>] => {
  const result = diagnosisSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the variant schema
 * 
 * @param data - The data to validate
 * @returns A tuple of [success, data or error]
 */
export const validateVariant = <T = unknown>(
  data: T
): [true, VariantSchema] | [false, z.ZodError<unknown>] => {
  const result = variantSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the prompt analysis schema
 * 
 * @param data - The data to validate
 * @returns A tuple of [success, data or error]
 */
export const validatePromptAnalysis = <T = unknown>(
  data: T
): [true, PromptAnalysisSchema] | [false, z.ZodError<unknown>] => {
  const result = promptAnalysisSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Validates an unknown object against the preferences schema
 * 
 * @param data - The data to validate
 * @returns A tuple of [success, data or error]
 */
export const validateOptimizerPreferences = <T = unknown>(
  data: T
): [true, OptimizerPreferencesSchema] | [false, z.ZodError<unknown>] => {
  const result = optimizerPreferencesSchema.safeParse(data);
  if (result.success) {
    return [true, result.data];
  }
  return [false, result.error];
};

/**
 * Safely parses JSON and validates against the optimizer response schema
 * 
 * @param jsonString - The JSON string to parse and validate
 * @returns A tuple of [success, data or error]
 * 
 * @example
 * ```ts
 * const response = await fetch('/api/optimize');
 * const json = await response.json();
 * const [isValid, result] = parseAndValidateOptimizerResponse(JSON.stringify(json));
 * ```
 */
export const parseAndValidateOptimizerResponse = (
  jsonString: string
): [true, OptimizerResponseSchema] | [false, z.ZodError<unknown> | SyntaxError] => {
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
 * 
 * @param error - The Zod error to format
 * @returns A formatted error message string
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
export const isOptimizerResponse = (data: unknown): data is OptimizerResponseSchema => {
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
export const isPromptAnalysis = (data: unknown): data is PromptAnalysisSchema => {
  return promptAnalysisSchema.safeParse(data).success;
};