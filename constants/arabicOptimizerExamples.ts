// Arabic optimizer examples for Prompt Engineering Studio
// Examples tailored for Arabic language users

import type { PlaygroundExample } from '../types';

export const arabicOptimizerExamples: PlaygroundExample[] = [
  {
    title: 'بريد إلكتروني احترافي',
    userInput: 'ابعت للمدير عن الاجتماع اللي فاتني آسف',
    customInstructions: 'اجعله احترافياً ومؤدباً ومختصراً. اعرض إعادة جدولة الاجتماع.'
  },
  {
    title: 'شرح تقني مبسط',
    userInput: 'اشرح لي البلوك تشين',
    customInstructions: 'اشرح المفهوم لشخص غير تقني باستخدام تشبيه بسيط (مثل دفتر الحسابات المشتركة).'
  },
  {
    title: 'تحسين الكود',
    userInput: 'function calculate(x,y) { return x*y; }',
    customInstructions: 'أضف أنواع TypeScript، ومعالجة الأخطاء للأرقام غير الصالحة، وتعليق JSDoc.'
  },
  {
    title: 'كتابة إبداعية',
    userInput: 'اكتب قصة عن طفل يكتشف قدرات خارقة',
    customInstructions: 'النبرة: ملهمة ومحفزة. الطول: متوسط. أضف تفاصيل حسية.'
  },
  {
    title: 'تحليل بيانات',
    userInput: 'عندي بيانات مبيعات الشهر',
    customInstructions: 'ساعدني في تحليل البيانات واستخراج الرؤى الرئيسية والتوصيات.'
  },
  {
    title: 'تحويل من العامية إلى الفصحى',
    userInput: 'نيجي بكرة الساعة كام نلتقي؟',
    customInstructions: 'حوّل النص من اللهجة العامية إلى اللغة العربية الفصحى مع الحفاظ على المعنى.'
  },
  {
    title: 'ملء مقابلة عمل',
    userInput: 'ممكن تساعدني أكتب رسالة تقديم لوظيفة',
    customInstructions: 'جهز رسالة تقديم احترافية لمهندس برمجيات. ركز على المهارات التقنية والخبرة العملية.'
  },
  {
    title: 'تخطيط درس تعليمي',
    userInput: 'أريد شرح البرمجة للمبتدئين',
    customInstructions: 'أنشئ خطة درس شاملة لتعليم أساسيات البرمجة للطلاب المبتدئين. أضف أمثلة عملية.'
  }
];

// Combined examples with both English and Arabic
export const bilingualOptimizerExamples: PlaygroundExample[] = [
  // Arabic examples (prioritized as per requirements)
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
    customInstructions: 'أضف TypeScript types و error handling و comments.'
  },
  {
    title: 'كتابة محتوى',
    userInput: 'اكتب مقال عن أهمية التعلم المستمر',
    customInstructions: 'الجمهور: المهنيون الشباب. النبرة: محفزة. الطول: 500 كلمة.'
  },
  {
    title: 'تحويل للفصحى',
    userInput: 'يا جماعة الحكاية دي مهمة أوي',
    customInstructions: 'حوّل النص من العامية إلى الفصحى مع الحفاظ على الروح.'
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
    customInstructions: 'Explain it to a non-technical person using a simple analogy.'
  }
];
