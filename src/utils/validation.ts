/**
 * Validation Utilities for Prompt Engineering Studio v2.0
 *
 * This module provides comprehensive input validation, sanitization, and
 * safe parsing utilities to prevent security vulnerabilities and ensure
 * data integrity throughout the application.
 *
 * Security Features:
 * - Safe JSON parsing with error handling
 * - Input sanitization to prevent XSS attacks
 * - Schema validation helpers
 * - Type guards for runtime type checking
 * - Length and format validations
 */

/**
 * Result type for validation operations
 */
export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Configuration for input sanitization
 */
export interface SanitizationConfig {
  maxLength?: number;
  stripHTML?: boolean;
  preserveLineBreaks?: boolean;
  allowedTags?: string[];
}

/**
 * Schema definition for validation
 */
export interface Schema<T = unknown> {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: unknown) => boolean | ValidationResult;
  defaultValue?: T;
}

/**
 * Safe JSON parser with comprehensive error handling
 *
 * @param json - JSON string to parse
 * @param fallback - Default value to return if parsing fails
 * @returns Parsed object or fallback value
 *
 * @example
 * const data = safeJSONParse('{"key": "value"}', {});
 * const data2 = safeJSONParse('invalid json', null); // returns null
 */
export function safeJSONParse<T = unknown>(json: string, fallback: T): T {
  try {
    const trimmed = json.trim();
    if (!trimmed) {
      return fallback;
    }

    // Check for potential JSON injection or malicious patterns
    const dangerousPatterns = [
      /__proto__/,
      /constructor\[/,
      /\.\.\/\.\./,
      /eval\(/,
      /Function\(/,
      /<script/i
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(trimmed)) {
        console.warn('[Security] Potentially dangerous pattern detected in JSON');
        return fallback;
      }
    }

    const parsed = JSON.parse(trimmed) as T;

    // Validate parsed object structure
    if (parsed === null || parsed === undefined) {
      return fallback;
    }

    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn('[Validation] Invalid JSON format:', error.message);
    } else {
      console.error('[Validation] Unexpected error parsing JSON:', error);
    }
    return fallback;
  }
}

/**
 * Validate JSON structure before parsing
 *
 * @param json - JSON string to validate
 * @returns True if JSON is valid, false otherwise
 */
export function isValidJSON(json: string): boolean {
  try {
    const trimmed = json.trim();
    if (!trimmed) {
      return false;
    }

    // Quick check for JSON structure
    if (
!['{', '[', '"', 't', 'f', 'n'].includes(trimmed[0])
) {
      return false;
    }

    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize user input to prevent XSS attacks
 *
 * @param input - Raw user input
 * @param config - Sanitization configuration
 * @returns Sanitized string
 *
 * @example
 * const safe = sanitizeInput('<script>alert("xss")</script>', { stripHTML: true });
 * // returns: 'alert("xss")'
 */
export function sanitizeInput(
  input: string,
  config: SanitizationConfig = {}
): string {
  const {
    maxLength = 10000,
    stripHTML = true,
    preserveLineBreaks = true,
    allowedTags = []
  } = config;

  // Handle non-string input
  if (typeof input !== 'string') {
    console.warn('[Validation] Non-string input provided to sanitizeInput');
    return String(input);
  }

  let sanitized = input;

  // Truncate if too long
  if (sanitized.length > maxLength) {
    console.warn(`[Validation] Input truncated to ${maxLength} characters`);
    sanitized = sanitized.substring(0, maxLength);
  }

  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Strip HTML tags if requested
  if (stripHTML && allowedTags.length === 0) {
    // Complete HTML stripping
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  } else if (stripHTML && allowedTags.length > 0) {
    // Allow only specific tags (basic implementation)
    const tagPattern = new RegExp(
      `<(?!\\/?(${allowedTags.join('|')})\\b)[^>]*>`,
      'gi'
    );
    sanitized = sanitized.replace(tagPattern, '');
  }

  // Escape HTML entities to prevent XSS
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  sanitized = sanitized.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);

  // Handle line breaks
  if (!preserveLineBreaks) {
    sanitized = sanitized.replace(/[\r\n]+/g, ' ');
  }

  return sanitized.trim();
}

/**
 * Validate string length
 *
 * @param str - String to validate
 * @param minLength - Minimum allowed length
 * @param maxLength - Maximum allowed length
 * @returns Validation result
 */
export function validateLength(
  str: string,
  minLength = 0,
  maxLength = 10000
): ValidationResult<string> {
  if (typeof str !== 'string') {
    return {
      success: false,
      error: 'Input must be a string'
    };
  }

  const length = str.trim().length;

  if (length < minLength) {
    return {
      success: false,
      error: `Input must be at least ${minLength} characters long`
    };
  }

  if (length > maxLength) {
    return {
      success: false,
      error: `Input must not exceed ${maxLength} characters`
    };
  }

  return {
    success: true,
    data: str
  };
}

/**
 * Validate email format
 *
 * @param email - Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult<string> {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return {
      success: false,
      error: 'Invalid email format'
    };
  }

  return {
    success: true,
    data: email
  };
}

/**
 * Validate URL format
 *
 * @param url - URL to validate
 * @param allowedProtocols - List of allowed protocols (default: ['http', 'https'])
 * @returns Validation result
 */
export function validateURL(
  url: string,
  allowedProtocols: string[] = ['http', 'https']
): ValidationResult<string> {
  try {
    const parsed = new URL(url);

    if (!allowedProtocols.includes(parsed.protocol.replace(':', ''))) {
      return {
        success: false,
        error: `Protocol must be one of: ${allowedProtocols.join(', ')}`
      };
    }

    // Prevent javascript: and data: URLs
    if (['javascript:', 'data:', 'vbscript:'].includes(parsed.protocol)) {
      return {
        success: false,
        error: 'Dangerous protocol detected'
      };
    }

    return {
      success: true,
      data: url
    };
  } catch {
    return {
      success: false,
      error: 'Invalid URL format'
    };
  }
}

/**
 * Schema-based validation
 *
 * @param data - Data to validate
 * @param schema - Validation schema
 * @returns Validation result
 *
 * @example
 * const schema: Schema<User> = {
 *   required: true,
 *   type: 'object',
 *   customValidator: (value) => value.name !== undefined
 * };
 */
export function validateSchema<T>(
  data: unknown,
  schema: Schema<T>
): ValidationResult<T> {
  // Check required
  if (schema.required && (data === null || data === undefined)) {
    return {
      success: false,
      error: 'This field is required'
    };
  }

  // Use default value if empty
  if ((data === null || data === undefined) && schema.defaultValue !== undefined) {
    return {
      success: true,
      data: schema.defaultValue
    };
  }

  // Skip validation if not required and empty
  if (!schema.required && (data === null || data === undefined)) {
    return {
      success: true,
      data: data as T
    };
  }

  // Type validation
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (actualType !== schema.type) {
      return {
        success: false,
        error: `Expected type ${schema.type}, got ${actualType}`
      };
    }
  }

  // String-specific validations
  if (schema.type === 'string' && typeof data === 'string') {
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      return {
        success: false,
        error: `Must be at least ${schema.minLength} characters`
      };
    }

    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      return {
        success: false,
        error: `Must not exceed ${schema.maxLength} characters`
      };
    }

    if (schema.pattern && !schema.pattern.test(data)) {
      return {
        success: false,
        error: 'Format is invalid'
      };
    }
  }

  // Custom validator
  if (schema.customValidator) {
    const customResult = schema.customValidator(data);
    if (customResult === false) {
      return {
        success: false,
        error: 'Custom validation failed'
      };
    }

    if (typeof customResult === 'object' && !customResult.success) {
      return customResult as ValidationResult<T>;
    }
  }

  return {
    success: true,
    data: data as T
  };
}

