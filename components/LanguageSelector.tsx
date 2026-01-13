// LanguageSelector Component
// Allows switching between English and Arabic with automatic RTL/LTR switching

import React from 'react';
import { Language, translations, getDirection } from '../constants/translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang);

    // Update document direction and language
    const html = document.documentElement;
    html.setAttribute('dir', getDirection(lang));
    html.setAttribute('lang', lang);
  };

  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('ar')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'ar'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-400 hover:text-gray-200'
        }`}
        aria-label="اللغة العربية"
      >
        <span className="flex items-center gap-2">
          <span className="text-base">🇸🇦</span>
          <span>العربية</span>
        </span>
      </button>

      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-400 hover:text-gray-200'
        }`}
        aria-label="English Language"
      >
        <span className="flex items-center gap-2">
          <span className="text-base">🇬🇧</span>
          <span>English</span>
        </span>
      </button>
    </div>
  );
};

// Hook for managing language state
export function useLanguage(initial: Language = 'ar'): [Language, (lang: Language) => void] {
  const [language, setLanguageState] = React.useState<Language>(initial);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    // Update document direction and language
    const html = document.documentElement;
    html.setAttribute('dir', getDirection(lang));
    html.setAttribute('lang', lang);
  };

  // Set initial direction
  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('dir', getDirection(language));
    html.setAttribute('lang', language);
  }, []);

  return [language, setLanguage];
}

// Translation helper hook
export function useTranslation(language: Language) {
  return {
    t: (key: keyof typeof translations.ar): string => translations[language][key],
    language,
    direction: getDirection(language) as 'ltr' | 'rtl',
    isArabic: language === 'ar',
  };
}
