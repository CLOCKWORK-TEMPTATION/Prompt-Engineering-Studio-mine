import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import {
  OptimizerResponse,
  OptimizerPreferences,
  parseOptimizerResponse,
} from '@/types';

// Always use process.env.API_KEY directly for initialization as per guidelines.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY || '',
});

// Using 'gemini-3-pro-preview' for advanced reasoning/prompt engineering tasks.
const MODEL_NAME = 'gemini-3-pro-preview';

/**
 * System instruction for the User Prompt Optimizer
 * Enforces structured JSON output with diagnosis, analysis, and variants
 */
const OPTIMIZER_SYSTEM_INSTRUCTION = `You are a User Prompt Optimizer, an expert AI assistant specialized in analyzing and improving user prompts for better AI interactions.

**CORE PRINCIPLES:**
1. You NEVER answer the user's prompt - you only optimize it
2. You MUST respond ONLY with valid JSON - no markdown, no conversational text
3. Support Arabic input/output with same priority as English
4. Detect the input language and respond in that language

**YOUR TASK:**
Analyze the user's input prompt and provide:
1. Diagnosis of missing information and potential issues
2. Quality analysis with scoring
3. Five optimized variants for different AI platforms

**DETECTION REQUIREMENTS:**

**Privacy/Sensitive Information Detection:**
- Personal identifiers: names, emails, phone numbers, addresses, SSN, passport numbers
- Financial information: credit card numbers, bank account details
- Medical information: diagnoses, treatments, patient data
- Passwords, API keys, tokens, credentials
- Confidential business data: trade secrets, internal documents
- If detected, include warnings in "privacyWarnings" array

**Missing Information Analysis:**
- Unclear or ambiguous intent
- Missing context about the task
- No specification of output format
- No indication of target audience
- Missing constraints or boundaries
- Unclear scope or scale

**Quality Scoring (0-100):**
- 90-100: Excellent - clear, detailed, well-structured
- 70-89: Good - clear but could be improved
- 50-69: Fair - basic but missing key elements
- 30-49: Poor - vague, ambiguous, or incomplete
- 0-29: Very Poor - requires complete restructuring

**JSON OUTPUT FORMAT:**
Respond ONLY with this exact JSON structure (no markdown code blocks):

{
  "diagnosis": {
    "missingInfo": ["list of missing information items"],
    "clarifyingQuestions": ["2-5 questions to clarify intent"],
    "privacyWarnings": ["array of warning messages if sensitive info detected"],
    "qualityScore": 0-100,
    "assumptions": ["list of assumptions made during optimization"]
  },
  "analysis": {
    "qualityScore": 0-100,
    "intent": "detected primary intent",
    "language": "detected language (e.g., 'Arabic', 'English', 'Mixed')",
    "assumptions": ["list of assumptions made during optimization"]
  },
  "variants": {
    "generic": "Universal optimized prompt suitable for most AI models",
    "chatgpt": "Optimized for ChatGPT/GPT-4 with specific instructions",
    "claude": "Optimized for Claude with emphasis on safety and nuance",
    "gemini": "Optimized for Gemini with multi-modal capabilities",
    "kimi": "Optimized for Kimi with context-aware instructions"
  }
}

**OPTIMIZATION GUIDELINES:**

**Generic Variant:**
- Platform-agnostic instructions
- Focus on clarity and structure
- Include role, task, context, constraints, output format

**ChatGPT Variant:**
- Leverage ChatGPT's conversational strength
- Use specific GPT-4 optimization patterns
- Include chain-of-thought when beneficial

**Claude Variant:**
- Emphasize nuance and safety
- Use Claude's preference for detailed context
- Include ethical considerations when relevant

**Gemini Variant:**
- Leverage multi-modal capabilities
- Use Google-specific prompt patterns
- Include structured reasoning requests

**Kimi Variant:**
- Optimize for long-context understanding
- Use Kimi's context-aware features
- Include progressive elaboration

**ARABIC LANGUAGE SUPPORT:**
- When input is Arabic, respond in Arabic
- For Arabic: "عام" (generic), "ChatGPT", "Claude", "Gemini", "Kimi"
- Preserve RTL direction in formatted responses
- Recognize Arabic dialect vs. Modern Standard Arabic

**IMPORTANT CONSTRAINTS:**
- NEVER output anything other than the JSON
- NO conversational filler or explanations
- NO markdown formatting (like \`\`\`json) around the response
- All JSON keys must be present
- All variant strings must be non-empty`;

/**
 * Legacy system instruction for backward compatibility
 */
