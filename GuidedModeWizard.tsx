import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '../Icons';

export interface GuidedModeData {
  context: string;
  audience: string;
  tone: string;
  constraints: string;
  language: string;
  outputFormat: string;
}

export interface GuidedModeWizardProps {
  onComplete: (data: GuidedModeData) => void;
  onCancel: () => void;
  initialData?: Partial<GuidedModeData>;
}

type WizardStep = 'context' | 'audience' | 'tone' | 'constraints' | 'language' | 'format' | 'review';

const STEP_CONFIG: Record<WizardStep, { title: string; description: string; field: keyof GuidedModeData }> = {
  context: {
    title: 'Context & Background',
    description: 'Provide context about what you want to accomplish',
    field: 'context'
  },
  audience: {
    title: 'Target Audience',
    description: 'Who will receive or use this prompt?',
    field: 'audience'
  },
  tone: {
    title: 'Tone & Style',
    description: 'What tone should the optimized prompt have?',
    field: 'tone'
  },
  constraints: {
    title: 'Constraints & Limitations',
    description: 'Any limitations or requirements to consider',
    field: 'constraints'
  },
  language: {
    title: 'Language Preference',
    description: 'Which language should the output use?',
    field: 'language'
  },
  format: {
    title: 'Output Format',
    description: 'How should the response be structured?',
    field: 'outputFormat'
  },
  review: {
    title: 'Review Your Choices',
    description: 'Review your selections before finalizing',
    field: 'context'
  }
};

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
  { value: 'casual', label: 'Casual', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
  { value: 'formal', label: 'Formal', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
  { value: 'friendly', label: 'Friendly', color: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' },
  { value: 'technical', label: 'Technical', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
  { value: 'creative', label: 'Creative', color: 'bg-pink-500/20 border-pink-500/40 text-pink-300' }
];

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic (العربية)' },
  { value: 'spanish', label: 'Spanish (Español)' },
  { value: 'french', label: 'French (Français)' },
  { value: 'german', label: 'German (Deutsch)' },
  { value: 'chinese', label: 'Chinese (中文)' },
  { value: 'japanese', label: 'Japanese (日本語)' },
  { value: 'korean', label: 'Korean (한국어)' }
];

const FORMAT_OPTIONS = [
  { value: 'paragraph', label: 'Paragraph', icon: '¶' },
  { value: 'bullet', label: 'Bullet Points', icon: '•' },
  { value: 'numbered', label: 'Numbered List', icon: '1.' },
  { value: 'table', label: 'Table', icon: '▦' },
  { value: 'code', label: 'Code Block', icon: '</>' },
  { value: 'json', label: 'JSON', icon: '{}' }
];

const STEPS: WizardStep[] = ['context', 'audience', 'tone', 'constraints', 'language', 'format', 'review'];

export const GuidedModeWizard: React.FC<GuidedModeWizardProps> = ({
  onComplete,
  onCancel,
  initialData = {}
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<GuidedModeData>({
    context: initialData.context || '',
    audience: initialData.audience || '',
    tone: initialData.tone || 'professional',
    constraints: initialData.constraints || '',
    language: initialData.language || 'english',
    outputFormat: initialData.outputFormat || 'paragraph'
  });

  const currentStep = STEPS[currentStepIndex];
  const stepConfig = STEP_CONFIG[currentStep];
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const updateField = (field: keyof GuidedModeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'context':
      case 'audience':
        return formData[stepConfig.field].trim().length > 0;
      case 'review':
        return formData.context.trim().length > 0 && formData.audience.trim().length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'context':
        return (
          <div className="space-y-4">
            <textarea
              value={formData.context}
              onChange={(e) => updateField('context', e.target.value)}
              placeholder="e.g., I need to write a professional email to a client about a project delay..."
              className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm leading-relaxed resize-none"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateField('context', 'I need to create content for social media marketing')}
                className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
              >
                Social Media Content
              </button>
              <button
                onClick={() => updateField('context', 'I need to write a business email or professional communication')}
                className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
              >
                Business Email
              </button>
              <button
                onClick={() => updateField('context', 'I need help with coding or technical documentation')}
                className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
              >
                Technical Help
              </button>
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-4">
            <textarea
              value={formData.audience}
              onChange={(e) => updateField('audience', e.target.value)}
              placeholder="e.g., Software developers with intermediate Python knowledge..."
              className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm leading-relaxed resize-none"
            />
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'General audience', label: 'General Public' },
                { value: 'Technical professionals', label: 'Technical' },
                { value: 'Business executives', label: 'Executives' },
                { value: 'Students or learners', label: 'Students' }
              ].map(option => (
                <button
                  key={option.label}
                  onClick={() => updateField('audience', option.value)}
                  className="px-3 py-2 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'tone':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TONE_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('tone', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.tone === option.value
                      ? option.color
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-750'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'constraints':
        return (
          <div className="space-y-4">
            <textarea
              value={formData.constraints}
              onChange={(e) => updateField('constraints', e.target.value)}
              placeholder="e.g., Keep it under 200 words, avoid jargon, include examples..."
              className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm leading-relaxed resize-none"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateField('constraints', 'Keep it concise and to the point')}
                className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
              >
                Be Concise
              </button>
              <button
                onClick={() => updateField('constraints', 'Provide detailed explanations with examples')}
                className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
              >
                Detailed with Examples
              </button>
              <button
                onClick={() => updateField('constraints', 'Use simple language, avoid technical jargon')}
                className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
              >
                Simple Language
              </button>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGE_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('language', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.language === option.value
                      ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-750'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'format':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {FORMAT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('outputFormat', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.outputFormat === option.value
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-750'
                  }`}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 text-xs uppercase font-bold">Context</span>
                  <p className="text-gray-300 mt-1">{formData.context || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs uppercase font-bold">Audience</span>
                  <p className="text-gray-300 mt-1">{formData.audience || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs uppercase font-bold">Tone</span>
                  <p className="text-teal-300 mt-1 capitalize">{formData.tone}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs uppercase font-bold">Language</span>
                  <p className="text-gray-300 mt-1 capitalize">{formData.language}</p>
                </div>
                {formData.constraints && (
                  <div className="col-span-2">
                    <span className="text-gray-500 text-xs uppercase font-bold">Constraints</span>
                    <p className="text-gray-300 mt-1">{formData.constraints}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <span className="text-gray-500 text-xs uppercase font-bold">Output Format</span>
                  <p className="text-emerald-300 mt-1 capitalize">{formData.outputFormat}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl">
              <p className="text-xs text-teal-300 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 flex-shrink-0" />
                <span>These preferences will be used to customize your optimized prompt.</span>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-850 backdrop-blur-xl border border-gray-700 shadow-card rounded-2xl p-6 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-400">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
          <span className="text-xs font-medium text-teal-300">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-2">
          {stepConfig.title}
        </h2>
        <p className="text-sm text-gray-400">{stepConfig.description}</p>
      </div>

      {/* Step Content */}
      <div className="mb-8 min-h-[200px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
        >
          Cancel
        </button>

        <div className="flex gap-3">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-750 transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Previous
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700 shadow-glow-secondary'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStepIndex === STEPS.length - 1 ? (
              <>Complete</>
            ) : (
              <>
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {STEPS.map((step, index) => (
          <button
            key={step}
            onClick={() => {
              if (index <= currentStepIndex || canProceed()) {
                setCurrentStepIndex(index);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentStepIndex
                ? 'bg-teal-400 w-6'
                : index < currentStepIndex
                  ? 'bg-teal-500/50'
                  : 'bg-gray-700'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
