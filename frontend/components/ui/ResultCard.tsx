import { CheckCircle2, XCircle, Sparkles, Moon, Activity, Monitor, Droplets, Utensils } from 'lucide-react';
import { PredictionResult, HealthFormData } from '@/lib/types';

interface ResultCardProps {
    result: PredictionResult;
    formData: HealthFormData;
    onReset: () => void;
}

export default function ResultCard({ result, formData, onReset }: ResultCardProps) {
    const isHealthy = result.prediction_classe === 1;
    const hasError = !!result.erreur;

    if (hasError) {
        return (
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-red-400">
                    <div className="text-center mb-8">
                        <XCircle className="w-24 h-24 mx-auto text-red-500 mb-4" />
                        <h2 className="text-4xl font-bold mb-4 text-red-600">Erreur</h2>
                        <p className="text-lg text-gray-700">{result.message_conseil}</p>
                    </div>

                    <button
                        onClick={onReset}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl w-full">
            <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all ${isHealthy ? 'border-4 border-green-500' : 'border-4 border-red-500'}`}>
                <div className="text-center mb-8">
                    {isHealthy ? (
                        <CheckCircle2 className="w-24 h-24 mx-auto text-green-500 mb-4 animate-bounce" />
                    ) : (
                        <XCircle className="w-24 h-24 mx-auto text-red-500 mb-4 animate-pulse" />
                    )}

                    <h2 className={`text-4xl font-bold mb-4 ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                        {result.statut_sante}
                    </h2>

                    <div className={`inline-flex items-center gap-2 ${isHealthy ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 'bg-gradient-to-r from-red-100 to-orange-100'} px-6 py-3 rounded-full mb-6`}>
                        <Sparkles className={`w-5 h-5 ${isHealthy ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-2xl font-bold ${isHealthy ? 'text-green-800' : 'text-red-800'}`}>
                            {result.probabilite}% de confiance
                        </span>
                    </div>
                </div>

                <div className={`p-6 rounded-2xl mb-8 ${isHealthy ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                    <p className="text-lg text-gray-700 leading-relaxed text-center">
                        {result.message_conseil}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-100">
                        <Moon className="w-6 h-6 text-indigo-600 mb-2" />
                        <p className="text-gray-600">Sommeil</p>
                        <p className="text-xl font-bold text-indigo-600">{formData.sleep_hours}h</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border-2 border-green-100">
                        <Activity className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-gray-600">Exercice</p>
                        <p className="text-xl font-bold text-green-600">{formData.exercise_minutes}min</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-100">
                        <Monitor className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-gray-600">Écran</p>
                        <p className="text-xl font-bold text-blue-600">{formData.screen_time_hours}h</p>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-xl border-2 border-sky-100">
                        <Droplets className="w-6 h-6 text-sky-600 mb-2" />
                        <p className="text-gray-600">Eau</p>
                        <p className="text-xl font-bold text-sky-600">{formData.water_glasses} verres</p>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                >
                    Nouvelle Analyse
                </button>
            </div>
        </div>
    );
}