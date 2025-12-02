export interface HealthFormData {
    sleep_hours: number;
    exercise_minutes: number;
    screen_time_hours: number;
    water_glasses: number;
    fast_food_per_week: number;
}

export interface PredictionResult {
    prediction_classe: number;
    probabilite: number;
    statut_sante: string;
    message_conseil: string;
    erreur?: string;
}

export interface StepConfig {
    id: keyof HealthFormData;
    title: string;
    description: string;
    icon: any;
    min: number;
    max: number;
    step: number;
    unit: string;
    color: string;
}