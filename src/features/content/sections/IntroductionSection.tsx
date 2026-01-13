import React from 'react';
import { Card } from '@/components/ui/Card';
import { AccordionItem } from '@/components/ui/Accordion';
import { useTranslation } from '@/hooks/useLanguage';
import type { Language } from '@/constants/translations';
import { contentTranslations, type ContentTranslations } from '@/constants/contentTranslations';

const renderContentNode = (node: string | React.ReactNode): React.ReactNode => {
  if (typeof node === 'string') {
    return node.split('\n').map((line, index) => (
      <p key={index} className="leading-7">
        {line}
      </p>
    ));
  }
  return node;
};

interface IntroductionSectionProps {
  language?: Language;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  language = 'en',
}) => {
  const { isArabic } = useTranslation(language);
  const tc = (key: keyof ContentTranslations): string =>
    contentTranslations[language][key];

  return (
    <div className={`space-y-10 animate-fade-in max-w-5xl mx-auto ${isArabic ? 'rtl' : 'ltr'}`}>
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          {tc('welcomeToStudio')}
        </h1>
        <div className="mt-4 text-lg text-gray-400 space-y-4 leading-relaxed">
          <p>{tc('welcomeToStudioP1')}</p>
          <p>{tc('welcomeToStudioP2')}</p>
          <p>{tc('welcomeToStudioP3')}</p>
        </div>
      </header>

      <Card title={tc('metaPromptTitle')} className="bg-gray-850">
        <div className="text-gray-300 mb-6 space-y-3">
          <p>{tc('metaPromptIntro')}</p>
          <p className="font-semibold text-blue-300 mt-4">{tc('yourTask')}</p>
          <p>{tc('metaPromptInstructions')}</p>
          <ul className="list-decimal list-inside space-y-2 mt-3 text-gray-300">
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction1').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction1').split(':').slice(1).join(':')}
            </li>
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction2').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction2').split(':').slice(1).join(':')}
            </li>
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction3').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction3').split(':').slice(1).join(':')}
            </li>
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction4').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction4').split(':').slice(1).join(':')}
            </li>
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction5').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction5').split(':').slice(1).join(':')}
            </li>
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction6').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction6').split(':').slice(1).join(':')}
            </li>
            <li>
              <span className="font-semibold text-blue-400">
                {tc('metaPromptInstruction7').split(':')[0]}:
              </span>{' '}
              {tc('metaPromptInstruction7').split(':').slice(1).join(':')}
            </li>
          </ul>
          <p className="font-semibold text-blue-300 mt-4">{tc('metaPromptInput')}</p>
          <p className="font-semibold text-blue-300 mt-2">{tc('metaPromptOutput')}</p>
        </div>
      </Card>

      <Card title={tc('whyPromptEngineeringImportant')} className="bg-gray-850">
        <ul className="space-y-4 text-gray-300">
          <li>
            <span className="font-semibold text-blue-400">
              {tc('improvedModelPerformance')}:
            </span>{' '}
            {tc('improvedModelPerformanceDesc')}
          </li>
          <li>
            <span className="font-semibold text-blue-400">
              {tc('reducedBiasHarmful')}:
            </span>{' '}
            {tc('reducedBiasHarmfulDesc')}
          </li>
          <li>
            <span className="font-semibold text-blue-400">
              {tc('increasedControl')}:
            </span>{' '}
            {tc('increasedControlDesc')}
          </li>
          <li>
            <span className="font-semibold text-blue-400">
              {tc('enhancedUserExperience')}:
            </span>{' '}
            {tc('enhancedUserExperienceDesc')}
          </li>
        </ul>
      </Card>

      <Card title={tc('craftingEffectivePrompts')} className="bg-gray-850">
        <div className="text-gray-300 mb-6 space-y-3">
          {renderContentNode(tc('craftingEffectivePromptsDesc'))}
        </div>
        <div className="space-y-4">
          <AccordionItem title={tc('clarityAndSpecificity')} initiallyOpen={true}>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
              {renderContentNode(tc('clarityAndSpecificityDesc'))}
            </div>
          </AccordionItem>
          <AccordionItem title={tc('contextAndExamples')}>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
              {renderContentNode(tc('contextAndExamplesDesc'))}
            </div>
          </AccordionItem>
          <AccordionItem title={tc('fineTuningAndAdapting')}>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
              {renderContentNode(tc('fineTuningAndAdaptingDesc'))}
            </div>
          </AccordionItem>
          <AccordionItem title={tc('multiTurnConversations')}>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
              {renderContentNode(tc('multiTurnConversationsDesc'))}
            </div>
          </AccordionItem>
        </div>
      </Card>
    </div>
  );
};
