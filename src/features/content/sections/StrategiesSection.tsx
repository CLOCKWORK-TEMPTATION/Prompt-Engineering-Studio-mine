import React from 'react';
import { AccordionItem } from '@/components/ui/Accordion';
import { useTranslation } from '@/hooks/useLanguage';
import type { Language } from '@/constants/translations';
import { contentTranslations, type ContentTranslations } from '@/constants/contentTranslations';

interface StrategiesSectionProps {
  language?: Language;
}

export const StrategiesSection: React.FC<StrategiesSectionProps> = ({
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

  const strategiesCategories = [
    {
      id: 'clear-goals',
      title: tc('setClearGoals'),
      description: tc('setClearGoalsDesc'),
      subItems: [
        {
          id: 'action-verbs',
          title: tc('useActionVerbs'),
          details: tc('useActionVerbsDesc'),
          examplePrompt: tc('useActionVerbsExample'),
        },
        {
          id: 'define-format',
          title: tc('defineFormat'),
          details: tc('defineFormatDesc'),
          examplePrompt: tc('defineFormatExample'),
        },
        {
          id: 'target-audience',
          title: tc('targetAudience'),
          details: tc('targetAudienceDesc'),
          examplePrompt: tc('targetAudienceExample'),
        },
      ],
    },
    {
      id: 'provide-context',
      title: tc('provideContext'),
      description: tc('provideContextDesc'),
      subItems: [
        {
          id: 'facts-data',
          title: tc('includeRelevantFacts'),
          details: tc('includeRelevantFactsDesc'),
          examplePrompt: tc('includeRelevantFactsExample'),
        },
        {
          id: 'reference-sources',
          title: tc('referenceSpecificSources'),
          details: tc('referenceSpecificSourcesDesc'),
          examplePrompt: tc('referenceSpecificSourcesExample'),
        },
        {
          id: 'define-terms',
          title: tc('defineKeyTerms'),
          details: tc('defineKeyTermsDesc'),
          examplePrompt: tc('defineKeyTermsExample'),
        },
      ],
    },
    {
      id: 'few-shot-strategy',
      title: tc('useFewShotPrompting'),
      description: tc('useFewShotPromptingDesc'),
      subItems: [
        {
          id: 'input-output-pairs',
          title: tc('provideInputOutputPairs'),
          details: tc('provideInputOutputPairsDesc'),
          examplePrompt: tc('provideInputOutputPairsExample'),
        },
        {
          id: 'demonstrate-style',
          title: tc('demonstrateDesiredStyle'),
          details: tc('demonstrateDesiredStyleDesc'),
          examplePrompt: tc('demonstrateDesiredStyleExample'),
        },
        {
          id: 'show-detail-level',
          title: tc('showDetailLevel'),
          details: tc('showDetailLevelDesc'),
          examplePrompt: tc('showDetailLevelExample'),
        },
      ],
    },
    {
      id: 'be-specific',
      title: tc('beSpecificUnambiguous'),
      description: tc('beSpecificUnambiguousDesc'),
      subItems: [
        {
          id: 'precise-language',
          title: tc('usePreciseLanguage'),
          details: tc('usePreciseLanguageDesc'),
          examplePrompt: tc('usePreciseLanguageExample'),
        },
        {
          id: 'quantify-requests',
          title: tc('quantifyRequests'),
          details: tc('quantifyRequestsDesc'),
          examplePrompt: tc('quantifyRequestsExample'),
        },
        {
          id: 'break-down-tasks',
          title: tc('breakDownTasks'),
          details: tc('breakDownTasksDesc'),
          examplePrompt: tc('breakDownTasksExample'),
        },
      ],
    },
    {
      id: 'iterate-experiment',
      title: tc('iterateExperiment'),
      description: tc('iterateExperimentDesc'),
      details: tc('iterateExperimentDetails'),
    },
    {
      id: 'leverage-cot',
      title: tc('leverageCoT'),
      description: tc('leverageCoTDesc'),
      subItems: [
        {
          id: 'encourage-step-by-step',
          title: tc('encourageStepByStep'),
          details: tc('encourageStepByStepDesc'),
          examplePrompt: tc('encourageStepByStepExample'),
        },
        {
          id: 'ask-for-explanation',
          title: tc('askForExplanation'),
          details: tc('askForExplanationDesc'),
          examplePrompt: tc('askForExplanationExample'),
        },
        {
          id: 'guide-logical-sequence',
          title: tc('guideLogicalSequence'),
          details: tc('guideLogicalSequenceDesc'),
          examplePrompt: tc('guideLogicalSequenceExample'),
        },
      ],
    },
    {
      id: 'further-guidance',
      title: tc('furtherGuidance'),
      description: tc('furtherGuidanceDesc'),
    },
  ];

  return (
    <div className={`space-y-10 animate-fade-in max-w-5xl mx-auto ${isArabic ? 'rtl' : 'ltr'}`}>
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          {tc('strategiesForBetterPrompts')}
        </h1>
        <div className="mt-4 text-lg text-gray-400 space-y-2 leading-relaxed max-w-3xl">
          {renderContentNode(tc('strategiesForBetterPromptsIntro'))}
        </div>
      </header>

      <div className="space-y-4">
        {strategiesCategories.map((category, catIndex) => (
          <AccordionItem
            key={category.id}
            title={category.title}
            initiallyOpen={catIndex === 0}
          >
            <div className="mb-4 text-gray-300 space-y-2">
              {renderContentNode(category.description)}
            </div>
            {category.details && (
              <div className="mb-4 text-sm text-gray-400 space-y-2 border-l-2 border-gray-600 pl-4">
                {renderContentNode(category.details)}
              </div>
            )}
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
