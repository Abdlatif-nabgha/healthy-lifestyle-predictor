# 🏃 Healthy Lifestyle Predictor

Projet Machine Learning - Régression Logistique from scratch

## 📋 Objectif

Créer une application web qui permet de prédire le mode de vie sain/malsain basée sur 5 habitudes quotidiennes.

## 👥 Équipe
- **Member 1**: Abdlatif SIDI MED NABGHA - GLSID2
- **Member 2**: Nejmi Houssam - CCN2
- **Member 3**: SAbih Noha - CCN2 
- **Member 4**: Nawal EL-AARAJ - BDCC2

## 📋 Description
Application de prédiction du mode de vie sain/malsain basée sur 5 habitudes quotidiennes.

## 🛠️ Technologies
- **ML**: Logistic Regression (from scratch)
- **Backend**: Flask
- **Frontend**: Next.js
- **Data**: Python, Pandas, NumPy

## 📁 Structure du Projet
```
healthy-lifestyle-predictor/
│
├── README.md                         ✅ Documentation principale
├── .gitignore                        ✅ Fichiers à ignorer
│
├── data/
│   ├── README.md
│   ├── generate_dataset.py           ✅ Script de génération
│   ├── data_analysis.ipynb           ✅ Notebook d'analyse
│   └── dataset.csv                   ✅ Dataset généré
│
├── model/                   
│   ├── dataset.csv                   ✅ Dataset généré
│   ├── logistic_regression.ipynb     ✅ Notebook d'analyse
│   ├── model.json                    ✅ Modèle généré(stocke les paramètres)
│   └── README.md                     ✅ Documentation
│
├── backend/                 
│   ├── app.py                        ✅ API Flask
│   ├── requirements.txt              ✅ Dépendances
│   └── README.md                     ✅ Documentation
│
└── frontend/                
│   ├── (dossier Next.js complet)
│   └── README.md                     ✅ Documentation
```

### Description des dossiers
- **`/data`** - Dataset synthétique et visualisations
- **`/model`** - Notebook et implémentation du modèle ML from scratch
- **`/backend`** - API Flask pour les prédictions
- **`/frontend`** - Interface utilisateur Next.js
