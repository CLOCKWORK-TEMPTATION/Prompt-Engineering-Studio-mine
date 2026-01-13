
import React, { useState, useCallback } from 'react';
import type { PromptTemplate } from '../../types';
import { promptTemplateCategories } from '../../constants/promptTemplates';
import { AccordionItem } from '../Accordion';
import { Card } from '../Card';
import { ClipboardIcon, CheckIcon, ArrowUpRightIcon } from '../Icons';


const TemplateCard: React.FC<{ template: PromptTemplate; onUseTemplate: (template: string) => void; }> = ({ template, onUseTemplate }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(template.template).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [template.template]);

    return (
        <Card title={template.title} className="bg-gray-850 flex flex-col h-full hover:shadow-glow-primary transition-shadow duration-300">
           <div className="flex-grow">
                <p className="text-xs text-blue-300/80 uppercase tracking-wide font-bold mb-2">{template.useCase}</p>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">{template.description}</p>
                
                <div className="mb-5 bg-gray-900/50 p-3 rounded-xl border border-gray-800">
                    <p className="text-xs font-semibold text-blue-300 mb-2 uppercase">Variables</p>
                    <ul className="space-y-1.5 text-xs text-gray-400">
                        {template.variables.map(v => (
                           <li key={v.name} className="flex gap-2">
                                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-200 font-mono text-[10px] border border-gray-700">{v.name}</code>
                                <span>{v.description}</span>
                           </li>
                        ))}
                    </ul>
                </div>

                <div className="relative group">
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-1.5 bg-gray-800/80 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors border border-gray-700/50"
                        title="Copy Template"
                        aria-label="Copy prompt template to clipboard"
                    >
                        {copied ? <CheckIcon className="w-3.5 h-3.5 text-green-400" /> : <ClipboardIcon className="w-3.5 h-3.5" />}
                    </button>
                    <pre className="whitespace-pre-wrap p-4 bg-gray-900 rounded-xl text-gray-300 text-xs overflow-x-auto border border-gray-700 shadow-inner font-mono h-32 custom-scrollbar">
                        <code>{template.template}</code>
                    </pre>
                </div>
           </div>
            <div className="mt-6">
                <button 
                    onClick={() => onUseTemplate(template.template)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-500/25"
                >
                    Use in Playground
                    <ArrowUpRightIcon className="w-4 h-4" />
                </button>
            </div>
        </Card>
    )
}


export const PromptLibrarySection: React.FC<{onUseTemplate: (template: string) => void}> = ({ onUseTemplate }) => {
  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto">
      <header className="pb-8 border-b border-gray-700/50">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 pb-2">
          Prompt Template Library
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl leading-relaxed">
          A curated collection of high-quality, structured prompt templates to kickstart your tasks. Choose a template, customize the variables, and get superior results from the AI.
        </p>
      </header>

      <div className="space-y-6">
        {promptTemplateCategories.map((category, index) => (
          <AccordionItem key={category.id} title={category.name} initiallyOpen={index === 0}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
              {category.templates.map(template => (
                <TemplateCard key={template.title} template={template} onUseTemplate={onUseTemplate}/>
              ))}
            </div>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};
