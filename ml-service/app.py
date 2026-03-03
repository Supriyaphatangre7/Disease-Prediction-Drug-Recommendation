# ==========================================================
# FINAL CLINICAL API
# PCOS + THYROID
# RESULT + PROBABILITY + DRUG + LIFESTYLE
# DYNAMIC FUSION ULTRASOUND + SYMPTOMS
# ==========================================================

import os
import joblib
import numpy as np
import pandas as pd
import tensorflow as tf
import cv2
import json

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

# ==========================================================
# PATH SETUP
# ==========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

# ==========================================================
# LOAD MODELS
# ==========================================================

# PCOS tabular model
pcos_model = joblib.load(os.path.join(MODEL_DIR, "pcos_model.pkl"))
pcos_imputer = joblib.load(os.path.join(MODEL_DIR, "pcos_imputer.pkl"))
pcos_scaler = joblib.load(os.path.join(MODEL_DIR, "pcos_scaler.pkl"))
pcos_features = joblib.load(os.path.join(MODEL_DIR, "pcos_features.pkl"))

# Thyroid model
thyroid_model = joblib.load(os.path.join(MODEL_DIR, "thyroid_model.pkl"))
thyroid_imputer = joblib.load(os.path.join(MODEL_DIR, "thyroid_imputer.pkl"))
thyroid_scaler = joblib.load(os.path.join(MODEL_DIR, "thyroid_scaler.pkl"))
thyroid_features = joblib.load(os.path.join(MODEL_DIR, "thyroid_features.pkl"))

# PCOS ultrasound CNN
ultrasound_model = None
ultrasound_path = os.path.join(MODEL_DIR, "ultrasound_cnn.h5")
if os.path.exists(ultrasound_path):
    ultrasound_model = tf.keras.models.load_model(ultrasound_path)

# ==========================================================
# FASTAPI INIT
# ==========================================================

app = FastAPI(title="Clinical Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# HELPER FUNCTIONS
# ==========================================================

def preprocess_tabular(data: dict, feature_list, imputer, scaler):
    df = pd.DataFrame([data])
    for col in feature_list:
        if col not in df.columns:
            df[col] = np.nan
    df = df[feature_list]
    df = df.apply(pd.to_numeric, errors="coerce")
    X = imputer.transform(df)
    X = scaler.transform(X)
    return X

def preprocess_ultrasound(file_bytes):
    npimg = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (128, 128))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# ==========================================================
# DRUG + LIFESTYLE RULE ENGINE
# ==========================================================

def thyroid_recommendation(result):
    if result == "Hypothyroid":
        return {
            "drug": "Levothyroxine (Doctor supervised dosage required)",
            "lifestyle": [
                "Increase iodine intake (if deficient)",
                "Regular thyroid monitoring",
                "Maintain healthy weight",
                "Avoid soy & processed foods"
            ]
        }
    elif result == "Hyperthyroid":
        return {
            "drug": "Methimazole or Propylthiouracil (Doctor supervision required)",
            "lifestyle": [
                "Reduce iodine-rich food",
                "Avoid stress",
                "Limit caffeine",
                "Regular endocrinologist checkup"
            ]
        }
    else:
        return {
            "drug": "No medication required",
            "lifestyle": [
                "Maintain balanced diet",
                "Regular annual thyroid test",
                "Exercise regularly"
            ]
        }

def pcos_recommendation(result):
    if result == "PCOS Detected":
        return {
            "drug": "Metformin + Oral Contraceptive Pills (if prescribed)",
            "lifestyle": [
                "Weight reduction",
                "Low carb diet",
                "Regular exercise (30 min/day)",
                "Reduce sugar intake",
                "Stress management"
            ]
        }
    else:
        return {
            "drug": "No medication required",
            "lifestyle": [
                "Maintain healthy BMI",
                "Balanced diet",
                "Regular menstrual monitoring"
            ]
        }

# ==========================================================
# PCOS ENDPOINT
# ==========================================================

