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

  // Optimizer specific
  input: string;
  draftPrompt: string;
  draftPromptPlaceholder: string;
  optimizationGoals: string;
  optimizationGoalsPlaceholder: string;
  optimizePrompt: string;
  chain: string;
  useInPlayground: string;
  share: string;
  copyToClipboard: string;
  optimizedPromptPlaceholder: string;
  chainTip: string;
  analysisAndDiagnosis: string;
  privacyAndSecurityAlerts: string;
  potentiallyMissingInfo: string;
  assumptionsMade: string;
  optimizationHistory: string;
  viewDetails: string;
  hideDetails: string;
  goals: string;
  draft: string;
  optimized: string;
  reuse: string;
  delete: string;
  structured: string;
  chainTooltip: string;
  useInPlaygroundTooltip: string;
  shareLinkCopied: string;
  failedToCopy: string;
  pleaseEnterPrompt: string;
  unknownError: string;
  startWithExample: string;
  genericWorksMost: string;
  chatgptOptimized: string;
  claudeOptimized: string;
  geminiOptimized: string;
  kimiOptimized: string;
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
    optimizerDescription:
      'Transform your raw prompts into clear, effective, and well-structured instructions for AI models.',
    yourPrompt: 'Your Prompt',
    customInstructions: 'Custom Instructions (optional)',
    customInstructionsPlaceholder:
      'E.g., Make it professional, add examples, target ChatGPT...',
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

    // Optimizer specific
    input: 'Input',
    draftPrompt: 'Draft Prompt:',
    draftPromptPlaceholder: 'Write your rough draft or basic idea here...',
    optimizationGoals: 'Optimization Goals (Optional):',
    optimizationGoalsPlaceholder:
      'e.g., Make it more professional, shorter, focus on clarity...',
    optimizePrompt: 'Optimize Prompt',
    chain: 'Chain',
    useInPlayground: 'Playground',
    share: 'Share',
    copyToClipboard: 'Copy to clipboard',
    optimizedPromptPlaceholder:
      'The optimized version of your prompt will appear here.',
    chainTip:
      'Tip: Click CHAIN to use this refined output as your next starting point.',
    analysisAndDiagnosis: 'Analysis & Diagnosis',
    privacyAndSecurityAlerts: 'Privacy & Security Alerts',
    potentiallyMissingInfo: 'Potentially Missing Information',
    assumptionsMade: 'Assumptions Made',
    optimizationHistory: 'Optimization History',
    viewDetails: '▶ View Details',
    hideDetails: '▼ Hide Details',
    goals: 'Goals',
    draft: 'Draft',
    optimized: 'Optimized',
    reuse: 'Reuse',
    delete: 'Delete',
    structured: 'Structured',
    chainTooltip: 'Chain: Use this result as your new input',
    useInPlaygroundTooltip: 'Use in Playground',
    shareLinkCopied: 'Share link copied to clipboard!',
    failedToCopy: 'Failed to copy.',
    pleaseEnterPrompt: 'Please enter a prompt to optimize.',
    unknownError: 'An unknown error occurred.',
    startWithExample: 'Start with an Example',
    genericWorksMost: 'Works with most AI models',
    chatgptOptimized: 'Optimized for OpenAI models',
    claudeOptimized: 'Optimized for Anthropic models',
    geminiOptimized: 'Optimized for Google models',
    kimiOptimized: 'Optimized for Moonshot AI',
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
    optimizerDescription:
      'حوّل أوامرك الأولية إلى تعليمات واضحة وفعالة ومنظمة بشكل جيد لنماذج الذكاء الاصطناعي.',
    yourPrompt: 'أمرك',
    customInstructions: 'تعليمات مخصصة (اختياري)',
    customInstructionsPlaceholder:
      'مثال: اجعله احترافي، أضف أمثلة، وجهه لـ ChatGPT...',
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

    // Optimizer specific
    input: 'الإدخال',
    draftPrompt: 'مسودة الأمر:',
    draftPromptPlaceholder: 'اكتب مسودتك الأولية أو فكرتك الأساسية هنا...',
    optimizationGoals: 'أهداف التحسين (اختياري):',
    optimizationGoalsPlaceholder:
      'مثال: اجعله احترافيًا، أقصر، ركز على الوضوح...',
    optimizePrompt: 'تحسين الأمر',
    chain: 'سلسلة',
    useInPlayground: 'ساحة اللعب',
    share: 'مشاركة',
    copyToClipboard: 'نسخ إلى الحافظة',
    optimizedPromptPlaceholder: 'النسخة المحسنة من أمرك ستظهر هنا.',
    chainTip:
      'نصيحة: انقر على سلسلة لاستخدام هذه المخرجات المكررة كنقطة بداية التالية.',
    analysisAndDiagnosis: 'التحليل والتشخيص',
    privacyAndSecurityAlerts: 'تنبيهات الخصوصية والأمان',
    potentiallyMissingInfo: 'معلومات مفقودة محتملة',
    assumptionsMade: 'الافتراضات المتبناة',
    optimizationHistory: 'سجل التحسين',
    viewDetails: '▶ عرض التفاصيل',
    hideDetails: '▼ إخفاء التفاصيل',
    goals: 'الأهداف',
    draft: 'المسودة',
    optimized: 'المحسّن',
    reuse: 'إعادة الاستخدام',
    delete: 'حذف',
    structured: 'منظم',
    chainTooltip: 'سلسلة: استخدم هذه النتيجة كإدخال جديد',
    useInPlaygroundTooltip: 'الاستخدام في ساحة اللعب',
    shareLinkCopied: 'تم نسخ رابط المشاركة!',
    failedToCopy: 'فشل النسخ.',
    pleaseEnterPrompt: 'الرجاء إدخال أمر للتحسين.',
    unknownError: 'حدث خطأ غير معروف.',
    startWithExample: 'ابدأ بمثال',
    genericWorksMost: 'يعمل مع معظم نماذج الذكاء الاصطناعي',
    chatgptOptimized: 'محسّن لنماذج OpenAI',
    claudeOptimized: 'محسّن لنماذج Anthropic',
    geminiOptimized: 'محسّن لنماذج Google',
    kimiOptimized: 'محسّن لـ Moonshot AI',
  },
};

// Helper function to get translation
export function t(lang: Language, key: keyof Translations): string {
  return translations[lang][key];
}

// Detect language from text (simple Arabic detection)
export function detectLanguage(text: string): Language {
  const arabicPattern =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
}

// Get text direction for language
export function getDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
