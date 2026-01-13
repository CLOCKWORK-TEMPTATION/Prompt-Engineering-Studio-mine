
import type { PlaygroundExample } from '../types';

export const optimizerExamples: PlaygroundExample[] = [
  // Arabic examples (prioritized)
  {
    title: 'بريد إلكتروني احترافي',
    userInput: 'ابعت للمدير عن الاجتماع اللي فاتني آسف',
    customInstructions: 'اجعله احترافياً ومؤدباً ومختصراً. اعرض إعادة جدولة الاجتماع.'
  },
  {
    title: 'شرح مبسط',
    userInput: 'اشرح لي البلوك تشين',
    customInstructions: 'اشرح المفهوم لشخص غير تقني باستخدام تشبيه بسيط.'
  },
  {
    title: 'تحسين كود',
    userInput: 'عندي function في الجافاسكربت',
    customInstructions: 'أضف TypeScript types و error handling و comments بالعربي.'
  },
  {
    title: 'تحويل للفصحى',
    userInput: 'يا جماعة الحكاية دي مهمة أوي',
    customInstructions: 'حوّل النص من العامية إلى الفصحى مع الحفاظ على المعنى.'
  },
  {
    title: 'كتابة محتوى',
    userInput: 'اكتب مقال عن أهمية التعلم المستمر',
    customInstructions: 'الجمهور: المهنيون الشباب. النبرة: محفزة. الطول: 500 كلمة.'
  },
  // English examples
  {
    title: 'Professional Email',
    userInput: 'email to boss about missing meeting sorry',
    customInstructions: 'Make it professional, polite, and brief. Offer to reschedule.'
  },
  {
    title: 'Code Refactoring',
    userInput: 'function calculate(x,y) { return x*y; }',
    customInstructions: 'Add TypeScript types, error handling for non-numbers, and a JSDoc comment.'
  },
  {
    title: 'Marketing Copy',
    userInput: 'sell this coffee cup',
    customInstructions: 'Target audience: remote workers. Tone: cozy and energetic. Highlight heat retention.'
  },
  {
    title: 'Simplify Explanation',
    userInput: 'explain how blockchain works',
    customInstructions: 'Explain it to a non-technical person using a simple analogy (like a shared ledger or notebook).'
  }
];
