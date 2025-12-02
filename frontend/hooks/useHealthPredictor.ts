import { useState } from 'react';
import { HealthFormData, PredictionResult } from '@/lib/types';
import { INITIAL_FORM_DATA } from '@/lib/constants';
import { predictHealth } from '@/lib/api';

export function useHealthPredictor() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [formData, setFormData] = useState<HealthFormData>(INITIAL_FORM_DATA);

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const data = await predictHealth(formData);
            setResult(data);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setResult(null);
        setFormData(INITIAL_FORM_DATA);
    };

    const updateFormData = (field: keyof HealthFormData, value: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return {
        currentStep,
        loading,
        result,
        formData,
        handleNext,
        handleBack,
        handleSubmit,
        handleReset,
        updateFormData
    };
}