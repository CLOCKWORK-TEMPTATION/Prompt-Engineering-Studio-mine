import React from 'react';
import { AccordionItem } from '@/components/ui/Accordion';
import { useTranslation } from '@/hooks/useLanguage';
import type { Language } from '@/constants/translations';
import { contentTranslations, type ContentTranslations } from '@/constants/contentTranslations';

interface UseCasesSectionProps {
  language?: Language;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({
  language = 'en',
}) => {
  const { isArabic } = useTranslation(language);
  const tc = (key: keyof ContentTranslations): string =>
    contentTranslations[language][key];

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

  const useCasesCategories = [
    {
      id: 'text-generation',
      title: tc('languageAndTextGeneration'),
      description: tc('languageAndTextGenerationDesc'),
      subItems: [
        {
          id: 'creative-writing',
          title: tc('creativeWriting'),
          details: tc('creativeWritingDesc'),
          examplePrompt: tc('creativeWritingExample'),
        },
        {
          id: 'summarization',
          title: tc('summarization'),
          details: tc('summarizationDesc'),
          examplePrompt: tc('summarizationExample'),
        },
        {
          id: 'translation',
          title: tc('translation'),
          details: tc('translationDesc'),
          examplePrompt: tc('translationExample'),
        },
        {
          id: 'dialogue',
          title: tc('dialogueGeneration'),
          details: tc('dialogueGenerationDesc'),
          examplePrompt: tc('dialogueGenerationExample'),
        },
      ],
    },
    {
      id: 'qa',
      title: tc('questionAnswering'),
      description: tc('questionAnsweringDesc'),
      subItems: [
        {
          id: 'open-ended-qa',
          title: tc('openEndedQuestions'),
          details: tc('openEndedQuestionsDesc'),
          examplePrompt: tc('openEndedQuestionsExample'),
        },
        {
          id: 'specific-qa',
          title: tc('specificQuestions'),
          details: tc('specificQuestionsDesc'),
          examplePrompt: tc('specificQuestionsExample'),
        },
        {
          id: 'mcq-qa',
          title: tc('multipleChoiceQuestions'),
          details: tc('multipleChoiceQuestionsDesc'),
          examplePrompt: tc('multipleChoiceQuestionsExample'),
        },
        {
          id: 'hypothetical-qa',
          title: tc('hypotheticalQuestions'),
          details: tc('hypotheticalQuestionsDesc'),
          examplePrompt: tc('hypotheticalQuestionsExample'),
        },
        {
          id: 'opinion-qa',
          title: tc('opinionBasedQuestions'),
          details: tc('opinionBasedQuestionsDesc'),
          examplePrompt: tc('opinionBasedQuestionsExample'),
        },
      ],
    },
    {
      id: 'code-generation',
      title: tc('codeGeneration'),
      description: tc('codeGenerationDesc'),
      subItems: [
        {
          id: 'code-completion',
          title: tc('codeCompletion'),
          details: tc('codeCompletionDesc'),
          examplePrompt: tc('codeCompletionExample'),
        },
        {
          id: 'code-translation',
          title: tc('codeTranslation'),
          details: tc('codeTranslationDesc'),
          examplePrompt: tc('codeTranslationExample'),
        },
        {
          id: 'code-optimization',
          title: tc('codeOptimization'),
          details: tc('codeOptimizationDesc'),
          examplePrompt: tc('codeOptimizationExample'),
        },
        {
          id: 'code-debugging',
          title: tc('codeDebugging'),
          details: tc('codeDebuggingDesc'),
          examplePrompt: tc('codeDebuggingExample'),
        },
      ],
    },
    {
      id: 'image-generation',
      title: tc('imageGeneration'),
      description: tc('imageGenerationDesc'),
      subItems: [
        {
          id: 'photorealistic-img',
          title: tc('photorealisticImages'),
          details: tc('photorealisticImagesDesc'),
          examplePrompt: tc('photorealisticImagesExample'),
        },
        {
          id: 'artistic-img',
          title: tc('artisticImages'),
          details: tc('artisticImagesDesc'),
          examplePrompt: tc('artisticImagesExample'),
        },
        {
          id: 'abstract-img',
          title: tc('abstractImages'),
          details: tc('abstractImagesDesc'),
          examplePrompt: tc('abstractImagesExample'),
        },
        {
          id: 'image-editing-img',
          title: tc('imageEditing'),
          details: tc('imageEditingDesc'),
          examplePrompt: tc('imageEditingExample'),
        },
      ],
    },
  ];

  return (
    <div className={`space-y-10 animate-fade-in max-w-5xl mx-auto ${isArabic ? 'rtl' : 'ltr'}`}>
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          {tc('promptEngineeringUseCases')}
        </h1>
        <div className="mt-4 text-lg text-gray-400 space-y-2 leading-relaxed max-w-3xl">
          {renderContentNode(tc('promptEngineeringUseCasesIntro'))}
        </div>
      </header>

      <div className="space-y-4">
        {useCasesCategories.map((category, catIndex) => (
          <AccordionItem
            key={category.id}
            title={category.title}
            initiallyOpen={catIndex === 0}
          >
            <div className="mb-4 text-gray-300 space-y-2">
              {renderContentNode(category.description)}
            </div>
            {category.subItems && category.subItems.length > 0 && (
              <div className="mt-6 space-y-4 pl-4 border-l border-gray-700">
                {category.subItems.map((subItem) => (
                  <div key={subItem.id} className="group">
                    <h5 className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                      {subItem.title}
                    </h5>
                    {subItem.details && (
                      <div className="text-sm text-gray-400 mt-1 mb-3 space-y-1">
                        {renderContentNode(subItem.details)}
                      </div>
                    )}
                    {subItem.examplePrompt && (
                      <div className="mt-3">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                          {tc('examplePrompt')}
                        </p>
                        <pre className="bg-gray-900 border border-gray-700 p-3 rounded-lg text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                          <code>{subItem.examplePrompt}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};
