import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
np.random.seed(42)

def generate_one(is_healthy):
    if is_healthy:
        sleep_hours = np.clip(np.random.normal(7.5, 0.8), 4, 10)
        exercise_minutes = np.clip(np.random.normal(120, 40), 0, 300)
        screen_time_hours = np.clip(np.random.normal(6, 1.5), 2, 14)
        water_glasses = np.clip(np.random.normal(7, 1.5), 0, 12)
        fast_food_per_week = np.clip(np.random.normal(2, 1), 0, 10)
    else:
        sleep_hours = np.clip(np.random.normal(6, 1.2), 4, 10)
        exercise_minutes = np.clip(np.random.normal(45, 30), 0, 300)
        screen_time_hours = np.clip(np.random.normal(10, 2), 2, 14)
        water_glasses = np.clip(np.random.normal(3, 1.5), 0, 12)
        fast_food_per_week = np.clip(np.random.normal(5, 2), 0, 10)
    return {
        'sleep_hours': round(sleep_hours, 1),
        'exercise_minutes': int(round(exercise_minutes)),
        'screen_time_hours': round(screen_time_hours, 1),
        'water_glasses': int(round(water_glasses)),
        'fast_food_per_week': int(round(fast_food_per_week))
    }

def label_row(row):
    return int((7 <= row['sleep_hours'] <= 9) and
               (row['exercise_minutes'] >= 90) and
               (row['screen_time_hours'] <= 8) and
               (row['water_glasses'] >= 5) and
               (row['fast_food_per_week'] <= 3))

def generate_balanced(n_per_class=150):
    rows = []
    # generate healthy until reach count
    while sum(1 for r in rows if r.get('healthy')==1) < n_per_class:
        r = generate_one(is_healthy=True)  # generate candidate biased to healthy
        r['healthy'] = label_row(r)
        if r['healthy']==1:
            rows.append(r)
    # generate unhealthy until reach count
    while sum(1 for r in rows if r.get('healthy')==0) < n_per_class:
        r = generate_one(is_healthy=False)  # candidate biased to unhealthy
        r['healthy'] = label_row(r)
        if r['healthy']==0:
            rows.append(r)
    return pd.DataFrame(rows).sample(frac=1, random_state=42).reset_index(drop=True)

df = generate_balanced(n_per_class=150)
print(df['healthy'].value_counts())

# save dataset to csv in the current directory 
df.to_csv('dataset.csv', index=False)
