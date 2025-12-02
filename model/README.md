# 📁 model/

Ce dossier contient tout ce qui concerne **l’entraînement**, **l’enregistrement** et **l’utilisation** du modèle de Machine Learning dans le projet.

---

## 🎯 Objectif du dossier
Centraliser :
- le notebook d’entraînement du modèle  
- les paramètres entraînés (poids + biais)  
- les fichiers nécessaires à la prédiction côté backend

---

## 📦 Contenu

### **1. `logistic_regression.ipynb`**
Notebook dédié à la phase d’entraînement :
- Chargement du dataset (`dataset.csv`)
- Analyse rapide des données
- Entraînement d’un **modèle de régression logistique**
- Extraction des paramètres appris :
  - **weights** (w1, w2, w3, w4, w5)
  - **bias** (b)
- Sauvegarde du modèle final dans `model.json`


---

### **2. `model.json`**
Fichier contenant les paramètres finaux du modèle.

Exemple :
```json
{
  "weights": [0.52, -0.34, 0.12, 0.48, -0.65],
  "bias": 0.8
}
