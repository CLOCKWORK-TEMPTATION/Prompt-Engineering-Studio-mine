import React from 'react';
import { SectionPage } from './SectionPage';
import {
  strategiesContent,
  furtherGuidanceContent,
} from '@/constants/promptData';
import type { Language } from '@/components/layout/LanguageSelector';

interface StrategiesSectionProps {
  language?: Language;
}

export const StrategiesSection: React.FC<StrategiesSectionProps> = ({ language = 'ar' }) => {
  return (
    <SectionPage
      title="Strategies for Writing Better Prompts"
      introduction="Developing effective prompts requires a strategic approach. Consider these tactics to enhance your prompt engineering skills and achieve superior AI outputs."
      contentBlocks={[...strategiesContent, furtherGuidanceContent]}
      layout="accordion"
    />
  );
};