/**
 * Type guard to check if value is a plain object
 *
 * @param value - Value to check
 * @returns True if value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

/**
 * Type guard to check if value is a non-empty string
 *
 * @param value - Value to check
 * @returns True if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validate prompt input for common issues
 *
 * @param prompt - Prompt text to validate
 * @returns Validation result with specific error messages
 */
export function validatePrompt(prompt: string): ValidationResult<string> {
  if (!isNonEmptyString(prompt)) {
    return {
      success: false,
      error: 'Prompt cannot be empty'
    };
  }

  const trimmed = prompt.trim();

  // Check minimum length
  if (trimmed.length < 3) {
    return {
      success: false,
      error: 'Prompt is too short (minimum 3 characters)'
    };
  }

  // Check maximum reasonable length
  if (trimmed.length > 50000) {
    return {
      success: false,
      error: 'Prompt is too long (maximum 50,000 characters)'
    };
  }

  // Check for potentially malicious patterns
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gis,
    /javascript:/gi,
    /data:text\/html/gi,
    /on\w+\s*=/gi // Event handlers like onclick=
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      console.warn('[Security] Potentially dangerous pattern detected in prompt');
      return {
        success: false,
        error: 'Prompt contains invalid content'
      };
    }
  }

  return {
    success: true,
    data: trimmed
  };
}

