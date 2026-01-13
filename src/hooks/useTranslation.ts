import { useMemo } from 'react';
import { translations, getDirection, type Language, type Translations } from '@/constants/translations';

export interface UseTranslationResult {
  t: (key: keyof Translations) => string;
  isArabic: boolean;
  direction: 'ltr' | 'rtl';
  language: Language;
}

export function useTranslation(language: Language): UseTranslationResult {
  const result = useMemo(() => {
    const t = (key: keyof Translations): string => {
      return translations[language][key];
    };

    return {
      t,
      isArabic: language === 'ar',
      direction: getDirection(language),
      language,
    };
  }, [language]);

  return result;
}

export type { Language };
