'use client';

import React, { useState } from 'react';
import { Moon, Dumbbell, Heart, Droplet, Apple, Activity, CheckCircle, XCircle, Sparkles } from 'lucide-react';

export default function HealthVibeAI() {
  const [formData, setFormData] = useState({
    sleepHours: 7,
    exerciseTime: 30,
    heartRate: 75,
    waterIntake: 2,
    calorieIntake: 2000
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erreur de connexion à l\'API');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { 
      name: 'sleepHours', 
      label: 'Sleep Hours', 
      icon: Moon, 
      min: 3, 
      max: 12, 
      unit: 'h',
      color: 'bg-purple-500',
      iconBg: 'bg-purple-500'
    },
    { 
      name: 'exerciseTime', 
      label: 'Exercise Time', 
      icon: Dumbbell, 
      min: 0, 
      max: 180, 
      unit: 'min',
      color: 'bg-green-500',
      iconBg: 'bg-green-500'
    },
    { 
      name: 'heartRate', 
      label: 'Heart Rate', 
      icon: Heart, 
      min: 40, 
      max: 120, 
      unit: 'bpm',
      color: 'bg-pink-500',
      iconBg: 'bg-pink-500'
    },
    { 
      name: 'waterIntake', 
      label: 'Water Intake', 
      icon: Droplet, 
      min: 0, 
      max: 5, 
      unit: 'L',
      color: 'bg-blue-500',
      iconBg: 'bg-blue-500',
      step: 0.1
    },
    { 
      name: 'calorieIntake', 
      label: 'Calorie Intake', 
      icon: Apple, 
      min: 1000, 
      max: 4000, 
      unit: 'kcal',
      color: 'bg-orange-500',
      iconBg: 'bg-orange-500',
      step: 50
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
            <Activity className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            HealthVibe AI
          </h1>
          <p className="text-xl text-purple-200 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Your Personal Lifestyle Intelligence
            <Sparkles className="w-5 h-5" />
          </p>
        </div>

        {/* Input Cards */}
        <div className="space-y-6 mb-8">
          {inputFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.name} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`${field.iconBg} p-3 rounded-2xl shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{field.label}</h3>
                  </div>
                  <div className={`${field.iconBg} px-6 py-2 rounded-full font-bold text-lg shadow-lg`}>
                    {formData[field.name]} {field.unit}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-12">{field.min}</span>
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step || 1}
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm text-gray-400 w-12 text-right">{field.max}</span>
                </div>
              </div>
            );
          })}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-5 px-8 rounded-3xl text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Activity className="w-6 h-6" />
                Analyze My Health
              </span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-3xl p-6 mb-8 backdrop-blur-lg">
            <p className="text-red-200 flex items-center gap-3">
              <XCircle className="w-6 h-6" />
              {error}
            </p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`bg-gradient-to-br ${result.label === 1 ? 'from-green-500/20 to-emerald-600/20 border-green-400' : 'from-red-500/20 to-pink-600/20 border-red-400'} border-2 rounded-3xl p-8 shadow-2xl backdrop-blur-lg animate-fadeIn`}>
            <div className="flex items-center gap-4 mb-6">
              {result.label === 1 ? (
                <CheckCircle className="w-16 h-16 text-green-400" strokeWidth={2} />
              ) : (
                <XCircle className="w-16 h-16 text-red-400" strokeWidth={2} />
              )}
              <div>
                <h2 className="text-3xl font-bold">
                  {result.label === 1 ? 'Healthy Lifestyle! 🎉' : 'Needs Improvement ⚠️'}
                </h2>
                <p className="text-xl text-gray-300 mt-1">
                  Confidence: {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-2xl p-6 mb-6">
              <p className="text-lg leading-relaxed">{result.message}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-3">💡 Recommendations:</h3>
              {result.label === 1 ? (
                <>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p>Keep maintaining your current healthy habits!</p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p>Continue regular exercise and balanced nutrition</p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p>Stay hydrated and get adequate sleep</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <Activity className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <p>Try to increase your exercise time to at least 30 minutes daily</p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <Moon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p>Aim for 7-9 hours of quality sleep per night</p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <Droplet className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p>Drink at least 2 liters of water daily</p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                    <Apple className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p>Balance your calorie intake with your activity level</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
          transition: transform 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
          transition: transform 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}