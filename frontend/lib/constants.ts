import { Moon, Activity, Monitor, Droplets, Utensils } from 'lucide-react';
import { StepConfig, HealthFormData } from './types';

export const STEPS: StepConfig[] = [
  {
    id: 'sleep_hours',
    title: 'Heures de Sommeil',
    description: 'Combien d\'heures dormez-vous par nuit ?',
    icon: Moon,
    min: 4,
    max: 10,
    step: 0.5,
    unit: 'heures/nuit',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'exercise_minutes',
    title: 'Exercice Physique',
    description: 'Minutes d\'exercice par semaine ?',
    icon: Activity,
    min: 0,
    max: 300,
    step: 15,
    unit: 'min/semaine',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'screen_time_hours',
    title: 'Temps d\'Écran',
    description: 'Heures d\'écran par jour ?',
    icon: Monitor,
    min: 2,
    max: 14,
    step: 0.5,
    unit: 'heures/jour',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'water_glasses',
    title: 'Hydratation',
    description: 'Verres d\'eau par jour ?',
    icon: Droplets,
    min: 0,
    max: 12,
    step: 1,
    unit: 'verres/jour',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'fast_food_per_week',
    title: 'Fast Food',
    description: 'Repas fast-food par semaine ?',
    icon: Utensils,
    min: 0,
    max: 10,
    step: 1,
    unit: 'repas/semaine',
    color: 'from-orange-500 to-red-600'
  }
];

export const INITIAL_FORM_DATA: HealthFormData = {
  sleep_hours: 7,
  exercise_minutes: 90,
  screen_time_hours: 6,
  water_glasses: 6,
  fast_food_per_week: 2
};

export const API_URL = 'http://127.0.0.1:5000';