import React from 'react';
import { AccordionItem } from '@/components/ui/Accordion';
import { useTranslation } from '@/hooks/useLanguage';
import type { Language } from '@/constants/translations';
import { contentTranslations, type ContentTranslations } from '@/constants/contentTranslations';

interface PromptTypesSectionProps {
  language?: Language;
}

export const PromptTypesSection: React.FC<PromptTypesSectionProps> = ({
  language = 'en',
}) => {
  const { isArabic } = useTranslation(language);
  const tc = (key: keyof ContentTranslations): string =>
    contentTranslations[language][key];

  const promptTypes = [
    {
      id: 'direct-zero-shot',
      title: tc('directPromptsZeroShot'),
      description: tc('directPromptsZeroShotDesc'),
      details: tc('directPromptsZeroShotDetails'),
    },
    {
      id: 'few-shot',
      title: tc('oneFewMultiShotPrompts'),
      description: tc('oneFewMultiShotPromptsDesc'),
      details: tc('oneFewMultiShotPromptsDetails'),
    },
    {
      id: 'cot',
      title: tc('chainOfThoughtPrompts'),
      description: tc('chainOfThoughtPromptsDesc'),
      details: tc('chainOfThoughtPromptsDetails'),
    },
    {
      id: 'zero-shot-cot',
      title: tc('zeroShotCoTPrompts'),
      description: tc('zeroShotCoTPromptsDesc'),
      details: tc('zeroShotCoTPromptsDetails'),
    },
  ];

  const renderContentNode = (node: string | React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return node.split('\n').map((line, index) => {
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return (
          <p key={index} className="leading-7">
            {line}
          </p>
        );
      });
    }
    return node;
  };

  return (
    <div className={`space-y-10 animate-fade-in max-w-5xl mx-auto ${isArabic ? 'rtl' : 'ltr'}`}>
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          {tc('understandingPromptTypes')}
        </h1>
        <div className="mt-4 text-lg text-gray-400 space-y-2 leading-relaxed max-w-3xl">
          {renderContentNode(tc('understandingPromptTypesIntro'))}
        </div>
      </header>

      <div className="space-y-4">
        {promptTypes.map((block, index) => (
          <AccordionItem
            key={block.id}
            title={block.title}
            initiallyOpen={index === 0}
          >
            <div className="mb-4 text-gray-300 space-y-2">
              {renderContentNode(block.description)}
            </div>
            <div className="mb-4 text-sm text-gray-400 space-y-2 border-l-2 border-gray-600 pl-4">
              {renderContentNode(block.details)}
            </div>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};
