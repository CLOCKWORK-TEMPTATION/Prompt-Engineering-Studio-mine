// Translation constants for Prompt Engineering Studio
// Supports English (en) and Arabic (ar)

export type Language = 'en' | 'ar';

export interface Translations {
  // App navigation and common UI
  appName: string;
  introduction: string;
  promptTypes: string;
  useCases: string;
  strategies: string;
  promptLibrary: string;
  playground: string;
  userPromptOptimizer: string;
  systemPromptTester: string;

  // Common actions
  optimize: string;
  generate: string;
  clear: string;
  copy: string;
  copied: string;
  useTemplate: string;
  tryExample: string;

  // User Prompt Optimizer
  optimizerTitle: string;
  optimizerDescription: string;
  yourPrompt: string;
  customInstructions: string;
  customInstructionsPlaceholder: string;
  optimizedResult: string;
  examples: string;
  qualityScore: string;
  missingInfo: string;
  clarifyingQuestions: string;
  privacyWarning: string;
  variants: string;
  genericVariant: string;
  chatgptVariant: string;
  claudeVariant: string;
  geminiVariant: string;
  kimiVariant: string;
  originalPrompt: string;
  vs: string;
  improvedPrompt: string;

  // Languages
  language: string;
  english: string;
  arabic: string;

  // Examples titles
  exampleProfessionalEmail: string;
  exampleCodeRefactoring: string;
  exampleMarketingCopy: string;
  exampleSimplifyExplanation: string;
  exampleArabicEmail: string;
  exampleArabicExplanation: string;
  exampleArabicCode: string;
  exampleArabicWriting: string;

  // Quality and feedback
  excellent: string;
  good: string;
  fair: string;
  needsImprovement: string;
  analyzePrompt: string;
  improvePrompt: string;

  // Tone and style
  tone: string;
  professional: string;
  casual: string;
  friendly: string;
  formal: string;
  creative: string;
  technical: string;

  // Output format
  outputFormat: string;
  paragraph: string;
  bulletPoints: string;
  numbered: string;
  table: string;
  code: string;

  // Length
  length: string;
  short: string;
  medium: string;
  long: string;
  detailed: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Prompt Engineering Studio',
    introduction: 'Introduction',
    promptTypes: 'Prompt Types',
    useCases: 'Use Cases',
    strategies: 'Strategies',
    promptLibrary: 'Prompt Library',
    playground: 'Playground',
    userPromptOptimizer: 'User Prompt Optimizer',
    systemPromptTester: 'System Prompt Tester',

    optimize: 'Optimize',
    generate: 'Generate',
    clear: 'Clear',
    copy: 'Copy',
    copied: 'Copied!',
    useTemplate: 'Use Template',
    tryExample: 'Try Example',

    optimizerTitle: 'User Prompt Optimizer',
    optimizerDescription: 'Transform your raw prompts into clear, effective, and well-structured instructions for AI models.',
    yourPrompt: 'Your Prompt',
    customInstructions: 'Custom Instructions (optional)',
    customInstructionsPlaceholder: 'E.g., Make it professional, add examples, target ChatGPT...',
    optimizedResult: 'Optimized Result',
    examples: 'Examples',
    qualityScore: 'Quality Score',
    missingInfo: 'Missing Info',
    clarifyingQuestions: 'Clarifying Questions',
    privacyWarning: 'Privacy Warning',
    variants: 'Variants',
    genericVariant: 'Generic',
    chatgptVariant: 'ChatGPT',
    claudeVariant: 'Claude',
    geminiVariant: 'Gemini',
    kimiVariant: 'Kimi',
    originalPrompt: 'Original',
    vs: 'vs',
    improvedPrompt: 'Improved',

    language: 'Language',
    english: 'English',
    arabic: 'العربية',

    exampleProfessionalEmail: 'Professional Email',
    exampleCodeRefactoring: 'Code Refactoring',
    exampleMarketingCopy: 'Marketing Copy',
    exampleSimplifyExplanation: 'Simplify Explanation',
    exampleArabicEmail: 'بريد إلكتروني احترافي',
    exampleArabicExplanation: 'شرح مبسط',
    exampleArabicCode: 'تحسين الكود',
    exampleArabicWriting: 'كتابة إبداعية',

    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    needsImprovement: 'Needs Improvement',
    analyzePrompt: 'Analyze Prompt',
    improvePrompt: 'Improve Prompt',

