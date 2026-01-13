
import React from 'react';
import type { ContentBlock } from '../../types';
import { AccordionItem } from '../Accordion';
import { Card } from '../Card';

interface SectionPageProps {
  title: string;
  introduction?: string | React.ReactNode;
  contentBlocks: ContentBlock[];
  layout?: 'accordion' | 'cards';
}

const renderContentNode = (node: string | React.ReactNode): React.ReactNode => {
  if (typeof node === 'string') {
    return node.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      const isCodeLine = line.startsWith('`') && line.endsWith('`');
      const content = isCodeLine ? line.substring(1, line.length - 1) : line;

      if (line.startsWith('```') && line.length > 3) {
        return <p key={index} className="font-mono bg-gray-800 border border-gray-700 p-2 rounded-md text-sm text-blue-300 my-2">{line.substring(3)}</p>;
      }
      if (line.startsWith('```') || line.endsWith('```')) {
        return <span key={index} className="block">{content}</span>;
      }

      return (
        <p key={index} className={isCodeLine ? 'font-mono bg-gray-700/50 px-1.5 py-0.5 rounded text-sm text-blue-200 inline-block' : 'leading-7'}>
          {content}
        </p>
      );
    });
  }
  return node; 
};


export const SectionPage: React.FC<SectionPageProps> = ({ title, introduction, contentBlocks, layout = 'accordion' }) => {
  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          {title}
        </h1>
        {introduction && <div className="mt-4 text-lg text-gray-400 space-y-2 leading-relaxed max-w-3xl">{renderContentNode(introduction)}</div>}
      </header>

      <div className={`space-y-${layout === 'accordion' ? '4' : '8'}`}>
        {contentBlocks.map((block) => (
          layout === 'accordion' ? (
            <AccordionItem key={block.id} title={block.title} initiallyOpen={block.id === contentBlocks[0].id}>
              {block.description && <div className="mb-4 text-gray-300 space-y-2">{renderContentNode(block.description)}</div>}
              {block.details && <div className="mb-4 text-sm text-gray-400 space-y-2 border-l-2 border-gray-600 pl-4">{renderContentNode(block.details)}</div>}
              {block.examplePrompt && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Example Prompt</p>
                  <pre className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap shadow-inner font-mono">
                    <code>{typeof block.examplePrompt === 'string' ? block.examplePrompt : renderContentNode(block.examplePrompt)}</code>
                  </pre>
                </div>
              )}
              {block.subItems && block.subItems.length > 0 && (
                <div className="mt-6 space-y-4 pl-4 border-l border-gray-700">
                  {block.subItems.map(subItem => (
                     <div key={subItem.id} className="group">
                        <h5 className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">{subItem.title}</h5>
                        {subItem.details && <div className="text-sm text-gray-400 mt-1 mb-3 space-y-1">{renderContentNode(subItem.details)}</div>}
                        {subItem.examplePrompt && (
                           <pre className="bg-gray-800/50 p-3 rounded-lg text-xs text-gray-300 overflow-x-auto mt-2 whitespace-pre-wrap border border-gray-700/50">
                             <code>{typeof subItem.examplePrompt === 'string' ? subItem.examplePrompt : renderContentNode(subItem.examplePrompt)}</code>
                           </pre>
                        )}
                     </div>
                  ))}
                </div>
              )}
            </AccordionItem>
          ) : (
            <Card key={block.id} title={block.title} className="bg-gray-850">
              {block.description && <div className="mb-4 space-y-2 text-gray-300">{renderContentNode(block.description)}</div>}
              {block.details && <div className="mb-4 text-sm text-gray-400 space-y-2">{renderContentNode(block.details)}</div>}
              {block.examplePrompt && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Example Prompt</p>
                  <pre className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap shadow-inner font-mono">
                    <code>{typeof block.examplePrompt === 'string' ? block.examplePrompt : renderContentNode(block.examplePrompt)}</code>
                  </pre>
                </div>
              )}
               {block.subItems && block.subItems.length > 0 && (
                <div className="mt-6 space-y-4">
                  {block.subItems.map(subItem => (
                     <AccordionItem key={subItem.id} title={subItem.title}>
                        {subItem.details && <div className="text-sm text-gray-400 mt-2 mb-3 space-y-1">{renderContentNode(subItem.details)}</div>}
                        {subItem.examplePrompt && (
                           <pre className="bg-gray-900 border border-gray-700 p-3 rounded-lg text-xs text-gray-300 overflow-x-auto mt-2 whitespace-pre-wrap font-mono">
                             <code>{typeof subItem.examplePrompt === 'string' ? subItem.examplePrompt : renderContentNode(subItem.examplePrompt)}</code>
                           </pre>
                        )}
                     </AccordionItem>
                  ))}
                </div>
              )}
            </Card>
          )
        ))}
      </div>
    </div>
  );
};
