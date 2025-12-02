# Healthy Lifestyle Predictor - Backend API

This is the Flask-based backend for the Healthy Lifestyle Predictor application. It serves a Logistic Regression model that predicts whether a user's lifestyle is "Healthy" or "Unhealthy" based on their daily habits.

## 🚀 Features

-   **REST API**: Provides endpoints for the frontend to communicate with.
-   **Machine Learning**: Loads a pre-trained Logistic Regression model (`model.json`).
-   **Data Processing**: Normalizes input data using the same parameters (mean, std) as the training set.

## 🛠️ Prerequisites

-   Python 3.8+
-   pip (Python package manager)

## 📦 Installation

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Create a virtual environment** (recommended):
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## 🏃‍♂️ Running the Server

1.  **Start the Flask app**:
    ```bash
    python app.py
    ```

2.  **Verify it's running**:
    The server will start at `http://127.0.0.1:5000`.
    You can check the health status by visiting: `http://127.0.0.1:5000/sante`

## 🔌 API Endpoints

### 1. Health Check
-   **URL**: `/sante`
-   **Method**: `GET`
-   **Response**:
    ```json
    {
        "statut": "opérationnel",
        "modele_charge": true
    }
    ```

### 2. Predict Lifestyle
-   **URL**: `/predire`
-   **Method**: `POST`
-   **Body** (JSON):
    ```json
    {
        "sleep_hours": 7.5,
        "exercise_minutes": 90,
        "screen_time_hours": 4,
        "water_glasses": 6,
        "fast_food_per_week": 2
    }
    ```
-   **Response**:
    ```json
    {
        "prediction_classe": 1,
        "probabilite": 85.5,
        "statut_sante": "Sain",
        "message_conseil": "Excellent travail ! ..."
    }
    ```

## 🧠 Model Training

The model logic and training scripts are located in the `../model` directory.

To retrain the model:
1.  **Generate Dataset**:
    ```bash
    python ../model/generate_dataset.py
    ```
2.  **Train Model**:
    ```bash
    python ../model/train_model.py
    ```
    This will update the `model/model.json` file used by this backend.

## ⚠️ Troubleshooting

-   **CORS Errors**: If you see CORS errors in the frontend, ensure `flask-cors` is installed and enabled in `app.py`.
-   **Model Not Found**: Ensure `model/model.json` exists. If not, run the training scripts.
-   **Connection Refused**: Ensure the frontend is connecting to `127.0.0.1:5000` and not `localhost:5000` if you experience IPv6 resolution issues.
