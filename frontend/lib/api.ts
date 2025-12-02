import { HealthFormData, PredictionResult } from './types';
import { API_URL } from './constants';

export async function predictHealth(formData: HealthFormData): Promise<PredictionResult> {
    try {
        const response = await fetch(`${API_URL}/predire`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur API:', error);
        return {
            prediction_classe: 0,
            probabilite: 0,
            statut_sante: 'Erreur',
            message_conseil: 'Impossible de contacter le serveur. Vérifiez que Flask est lancé.',
            erreur: 'Erreur de connexion'
        };
    }
}

export async function checkServerHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/sante`);
        return response.ok;
    } catch {
        return false;
    }
}