# ==========================================================
# PCOS ULTRASOUND CNN TRAINING (FINAL - ML-SERVICE/MODEL)
# ==========================================================

import os
import cv2
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

print("Loading CSV...")

# ==========================================================
# PATH SETUP
# ==========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

CSV_PATH = os.path.join(MODEL_DIR, "combined.csv")
IMAGE_DIR = os.path.join(MODEL_DIR, "images")

SAVE_PATH = os.path.join(MODEL_DIR, "ultrasound_cnn.h5")

# ==========================================================
# LOAD CSV
# ==========================================================

df = pd.read_csv(CSV_PATH)
df = df.dropna()

image_paths = df.iloc[:, -1].values

print("Loading images...")

IMG_SIZE = 128
X = []
y = []

for img_path in image_paths:

    # If CSV contains relative paths, fix them
    if not os.path.isabs(img_path):
        img_path = os.path.join(MODEL_DIR, img_path)

    if not os.path.exists(img_path):
        continue

    img = cv2.imread(img_path)
    if img is None:
        continue

    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0

    # ===============================
    # LABEL MAPPING FROM FOLDER NAME
    # ===============================

    path_lower = img_path.lower()

    if "notinfected" in path_lower:
        label = 0
    elif "infected" in path_lower:
        label = 1
    else:
        continue

    X.append(img)
    y.append(label)

X = np.array(X)
y = np.array(y)

print("Total images loaded:", len(X))

# ==========================================================
# TRAIN TEST SPLIT
# ==========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Train:", X_train.shape)
print("Test:", X_test.shape)

# ==========================================================
# CNN MODEL
# ==========================================================

print("Building CNN model...")

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3,3), activation="relu", input_shape=(128,128,3)),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(64, (3,3), activation="relu"),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(128, (3,3), activation="relu"),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# ==========================================================
# TRAIN MODEL
# ==========================================================

print("\nTraining started...\n")

history = model.fit(
    X_train, y_train,
    validation_data=(X_test, y_test),
    epochs=15,
    batch_size=16
)

# ==========================================================
# FINAL EVALUATION
# ==========================================================

y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int).reshape(-1)

acc = accuracy_score(y_test, y_pred)
print(f"\nFINAL ACCURACY: {acc*100:.2f}%\n")

print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=["Not Infected", "Infected"]))

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ==========================================================
# SAVE MODEL
# ==========================================================

model.save(SAVE_PATH)

print("\n✅ ULTRASOUND CNN MODEL TRAINED AND SAVED SUCCESSFULLY!")
print(f"All files are in: {MODEL_DIR}")