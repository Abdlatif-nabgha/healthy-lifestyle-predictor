import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Configuration pour reproductibilité
np.random.seed(42)


# 1. GÉNÉRATION DES DONNÉES

def generate_lifestyle_dataset(n_samples=300):
    """
    Génère un dataset synthétique de lifestyle avec 300 personnes
    """
    data = []
    
    for i in range(n_samples):
        # Décider si on crée un profil healthy ou unhealthy
        if np.random.rand() > 0.5:
            # Profil HEALTHY
            sleep_hours = np.clip(np.random.normal(7.5, 0.8), 4, 10)
            exercise_minutes = np.clip(np.random.normal(120, 40), 0, 300)
            screen_time_hours = np.clip(np.random.normal(6, 1.5), 2, 14)
            water_glasses = np.clip(np.random.normal(7, 1.5), 0, 12)
            fast_food_per_week = np.clip(np.random.normal(2, 1), 0, 10)
        else:
            # Profil UNHEALTHY
            sleep_hours = np.clip(np.random.normal(6, 1.2), 4, 10)
            exercise_minutes = np.clip(np.random.normal(45, 30), 0, 300)
            screen_time_hours = np.clip(np.random.normal(10, 2), 2, 14)
            water_glasses = np.clip(np.random.normal(3, 1.5), 0, 12)
            fast_food_per_week = np.clip(np.random.normal(5, 2), 0, 10)
        
        # Arrondir les valeurs
        sleep_hours = round(sleep_hours, 1)
        exercise_minutes = int(round(exercise_minutes))
        screen_time_hours = round(screen_time_hours, 1)
        water_glasses = int(round(water_glasses))
        fast_food_per_week = int(round(fast_food_per_week))
        
        data.append({
            'sleep_hours': sleep_hours,
            'exercise_minutes': exercise_minutes,
            'screen_time_hours': screen_time_hours,
            'water_glasses': water_glasses,
            'fast_food_per_week': fast_food_per_week
        })
    
    return pd.DataFrame(data)



# 2. RÈGLES DE LABELLISATION


def label_healthy(row):
    """
    Détermine si une personne est healthy (1) ou unhealthy (0)
    
    Règles:
    - Sommeil: 7-9h
    - Exercice: >= 90 min/semaine
    - Écran: <= 8h/jour
    - Eau: >= 5 verres/jour
    - Fast-food: <= 3 repas/semaine
    """
    is_healthy = (
        7 <= row['sleep_hours'] <= 9 and
        row['exercise_minutes'] >= 90 and
        row['screen_time_hours'] <= 8 and
        row['water_glasses'] >= 5 and
        row['fast_food_per_week'] <= 3
    )
    return 1 if is_healthy else 0


# 3. CRÉATION DU DATASET

print("Génération du dataset...")
df = generate_lifestyle_dataset(300)

# Appliquer le label
df['healthy'] = df.apply(label_healthy, axis=1)

print(" Dataset créé avec succès!\n")


# 4. STATISTIQUES DESCRIPTIVES


print("=" * 50)
print("STATISTIQUES DU DATASET")
print("=" * 50)

print(f"\n Nombre total d'entrées: {len(df)}")
print(f"Healthy: {df['healthy'].sum()} ({df['healthy'].sum()/len(df)*100:.1f}%)")
print(f"Unhealthy: {(df['healthy']==0).sum()} ({(df['healthy']==0).sum()/len(df)*100:.1f}%)")

print("\n Statistiques par feature:")
print(df.describe().round(2))

print("\n Moyennes par catégorie:")
print(df.groupby('healthy').mean().round(2))


# 5. VISUALISATIONS

print("\n Création des visualisations...")

# Configuration du style
sns.set_style("whitegrid")
plt.figure(figsize=(15, 10))

# 1. Distribution des features
features = ['sleep_hours', 'exercise_minutes', 'screen_time_hours', 
            'water_glasses', 'fast_food_per_week']
feature_names = ['Sommeil (h)', 'Exercice (min/sem)', 'Écran (h/jour)',
                 'Eau (verres/jour)', 'Fast-food (repas/sem)']

for i, (feature, name) in enumerate(zip(features, feature_names), 1):
    plt.subplot(2, 3, i)
    
    # Histogramme pour Healthy vs Unhealthy
    df[df['healthy']==1][feature].hist(alpha=0.6, bins=15, 
                                        color='green', label='Healthy')
    df[df['healthy']==0][feature].hist(alpha=0.6, bins=15, 
                                        color='red', label='Unhealthy')
    
    plt.xlabel(name)
    plt.ylabel('Fréquence')
    plt.title(f'Distribution: {name}')
    plt.legend()

# 6. Distribution du label
plt.subplot(2, 3, 6)
df['healthy'].value_counts().plot(kind='bar', color=['red', 'green'])
plt.xticks([0, 1], ['Unhealthy', 'Healthy'], rotation=0)
plt.ylabel('Nombre de personnes')
plt.title('Distribution du Label')

plt.tight_layout()
plt.savefig('dataset_visualizations.png', dpi=300, bbox_inches='tight')
print(" Visualisations sauvegardées: dataset_visualizations.png")


# 2. Matrice de corrélation
plt.figure(figsize=(10, 8))
correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True, fmt='.2f', cmap='coolwarm', 
            center=0, square=True, linewidths=1)
plt.title('Matrice de Corrélation des Features')
plt.tight_layout()
plt.savefig('correlation_matrix.png', dpi=300, bbox_inches='tight')
print(" Matrice de corrélation sauvegardée: correlation_matrix.png")


# 6. EXPORT DU DATASET

print("\n Export du dataset...")

# Export en CSV
df.to_csv('lifestyle_dataset.csv', index=False)
print("Dataset exporté: lifestyle_dataset.csv")

# Afficher un aperçu
print("\n Aperçu des 10 premières lignes:")
print(df.head(10))

print("\n" + "=" * 50)
print("le dataset est prêt.")
print("=" * 50)
print("\nFichiers créés:")
print("  lifestyle_dataset.csv")
print("  dataset_visualizations.png")
print("  correlation_matrix.png")