'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import StepCard from '@/components/ui/StepCard';
import ResultCard from '@/components/ui/ResultCard';
import Container from '@/components/layout/Container';
import { useHealthPredictor } from '@/hooks/useHealthPredictor';
import { STEPS } from '@/lib/constants';

export default function HealthForm() {
  const {
    currentStep,
    loading,
    result,
    formData,
    handleNext,
    handleBack,
    handleSubmit,
    handleReset,
    updateFormData
  } = useHealthPredictor();

  if (result) {
    return (
      <Container>
        <ResultCard 
          result={result} 
          formData={formData} 
          onReset={handleReset} 
        />
      </Container>
    );
  }

  const currentStepData = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Container>
      <div className="max-w-2xl w-full">
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={STEPS.length} 
        />
        
        <StepCard
          step={currentStepData}
          value={formData[currentStepData.id]}
          onChange={(value) => updateFormData(currentStepData.id, value)}
          onNext={isLastStep ? handleSubmit : handleNext}
          onBack={handleBack}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          loading={loading}
        />

        <p className="text-center text-white/60 mt-6 text-sm">
          Healthy Lifestyle Predictor - Machine Learning Project
        </p>
      </div>
    </Container>
  );
}