@app.post("/predict/pcos")
async def predict_pcos(
    symptoms: Optional[str] = Form(None),
    ultrasound: Optional[UploadFile] = File(None),
    eval_mode: Optional[bool] = Form(False)
):
    try:
        # -------------------------
        # Symptom prediction
        # -------------------------
        symptom_prob = None
        if symptoms:
            symptom_data = json.loads(symptoms)
            X = preprocess_tabular(
                symptom_data,
                pcos_features,
                pcos_imputer,
                pcos_scaler
            )
            symptom_prob = float(pcos_model.predict_proba(X)[0][1])

        # -------------------------
        # Ultrasound prediction
        # -------------------------
        image_prob = None
        if ultrasound is not None and ultrasound_model is not None:
            image_bytes = await ultrasound.read()
            img = preprocess_ultrasound(image_bytes)
            image_prob = float(ultrasound_model.predict(img)[0][0])

        # -------------------------
        # Dynamic fusion
        # -------------------------
        if symptom_prob is not None and image_prob is not None:
            final_prob = 0.5 * symptom_prob + 0.5 * image_prob
        elif image_prob is not None:
            final_prob = image_prob
        elif symptom_prob is not None:
            final_prob = symptom_prob
        else:
            return {"error": "No symptoms or ultrasound provided"}

        # -------------------------
        # Decide result
        # -------------------------
        result = "PCOS Detected" if final_prob >= 0.5 else "PCOS Not Detected"
        recommendation = pcos_recommendation(result)

        # -------------------------
        # Optional evaluation mode
        # -------------------------
        eval_metrics = None
        if eval_mode and ultrasound_model is not None:
            import glob
            from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

            y_true, y_pred_list = [], []
            all_images = glob.glob(os.path.join(MODEL_DIR, "images", "**", "*.jpg"), recursive=True)
            for img_path in all_images:
                label = 1 if "infected" in img_path.lower() else 0
                y_true.append(label)

                img_cv = cv2.imread(img_path)
                img_cv = cv2.resize(img_cv, (128,128))
                img_cv = img_cv / 255.0
                img_cv = np.expand_dims(img_cv, axis=0)

                pred_prob = float(ultrasound_model.predict(img_cv)[0][0])
                pred_label = 1 if pred_prob >= 0.5 else 0
                y_pred_list.append(pred_label)

            eval_metrics = {
                "accuracy": round(accuracy_score(y_true, y_pred_list),4),
                "classification_report": classification_report(
                    y_true, y_pred_list, target_names=["Not Infected","Infected"], output_dict=True
                ),
                "confusion_matrix": confusion_matrix(y_true, y_pred_list).tolist()
            }

        # -------------------------
        # Return response
        # -------------------------
        response = {
            "result": result,
            "symptom_prob": round(symptom_prob,4) if symptom_prob is not None else None,
            "image_prob": round(image_prob,4) if image_prob is not None else None,
            "final_prob": round(final_prob,4),
            "drug_recommendation": recommendation["drug"],
            "lifestyle_recommendation": recommendation["lifestyle"]
        }

        if eval_metrics:
            response["ultrasound_eval"] = eval_metrics

        return response

    except Exception as e:
        return {"error": str(e)}

# ==========================================================
# THYROID ENDPOINT
# ==========================================================

@app.post("/predict/thyroid")
async def predict_thyroid(data: dict):
    try:
        tsh_value = float(data.get("TSH", 0))

        if tsh_value > 6:
            result = "Hypothyroid"
            probability = 0.99
        elif tsh_value < 0.3:
            result = "Hyperthyroid"
            probability = 0.99
        else:
            X = preprocess_tabular(
                data,
                thyroid_features,
                thyroid_imputer,
                thyroid_scaler
            )
            probs = thyroid_model.predict_proba(X)[0]
            predicted_class = int(np.argmax(probs))
            mapping = {0: "Normal", 1: "Hypothyroid", 2: "Hyperthyroid"}
            result = mapping[predicted_class]
            probability = float(np.max(probs))

        recommendation = thyroid_recommendation(result)

        return {
            "result": result,
            "probability": round(probability, 4),
            "drug_recommendation": recommendation["drug"],
            "lifestyle_recommendation": recommendation["lifestyle"]
        }

    except Exception as e:
        return {"error": str(e)}

# ==========================================================
# ROOT
# ==========================================================

@app.get("/")
def home():
    return {"message": "Clinical PCOS + Thyroid API Running Successfully"}