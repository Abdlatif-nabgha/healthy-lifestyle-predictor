import { ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { StepConfig } from '@/lib/types';

interface StepCardProps {
  step: StepConfig;
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  loading: boolean;
}

export default function StepCard({
  step,
  value,
  onChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  loading
}: StepCardProps) {
  const Icon = step.icon;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {step.title}
        </h2>
        
        <p className="text-gray-600 text-lg">
          {step.description}
        </p>
      </div>

      {/* Value Display */}
      <div className="mb-8">
        <div className={`text-center py-6 rounded-2xl bg-gradient-to-br ${step.color}`}>
          <div className="text-6xl font-bold text-white mb-2">
            {value}
          </div>
          <div className="text-white text-lg font-medium">
            {step.unit}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-12">
        <input
          type="range"
          min={step.min}
          max={step.max}
          step={step.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{step.min}</span>
          <span>{step.max}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {!isFirstStep && (
          <button
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>
        )}
        
        <button
          onClick={onNext}
          disabled={loading}
          className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyse...
            </>
          ) : isLastStep ? (
            <>
              Voir le Résultat
              <Sparkles className="w-5 h-5" />
            </>
          ) : (
            <>
              Suivant
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}