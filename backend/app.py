from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)  # Active CORS pour permettre au Frontend Next.js de communiquer avec ce Backend

# --- 1. Chargement du Modèle (Une seule fois au démarrage) ---
MODEL_PATH = '../model/model.json' # Chemin vers le fichier JSON généré par le notebook

# Variables globales pour stocker les paramètres du modèle
W, b, MEAN, STD = None, None, None, None

try:
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'r') as f:
            model_data = json.load(f)
        
        # Conversion des listes JSON en tableaux NumPy pour les calculs mathématiques
        # W doit être un vecteur colonne (5, 1) pour le produit matriciel
        W = np.array(model_data['w']).reshape(-1, 1) 
        b = float(model_data['b'])
        MEAN = np.array(model_data['mean'])
        STD = np.array(model_data['std'])
        
        print("✅ Modèle chargé avec succès !")
        print(f"   Forme des poids (W) : {W.shape}")
        print(f"   Biais (b) : {b}")
    else:
        print(f"⚠️ Attention : Le fichier {MODEL_PATH} est introuvable.")
        print("   Assurez-vous d'avoir exécuté le notebook d'entraînement d'abord.")

except Exception as e:
    print(f"❌ Erreur lors du chargement du modèle : {e}")

# --- 2. Fonctions Mathématiques ---

def sigmoid(z):
    """Fonction d'activation Sigmoïde : transforme le score en probabilité entre 0 et 1"""
    return 1 / (1 + np.exp(-z))

def logique_prediction(features):
    """
    Effectue le calcul de prédiction :
    1. Normalisation des entrées
    2. Calcul linéaire Z = X.W + b
    3. Probabilité A = sigmoid(Z)
    """
    # 1. Normalisation : (X - moyenne) / écart-type
    # Il est CRUCIAL d'utiliser les mêmes mean/std que lors de l'entraînement
    features_norm = (features - MEAN) / STD
    
    # Redimensionner pour le produit matriciel : devient une matrice (1, 5)
    features_norm = features_norm.reshape(1, -1)
    
    # 2. Calcul du score linéaire (Z)
    # Produit scalaire : (1, 5) . (5, 1) -> (1, 1)
    z = np.dot(features_norm, W) + b
    
    # 3. Calcul de la probabilité finale
    probabilite = sigmoid(z)[0][0]
    
    return probabilite

# --- 3. Routes de l'API ---

@app.route('/sante', methods=['GET'])
def verification_sante():
    """Route simple pour vérifier si le serveur est en ligne"""
    return jsonify({
        "statut": "opérationnel", 
        "modele_charge": W is not None
    }), 200

@app.route('/predire', methods=['POST'])
def endpoint_prediction():
    """
    Reçoit les données utilisateur, prédit la santé et renvoie le résultat.
    Format attendu du JSON :
    {
        "sleep_hours": 7.5,
        "exercise_minutes": 90,
        "screen_time_hours": 4,
        "water_glasses": 6,
        "fast_food_per_week": 2
    }
    """
    # Vérification si le modèle est bien chargé
    if W is None:
        return jsonify({
            "erreur": "Le modèle n'est pas chargé. Vérifiez le fichier model.json."
        }), 500

    try:
        # Récupération des données envoyées par le Frontend
        donnees = request.get_json()
        
        # Liste des champs obligatoires (doit correspondre au dataset)
        champs_requis = [
            'sleep_hours', 
            'exercise_minutes', 
            'screen_time_hours', 
            'water_glasses', 
            'fast_food_per_week'
        ]
        
        # Extraction et validation des valeurs
        valeurs_entree = []
        for champ in champs_requis:
            if champ not in donnees:
                return jsonify({"erreur": f"Champ manquant : {champ}"}), 400
            
            try:
                # Conversion en nombre flottant (float)
                valeur = float(donnees[champ])
                valeurs_entree.append(valeur)
            except ValueError:
                return jsonify({"erreur": f"La valeur pour {champ} doit être un nombre."}), 400
            
        # Conversion en tableau NumPy pour le calcul
        tableau_numpy = np.array(valeurs_entree)
        
        # --- ÉTAPE CLÉ : PRÉDICTION ---
        probabilite = logique_prediction(tableau_numpy)
        
        # Seuil de décision : 0.5 (50%)
        # Si proba >= 0.5 alors Sain (1), sinon Malsain (0)
        classe_predite = 1 if probabilite >= 0.5 else 0
        
        # Création de la réponse utilisateur
        statut = "Sain" if classe_predite == 1 else "Malsain"
        
        # Message personnalisé
        if classe_predite == 1:
            message = "Excellent travail ! Vos habitudes de vie sont équilibrées. Continuez ainsi ! 🌟"
        else:
            message = "Votre mode de vie nécessite quelques ajustements. Essayez de dormir plus, de faire du sport et de réduire la malbouffe. 💪"

        # Renvoi de la réponse au format JSON
        return jsonify({
            "prediction_classe": classe_predite,
            "probabilite": round(probabilite * 100, 2), # En pourcentage (ex: 85.50)
            "statut_sante": statut,
            "message_conseil": message
        })

    except Exception as e:
        print(f"Erreur lors de la prédiction : {e}")
        return jsonify({"erreur": str(e)}), 400

if __name__ == '__main__':
    # Lancement du serveur sur le port 5000
    print("🚀 Démarrage du serveur Flask sur http://localhost:5000")
    app.run(debug=True, port=5000)