import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  introductionContent,
  understandingPromptsContent,
} from '@/constants/promptData';
import type { ContentBlock } from '@/types';
import { AccordionItem } from '@/components/ui/Accordion';

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

export const IntroductionSection: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          {introductionContent.title}
        </h1>
        {introductionContent.description && (
          <div className="mt-4 text-lg text-gray-400 space-y-4 leading-relaxed">
            {renderContentNode(introductionContent.description)}
          </div>
        )}
      </header>

      <Card title={understandingPromptsContent.title} className="bg-gray-850">
        {understandingPromptsContent.description && (
          <div className="text-gray-300 mb-6 space-y-3">
            {renderContentNode(understandingPromptsContent.description)}
          </div>
        )}
        <div className="space-y-4">
          {understandingPromptsContent.subItems?.map((item: ContentBlock) => (
            <AccordionItem key={item.id} title={item.title}>
              {item.details && (
                <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
                  {renderContentNode(item.details)}
                </div>
              )}
            </AccordionItem>
          ))}
        </div>
      </Card>
    </div>
  );
};
