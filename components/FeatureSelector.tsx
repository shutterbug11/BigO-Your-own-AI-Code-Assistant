
import React from 'react';
import type { Feature, FeatureKey } from '../types';

interface FeatureSelectorProps {
  features: Feature[];
  selectedFeatures: Set<FeatureKey>;
  onToggle: (featureKey: FeatureKey) => void;
}

const FeatureCard: React.FC<{ feature: Feature; isSelected: boolean; onToggle: () => void; }> = ({ feature, isSelected, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`p-4 border rounded-lg text-left transition-all duration-300 h-full flex flex-col items-start transform-gpu ${
                isSelected
                ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg scale-105 border-transparent'
                : 'bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-md hover:-translate-y-1'
            }`}
        >
            {feature.icon}
            <h3 className={`font-semibold ${!isSelected && 'text-light-text-primary dark:text-dark-text-primary'}`}>{feature.title}</h3>
            <p className={`text-sm mt-1 flex-grow ${isSelected ? 'text-indigo-100' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>{feature.description}</p>
        </button>
    )
}


export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ features, selectedFeatures, onToggle }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {features.map((feature) => (
        <FeatureCard 
            key={feature.key}
            feature={feature}
            isSelected={selectedFeatures.has(feature.key)}
            onToggle={() => onToggle(feature.key)}
        />
      ))}
    </div>
  );
};