    tone: 'Tone',
    professional: 'Professional',
    casual: 'Casual',
    friendly: 'Friendly',
    formal: 'Formal',
    creative: 'Creative',
    technical: 'Technical',

    outputFormat: 'Output Format',
    paragraph: 'Paragraph',
    bulletPoints: 'Bullet Points',
    numbered: 'Numbered',
    table: 'Table',
    code: 'Code',

    length: 'Length',
    short: 'Short',
    medium: 'Medium',
    long: 'Long',
    detailed: 'Detailed',
  },

  ar: {
    appName: 'استوديو هندسة الأوامر',
    introduction: 'مقدمة',
    promptTypes: 'أنواع الأوامر',
    useCases: 'حالات الاستخدام',
    strategies: 'الاستراتيجيات',
    promptLibrary: 'مكتبة الأوامر',
    playground: 'ساحة اللعب',
    userPromptOptimizer: 'محسن الأوامر',
    systemPromptTester: 'اختبار الأوامر النظامية',

    optimize: 'تحسين',
    generate: 'إنشاء',
    clear: 'مسح',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    useTemplate: 'استخدام القالب',
    tryExample: 'جرب مثال',

    optimizerTitle: 'محسن الأوامر',
    optimizerDescription: 'حوّل أوامرك الأولية إلى تعليمات واضحة وفعالة ومنظمة بشكل جيد لنماذج الذكاء الاصطناعي.',
    yourPrompt: 'أمرك',
    customInstructions: 'تعليمات مخصصة (اختياري)',
    customInstructionsPlaceholder: 'مثال: اجعله احترافي، أضف أمثلة، وجهه لـ ChatGPT...',
    optimizedResult: 'النتيجة المحسنة',
    examples: 'أمثلة',
    qualityScore: 'درجة الجودة',
    missingInfo: 'المعلومات المفقودة',
    clarifyingQuestions: 'أسئلة توضيحية',
    privacyWarning: 'تحذير الخصوصية',
    variants: 'النسخ',
    genericVariant: 'عام',
    chatgptVariant: 'ChatGPT',
    claudeVariant: 'Claude',
    geminiVariant: 'Gemini',
    kimiVariant: 'Kimi',
    originalPrompt: 'الأصلي',
    vs: 'ضد',
    improvedPrompt: 'المحسّن',

    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',

    exampleProfessionalEmail: 'بريد إلكتروني احترافي',
    exampleCodeRefactoring: 'إعادة هيكلة الكود',
    exampleMarketingCopy: 'نص تسويقي',
    exampleSimplifyExplanation: 'شرح مبسط',
    exampleArabicEmail: 'بريد إلكتروني احترافي',
    exampleArabicExplanation: 'شرح مبسط',
    exampleArabicCode: 'تحسين الكود',
    exampleArabicWriting: 'كتابة إبداعية',

    excellent: 'ممتاز',
    good: 'جيد',
    fair: 'متوسط',
    needsImprovement: 'يحتاج تحسين',
    analyzePrompt: 'تحليل الأمر',
    improvePrompt: 'تحسين الأمر',

    tone: 'النبرة',
    professional: 'احترافي',
    casual: 'عادي',
    friendly: 'ودود',
    formal: 'رسمي',
    creative: 'إبداعي',
    technical: 'تقني',

    outputFormat: 'تنسيق الإخراج',
    paragraph: 'فقرة',
    bulletPoints: 'نقاط',
    numbered: 'مرقمة',
    table: 'جدول',
    code: 'كود',

    length: 'الطول',
    short: 'قصير',
    medium: 'متوسط',
    long: 'طويل',
    detailed: 'مفصل',
  },
};

// Helper function to get translation
export function t(lang: Language, key: keyof Translations): string {
  return translations[lang][key];
}

// Detect language from text (simple Arabic detection)
export function detectLanguage(text: string): Language {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
}

// Get text direction for language
export function getDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
