import React from 'react';
import type { Language } from '@/constants/translations';
import { translations, getDirection } from '@/constants/translations';

export function useLanguage(
  initial: Language = 'ar',
): [Language, (lang: Language) => void] {
  const [language, setLanguageState] = React.useState<Language>(initial);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    const html = document.documentElement;
    html.setAttribute('dir', getDirection(lang));
    html.setAttribute('lang', lang);
  };

  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('dir', getDirection(language));
    html.setAttribute('lang', language);
  }, [language]);

  return [language, setLanguage];
}

export function useTranslation(language: Language) {
  return {
    t: (key: keyof typeof translations.ar): string =>
      translations[language][key],
    language,
    direction: getDirection(language) as 'ltr' | 'rtl',
    isArabic: language === 'ar',
  };
}
