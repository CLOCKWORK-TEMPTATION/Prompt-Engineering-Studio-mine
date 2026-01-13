import React, { useState } from 'react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Sidebar, NavItem } from '@/components/layout/Sidebar';
import {
  LanguageSelector,
  Language,
} from '@/components/layout/LanguageSelector';
import { IntroductionSection } from '@/features/content/sections/IntroductionSection';
import { PlaygroundSection } from '@/features/playground/sections/PlaygroundSection';
import { PromptLibrarySection } from '@/features/prompt-library/sections/PromptLibrarySection';
import { SystemPromptTesterSection } from '@/features/system-tester/sections/SystemPromptTesterSection';
import { UserPromptOptimizerSection } from '@/features/optimizer/sections/UserPromptOptimizerSection';
import { PromptTypesSection } from '@/features/content/sections/PromptTypesSection';
import { UseCasesSection } from '@/features/content/sections/UseCasesSection';
import { StrategiesSection } from '@/features/content/sections/StrategiesSection';

type Section =
  | 'introduction'
  | 'playground'
  | 'prompt-library'
  | 'system-tester'
  | 'optimizer'
  | 'types'
  | 'use-cases'
  | 'strategies';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('introduction');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ar');

  const navItems: NavItem[] = [
    { name: 'introduction', icon: '🏠' },
    { name: 'playground', icon: '🎮' },
    { name: 'prompt-library', icon: '📚' },
    { name: 'system-tester', icon: '🧪' },
    { name: 'optimizer', icon: '⚡' },
    { name: 'types', icon: '📋' },
    { name: 'use-cases', icon: '💡' },
    { name: 'strategies', icon: '🎯' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'introduction':
        return <IntroductionSection language={currentLanguage} />;
      case 'playground':
        return <PlaygroundSection language={currentLanguage} />;
      case 'prompt-library':
        return <PromptLibrarySection onUseTemplate={() => {}} language={currentLanguage} />;
      case 'system-tester':
        return <SystemPromptTesterSection language={currentLanguage} />;
      case 'optimizer':
        return <UserPromptOptimizerSection language={currentLanguage} />;
      case 'types':
        return <PromptTypesSection language={currentLanguage} />;
      case 'use-cases':
        return <UseCasesSection language={currentLanguage} />;
      case 'strategies':
        return <StrategiesSection language={currentLanguage} />;
      default:
        return <IntroductionSection language={currentLanguage} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar
          navItems={navItems}
          activeItem={activeSection}
          onNavItemClick={(itemName) => setActiveSection(itemName as Section)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="absolute top-4 left-4 z-10">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
          {renderSection()}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