/**
 * Sanitize and validate prompt in one operation
 *
 * @param prompt - Raw prompt input
 * @returns Sanitized and validated prompt or error
 */
export function sanitizeAndValidatePrompt(prompt: string): ValidationResult<string> {
  const sanitized = sanitizeInput(prompt, {
    maxLength: 50000,
    stripHTML: false, // We allow some formatting in prompts
    preserveLineBreaks: true
  });

  return validatePrompt(sanitized);
}

/**
 * Safe local storage wrapper with error handling
 *
 * @param key - Storage key
 * @param value - Value to parse
 * @returns Parsed value or fallback
 */
export function safeGetFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('[Validation] localStorage not available');
      return fallback;
    }

    const item = window.localStorage.getItem(key);
    if (!item) {
      return fallback;
    }

    return safeJSONParse(item, fallback);
  } catch (error) {
    console.error('[Validation] Error reading from localStorage:', error);
    return fallback;
  }
}

/**
 * Safe local storage setter with error handling
 *
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful, false otherwise
 */
export function safeSetToLocalStorage(key: string, value: unknown): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('[Validation] localStorage not available');
      return false;
    }

    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    // Handle quota exceeded error
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('[Validation] localStorage quota exceeded');
    } else {
      console.error('[Validation] Error writing to localStorage:', error);
    }
    return false;
  }
}

/**
 * Validate API key format (basic check)
 *
 * @param apiKey - API key to validate
 * @returns Validation result
 */
export function validateApiKey(apiKey: string): ValidationResult<string> {
  if (!isNonEmptyString(apiKey)) {
    return {
      success: false,
      error: 'API key cannot be empty'
    };
  }

  const trimmed = apiKey.trim();

  // Check minimum length for most API keys
  if (trimmed.length < 10) {
    return {
      success: false,
      error: 'API key appears to be invalid (too short)'
    };
  }

  // Check for obviously invalid values
  const invalidPatterns = [
    /^(undefined|null|your_api_key_here|api_key)$/i,
    /\s{2,}/ // Multiple consecutive spaces
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmed)) {
      return {
        success: false,
        error: 'API key appears to be invalid'
      };
    }
  }

  return {
    success: true,
    data: trimmed
  };
}

/**
 * Batch validation for multiple fields
 *
 * @param fields - Object with field names and validation results
 * @returns Combined validation result
 */
export function validateBatch(
  fields: Record<string, ValidationResult>
): ValidationResult<Record<string, unknown>> {
  const errors: string[] = [];
  const validData: Record<string, unknown> = {};

  for (const [fieldName, result] of Object.entries(fields)) {
    if (!result.success) {
      errors.push(`${fieldName}: ${result.error || 'Validation failed'}`);
    } else if (result.data !== undefined) {
      validData[fieldName] = result.data;
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      error: errors.join('; ')
    };
  }

  return {
    success: true,
    data: validData
  };
}
