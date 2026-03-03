
# PCOS SYMPTOM MODEL TRAINING 

import os
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier

# ==========================================================
# PATH SETTINGS (UPDATED)
# ==========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, "model", "combined.csv")
SAVE_DIR = os.path.join(BASE_DIR, "model")

os.makedirs(SAVE_DIR, exist_ok=True)

# ==========================================================
# LOAD DATA
# ==========================================================

df = pd.read_csv(DATA_PATH)
df.columns = df.columns.str.strip()

label_col = "PCOS (Y/N)"

selected_features = [
    "Age (yrs)",
    "Weight (Kg)",
    "Height(Cm)",
    "BMI",
    "Cycle(R/I)",
    "Cycle length(days)",
    "Marraige Status (Yrs)",
    "Pregnant(Y/N)",
    "No. of abortions",
    "AMH(ng/mL)",
    "TSH (mIU/L)",
    "FSH(mIU/mL)",
    "LH(mIU/mL)",
    "Weight gain(Y/N)",
    "hair growth(Y/N)",
    "Pimples(Y/N)",
    "Hair loss(Y/N)",
    "Skin darkening (Y/N)",
    "Fast food (Y/N)",
    "Reg.Exercise(Y/N)"
]

df = df[selected_features + [label_col]]

for col in df.columns:
    df[col] = pd.to_numeric(df[col], errors="coerce")

df = df.dropna(subset=[label_col])

X = df[selected_features]
y = df[label_col]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Impute
imputer = SimpleImputer(strategy="median")
X_train = imputer.fit_transform(X_train)
X_test = imputer.transform(X_test)

# Scale
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = XGBClassifier(
    n_estimators=300,
    max_depth=5,
    learning_rate=0.05,
    random_state=42,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save models
joblib.dump(model, os.path.join(SAVE_DIR, "pcos_model.pkl"))
joblib.dump(imputer, os.path.join(SAVE_DIR, "pcos_imputer.pkl"))
joblib.dump(scaler, os.path.join(SAVE_DIR, "pcos_scaler.pkl"))
joblib.dump(selected_features, os.path.join(SAVE_DIR, "pcos_features.pkl"))

print("✅ PCOS 20-feature model saved successfully!")