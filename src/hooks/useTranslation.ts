import { useMemo } from 'react';
import { translations, type Language, type Translations } from '@/constants/translations';

export function useTranslation(language: Language) {
  const t = useMemo(
    () => (key: keyof Translations): string => {
      return translations[language][key];
    },
    [language]
  );

  return { t };
}
