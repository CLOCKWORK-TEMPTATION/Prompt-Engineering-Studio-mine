// Optimizer Components for Prompt Engineering Studio v2.0
// These components provide guided mode, variant tabs, diagnosis cards, and diff view functionality

// GuidedModeWizard - Multi-step form for collecting user preferences
export {
  GuidedModeWizard,
  type GuidedModeData,
  type GuidedModeWizardProps
} from './GuidedModeWizard';

// VariantTabs - Tab component for switching between AI platform variants
export {
  VariantTabs,
  CompactVariantTabs,
  type PromptVariant,
  type VariantTabsProps
} from './VariantTabs';

// DiagnosisCard - Display diagnosis information including missing info, questions, warnings
export {
  DiagnosisCard,
  CompactDiagnosisCard,
  type DiagnosisData,
  type MissingInfo,
  type ClarifyingQuestion,
  type DiagnosisCardProps
} from './DiagnosisCard';

// DiffView - Side-by-side comparison of original vs optimized prompts
export {
  DiffView,
  InlineComparison,
  DiffIndicator,
  type DiffLine,
  type DiffViewProps,
  type InlineComparisonProps,
  type DiffIndicatorProps
} from './DiffView';