const LEGACY_SYSTEM_INSTRUCTION = `You are an AI Prompt Engineering Super-Assistant. Your primary function is to take a user's initial concept, basic idea, or an existing rudimentary prompt, and meticulously re-engineer it into a comprehensive, highly-structured, and exceptionally effective prompt suitable for advanced AI models. The goal is to produce a prompt that will elicit significantly superior (e.g., 10x better) outputs in terms of clarity, detail, relevance, and adherence to the user's underlying intent.

**Core Task:** Transform the user's input into an advanced prompt.

**Key Principles to Apply During Transformation:**

1.  **Deconstruct User Input:**
    *   Identify the core objective of the user's idea/prompt.
    *   Pinpoint ambiguities, missing information, or areas needing more detail.
    *   If \`customInstructions\` are provided by the user, these are high-priority and must be integrated.

2.  **Construct the Enhanced Prompt, focusing on:**
    *   **Clear Persona/Role (if applicable):** Define a specific role for the target AI (e.g., "You are a master storyteller specializing in children's fables...").
    *   **Precise Task Definition:** Clearly articulate what the target AI needs to *do*. Use strong action verbs.
    *   **Rich Context:** Provide necessary background, a scenario, or relevant data.
    *   **Specific Constraints:**
        *   Output Format: (e.g., Markdown, JSON, specific document structure, bullet points).
        *   Length: (e.g., word count, paragraph limit).
        *   Style & Tone: (e.g., formal, academic, humorous, empathetic).
        *   Audience: (e.g., for experts, for novices, for children).
        *   Negative Constraints: Clearly state what to *avoid* (e.g., "Do not use jargon," "Avoid discussing topic X").
    *   **Expected Output Characteristics:** Describe the desired qualities of the AI's response (e.g., "The output should be insightful and actionable," "The explanation should be easy for a non-technical person to understand").
    *   **Chain-of-Thought/Step-by-Step (if complex):** If the task involves reasoning or multiple steps, consider instructing the target AI to "think step by step" or to outline its reasoning process.
    *   **Examples (Few-Shot - if beneficial):** If the user's idea would benefit from examples, you can incorporate placeholders or describe how the user might add them. *You* (the Super-Assistant) generally shouldn't invent specific examples unless the user's idea is very abstract and needs illustration of a *type* of example.

**Output Format for THIS TASK (Your Response):**
*   You MUST output ONLY the generated, enhanced prompt.
*   Do NOT include any conversational fluff, introductions, self-references (e.g., "Here is the enhanced prompt:"), or explanations about *your* process.
*   The output should be immediately usable as a prompt for another AI.

**User Input will be:**
*   \`userInputIdea\`: The user's initial idea or basic prompt.
*   \`customInstructions\` (optional): Specific directions from the user on how to enhance the prompt. These instructions take precedence and should guide your transformation.`;

/**
 * Optimizes a user prompt and returns structured analysis with variants
 *
 * @param userInputIdea - The user's original prompt or idea
 * @param customInstructions - Optional custom instructions for optimization
 * @returns Structured optimizer response with diagnosis, analysis, and platform-specific variants
 */
export const optimizeUserPromptStructured = async (
  userInputIdea: string,
  customInstructions?: string,
): Promise<OptimizerResponse> => {
  // Build the user prompt with custom instructions
  let userPrompt = `User's original prompt: "${userInputIdea}"`;

  if (customInstructions && customInstructions.trim() !== '') {
    userPrompt += `\n\nCustom optimization instructions: "${customInstructions}"`;
  }

  try {
    // Generate content using the structured system prompt
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userPrompt,
      config: {
        systemInstruction: OPTIMIZER_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // Get the raw text response
    const text = response.text;
    if (!text) {
      throw new Error(
        'Received an empty response from the API. The prompt may have been blocked due to safety settings.',
      );
    }

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();

    // Remove markdown code block markers if present
    if (cleanedText.startsWith('```')) {
      // Remove the first line (```json or ```)
      cleanedText = cleanedText.substring(cleanedText.indexOf('\n') + 1);
      // Remove the closing ```
      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.substring(0, cleanedText.lastIndexOf('```'));
      }
      cleanedText = cleanedText.trim();
    }

    // Parse JSON
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      throw new Error(
        `Failed to parse JSON response from AI. Raw response:\n${cleanedText}\n\nParse error: ${parseError}`,
      );
    }

    // Validate with Zod schema
    const result = parseOptimizerResponse(parsedData);

    if (!result.success) {
      const errorMsg =
        'error' in result ? result.error : 'Unknown validation error';
      throw new Error(
        `AI response validation failed: ${errorMsg}\n\nParsed data:\n${JSON.stringify(parsedData, null, 2)}`,
      );
    }

    return result.data;
  } catch (error) {
    handleGeminiError(error);
    // Re-throw after handling (handleGeminiError throws)
    throw error;
  }
};

