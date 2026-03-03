# ==========================================================
# 🏥 CLEAN 20-FEATURE THYROID MODEL (MSc READY)
# ==========================================================

import pandas as pd
import numpy as np
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report, accuracy_score
from xgboost import XGBClassifier

# ==========================================================
# PATHS – Everything inside the 'model' folder
# ==========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# model folder inside ml-service
MODEL_DIR = os.path.join(BASE_DIR, "model")

# CSV file inside model folder
DATA_PATH = os.path.join(MODEL_DIR, "thyroidDF.csv")

# Create model folder if not exists
os.makedirs(MODEL_DIR, exist_ok=True)

# ==========================================================
# LOAD DATA
# ==========================================================

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(
        f"Thyroid data not found at {DATA_PATH}. "
        "Please place thyroidDF.csv inside the 'model' folder."
    )

print("Loading thyroid dataset...")
df = pd.read_csv(DATA_PATH)
df.columns = df.columns.str.strip()
print("Dataset shape:", df.shape)

# ==========================================================
# SELECT CLEAN 20 FEATURES
# ==========================================================

selected_features = [
    "age",
    "sex",
    "TSH",
    "T3",
    "TT4",
    "T4U",
    "FTI",
    "on_thyroxine",
    "on_antithyroid_meds",
    "I131_treatment",
    "thyroid_surgery",
    "goitre",
    "tumor",
    "hypopituitary",
    "query_hypothyroid",
    "query_hyperthyroid",
    "sick",
    "pregnant",
    "lithium",
    "psych"
]

# Keep only selected features
df = df[selected_features].copy()

# ==========================================================
# CONVERT ALL TO NUMERIC
# ==========================================================

for col in df.columns:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# ==========================================================
# CREATE TARGET USING TSH
# 0 = Normal
# 1 = Hypothyroid
# 2 = Hyperthyroid
# ==========================================================

df = df.dropna(subset=["TSH"])

df["target"] = np.where(
    df["TSH"] > 4.5, 1,
    np.where(df["TSH"] < 0.4, 2, 0)
)

df["target"] = df["target"].astype(int)

print("\nClass distribution:")
print(df["target"].value_counts())

# ==========================================================
# DEFINE X AND y
# ==========================================================

X = df[selected_features]
y = df["target"]

feature_names = X.columns.tolist()

# ==========================================================
# HANDLE MISSING VALUES
# ==========================================================

imputer = SimpleImputer(strategy="median")
X_imputed = imputer.fit_transform(X)

# ==========================================================
# SCALE FEATURES
# ==========================================================

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_imputed)

# ==========================================================
# TRAIN TEST SPLIT
# ==========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining thyroid model...")

# ==========================================================
# XGBOOST MODEL
# ==========================================================

model = XGBClassifier(
    n_estimators=400,
    max_depth=5,
    learning_rate=0.05,
    random_state=42,
    eval_metric="mlogloss"
)

model.fit(X_train, y_train)

print("Model trained successfully")

# ==========================================================
# EVALUATE
# ==========================================================

pred = model.predict(X_test)
acc = accuracy_score(y_test, pred)

print("\nFINAL ACCURACY:", acc)
print(classification_report(y_test, pred))

# ==========================================================
# SAVE MODEL FILES (all inside model folder)
# ==========================================================

joblib.dump(model, os.path.join(MODEL_DIR, "thyroid_model.pkl"))
joblib.dump(imputer, os.path.join(MODEL_DIR, "thyroid_imputer.pkl"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "thyroid_scaler.pkl"))
joblib.dump(feature_names, os.path.join(MODEL_DIR, "thyroid_features.pkl"))

print("\n✅ CLEAN THYROID MODEL SAVED SUCCESSFULLY")
print(f"All files are in: {MODEL_DIR}")