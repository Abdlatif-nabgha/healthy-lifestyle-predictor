# 📊 Data Folder - Healthy Lifestyle Predictor

## 📁 Contenu

- **`generate_dataset.py`** : Script de génération du dataset synthétique
- **`dataset.csv`** : Dataset généré (300 lignes × 6 colonnes)
- **`data_analysis.ipynb`** : Notebook d'analyse et visualisation

## 🚀 Utilisation

### 1. Générer le dataset
```bash
cd data/
python generate_dataset.py
```

### 2. Analyser les données
Ouvrir `data_analysis.ipynb` dans Jupyter Notebook ou VS Code

## 📊 Features du Dataset

| Feature | Description | Range |
|---------|-------------|-------|
| `sleep_hours` | Heures de sommeil par nuit | 4-10h |
| `exercise_minutes` | Minutes d'exercice par semaine | 0-300min |
| `screen_time_hours` | Heures d'écran par jour | 2-14h |
| `water_glasses` | Verres d'eau par jour | 0-12 |
| `fast_food_per_week` | Repas fast-food par semaine | 0-10 |
| `healthy` | Cible (0=Unhealthy, 1=Healthy) | 0 ou 1 |

## 🎯 Règles de Labellisation

Un mode de vie est considéré **sain (healthy=1)** si :
- 7 ≤ sleep_hours ≤ 9
- exercise_minutes ≥ 90
- screen_time_hours ≤ 8
- water_glasses ≥ 5
- fast_food_per_week ≤ 3

Sinon, il est **malsain (healthy=0)**.

## 📈 Visualisations Incluses

1. Distribution des classes (Healthy vs Unhealthy)
2. Distribution des features par classe
3. Matrice de corrélation
4. Box plots comparatifs

## ✅ Checklist

- [x] Dataset généré (300 lignes)
- [x] Data cleaning effectué
- [x] Visualisations créées
- [x] Statistiques calculées
- [ ] Prêt pour l'entraînement du modèle