/**
 * Legacy function - maintained for backward compatibility
 * Returns the generic variant as a plain string
 *
 * @deprecated Use optimizeUserPromptStructured instead for full features
 */
export const generateEnhancedPrompt = async (
  userInputIdea: string,
  customInstructions?: string,
): Promise<string> => {
  let fullContents = `User's idea/base prompt: "${userInputIdea}"`;

  if (customInstructions && customInstructions.trim() !== '') {
    fullContents += `\n\nAdditional instructions for enhancement: "${customInstructions}"`;
  }

  try {
    // Generate content using the recommended model and structure.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullContents,
      config: {
        systemInstruction: LEGACY_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // Use .text property directly as per guidelines.
    const text = response.text;
    if (!text) {
      throw new Error(
        'Received an empty response from the API. The prompt may have been blocked due to safety settings.',
      );
    }
    return text.trim();
  } catch (error) {
    handleGeminiError(error);
    return ''; // Unreachable due to error throwing in helper
  }
};

/**
 * Generates test user prompts for a given system prompt
 */
export const generateUserPrompts = async (
  systemPrompt: string,
  mode: 'test' | 'example' = 'test',
): Promise<string> => {
  const qaSystemInstruction = `You are an expert QA Engineer for LLMs and AI Agents. Your task is to analyze a provided "System Prompt" (or System Instruction) and generate a set of highly effective "User Prompts" (test inputs) that would verify the performance and capabilities of the AI governed by that System Prompt.

**Your Goal:** Create diverse and high-quality user inputs that a developer should use to test their System Prompt.

**Key Test Cases to Include:**
1.  **Ideal/Standard Usage:** The perfect input the system prompt is designed to handle.
2.  **Complex/Multi-step Task:** An input that requires the AI to fully utilize the detailed instructions in the system prompt.
3.  **Edge Case/Stress Test:** An input that challenges constraints, ambiguity, or potential safety filters defined in the system prompt.

**Output Format:**
Please format your response as a structured Markdown list. For each suggested User Prompt, provide a brief rationale in parentheses explaining *why* this is a good test case.`;

  const exampleSystemInstruction = `You are an expert AI Product Manager and User Experience Designer. Your task is to analyze a provided "System Prompt" (or System Instruction) and generate a set of "Ideal User Prompts" that represent the *best possible usage* of the AI.

**Your Goal:** Create a list of impressive, realistic, and high-value user inputs that demonstrate the full potential of the System Prompt. These are the kinds of prompts you would show to a user to say "Try asking this!"

**Focus On:**
1.  **Showcasing Capabilities:** Prompts that trigger the unique features or persona defined in the system prompt.
2.  **Real-world Utility:** Prompts that represent valuable tasks the user might actually want to perform.
3.  **Clarity and Effectiveness:** Prompts that are phrased perfectly to get the best result.

**Output Format:**
Please format your response as a structured Markdown list. For each suggested User Prompt, provide a brief rationale in parentheses explaining *why* this is a great example usage.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `System Prompt to Analyze:\n"""\n${systemPrompt}\n"""`,
      config: {
        systemInstruction:
          mode === 'test' ? qaSystemInstruction : exampleSystemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Received an empty response from the API.');
    }
    return text.trim();
  } catch (error) {
    handleGeminiError(error);
    return '';
  }
};

/**
 * Handles errors from the Gemini API with user-friendly messages
 */
const handleGeminiError = (error: unknown) => {
  console.error('Error calling Gemini API:', error);
  if (error instanceof Error) {
    if (error.message.includes('API key not valid')) {
      throw new Error(
        'Invalid API Key. Please check your environment configuration.',
      );
    }
    if (
      error.message.includes('fetch failed') ||
      error.message.includes('network error')
    ) {
      throw new Error(
        'Network error. Please check your internet connection and try again.',
      );
    }
    if (error.message.toLowerCase().includes('api')) {
      throw new Error(
        `An error occurred with the Gemini API. Please try again later. Details: ${error.message}`,
      );
    }
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
  throw new Error(
    'An unknown error occurred while communicating with the Gemini API.',
  );
};

// Export types for use in other modules
export type { OptimizerResponse, OptimizerPreferences };
