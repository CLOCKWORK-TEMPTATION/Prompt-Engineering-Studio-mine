import React, { useState } from 'react';
import { CommandLineIcon, SparklesIcon, BeakerIcon, RectangleStackIcon, WrenchScrewdriverIcon } from '../Icons';

export interface PromptVariant {
  id: string;
  name: string;
  platform: 'generic' | 'chatgpt' | 'claude' | 'gemini' | 'kimi';
  prompt: string;
  description?: string;
}

export interface VariantTabsProps {
  variants: PromptVariant[];
  onVariantChange?: (variant: PromptVariant) => void;
  className?: string;
}

const VARIANT_CONFIG = {
  generic: {
    label: 'Generic',
    icon: CommandLineIcon,
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    hoverBg: 'hover:bg-blue-500/20'
  },
  chatgpt: {
    label: 'ChatGPT',
    icon: SparklesIcon,
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    hoverBg: 'hover:bg-emerald-500/20'
  },
  claude: {
    label: 'Claude',
    icon: BeakerIcon,
    color: 'text-orange-300',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/20'
  },
  gemini: {
    label: 'Gemini',
    icon: RectangleStackIcon,
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    hoverBg: 'hover:bg-cyan-500/20'
  },
  kimi: {
    label: 'Kimi',
    icon: WrenchScrewdriverIcon,
    color: 'text-purple-300',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20'
  }
};

export const VariantTabs: React.FC<VariantTabsProps> = ({
  variants,
  onVariantChange,
  className = ''
}) => {
  const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id || '');

  const activeVariant = variants.find(v => v.id === activeVariantId) || variants[0];

  const handleVariantChange = (variantId: string) => {
    setActiveVariantId(variantId);
    const variant = variants.find(v => v.id === variantId);
    if (variant && onVariantChange) {
      onVariantChange(variant);
    }
  };

  if (variants.length === 0) {
    return (
      <div className={`bg-gray-850 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 text-center ${className}`}>
        <p className="text-gray-400 text-sm">No variants available</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-850 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden ${className}`}>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700/50 overflow-x-auto">
        {variants.map((variant) => {
          const config = VARIANT_CONFIG[variant.platform];
          const IconComponent = config.icon;
          const isActive = variant.id === activeVariantId;

          return (
            <button
              key={variant.id}
              onClick={() => handleVariantChange(variant.id)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap relative
                ${isActive ? `${config.color} ${config.bgColor}` : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}
              `}
            >
              {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${config.borderColor.replace('/30', '')}`} />
              )}
              <IconComponent className="w-4 h-4" />
              <span>{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Variant Content */}
      {activeVariant && (
        <div className="p-6">
          {/* Variant Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {(() => {
                const config = VARIANT_CONFIG[activeVariant.platform];
                const IconComponent = config.icon;
                return (
                  <>
                    <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
                      <IconComponent className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${config.color}`}>
                        {config.label} Variant
                      </h3>
                      {activeVariant.description && (
                        <p className="text-xs text-gray-400 mt-0.5">{activeVariant.description}</p>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Prompt Content */}
          <div className="relative">
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-inner">
              <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                {activeVariant.prompt}
              </pre>
            </div>
          </div>

          {/* Platform-specific Tips */}
          <div className={`mt-4 p-4 rounded-xl border ${VARIANT_CONFIG[activeVariant.platform].bgColor} ${VARIANT_CONFIG[activeVariant.platform].borderColor} border`}>
            <p className={`text-xs ${VARIANT_CONFIG[activeVariant.platform].color}`}>
              <strong>Tip:</strong> This variant is optimized for {VARIANT_CONFIG[activeVariant.platform].label}'s
              specific capabilities and response patterns.
            </p>
          </div>
        </div>
      )}

      {/* Variant Count Indicator */}
      {variants.length > 1 && (
        <div className="px-6 pb-4">
          <div className="flex items-center justify-center gap-2">
            {variants.map((variant, index) => {
              const isActive = variant.id === activeVariantId;
              const config = VARIANT_CONFIG[variant.platform];
              return (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant.id)}
                  className={`w-8 h-1.5 rounded-full transition-all ${
                    isActive ? `${config.bgColor.replace('/10', '/40')}` : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Switch to ${config.label} variant`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Compact version for smaller displays
export interface CompactVariantTabsProps extends Omit<VariantTabsProps, 'className'> {
  className?: string;
}

export const CompactVariantTabs: React.FC<CompactVariantTabsProps> = ({
  variants,
  onVariantChange,
  className = ''
}) => {
  const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id || '');
  const [showDropdown, setShowDropdown] = useState(false);

  const activeVariant = variants.find(v => v.id === activeVariantId) || variants[0];
  const activeConfig = activeVariant ? VARIANT_CONFIG[activeVariant.platform] : null;
  const ActiveIcon = activeConfig?.icon || CommandLineIcon;

  const handleVariantChange = (variantId: string) => {
    setActiveVariantId(variantId);
    setShowDropdown(false);
    const variant = variants.find(v => v.id === variantId);
    if (variant && onVariantChange) {
      onVariantChange(variant);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 px-4 py-2 bg-gray-850 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all ${activeConfig?.color || 'text-gray-300'}`}
      >
        <ActiveIcon className="w-4 h-4" />
        <span>{activeConfig?.label || 'Select Variant'}</span>
        <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute z-20 mt-2 w-full bg-gray-850 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
            {variants.map((variant) => {
              const config = VARIANT_CONFIG[variant.platform];
              const IconComponent = config.icon;
              const isActive = variant.id === activeVariantId;

              return (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                    isActive
                      ? `${config.bgColor} ${config.color}`
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
