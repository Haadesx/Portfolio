# Daily Fatigue Prediction from Wearable Data

[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Predicting subjective fatigue scores with 0.25 MAE using ordinal regression and physics-informed features.**

## 📌 Overview
Built during internship at **Arcascope**. We model daily fatigue using wearable sensor data (HRV, Sleep, Activity), integrating Circadian Rhythm physics (Runge-Kutta integration) into a Deep Ordinal Regression model.

## 📉 Impact
- **78% Reduction within MAE** (1.17 -> 0.25).
- **85% Accuracy** (within ±1 point on 1-10 scale).

## 🧠 Methodology
- **Model:** LSTM + CORAL (Consistent Rank Logits) Ordinal Head.
- **Loss:** `CornLoss` + `MSE`.
- **Features:** 40+ features including biological clock optimization.

## 🛠️ Usage

### Train Model
```bash
python src/train.py --config configs/lstm_coral.yaml
```

### Run Inference
```bash
python src/predict.py --user_data path/to/user.csv
```

## 🔗 Citation
```bibtex
@misc{patel2025fatigue,
  author = {Patel, Varesh},
  title = {Daily Fatigue Prediction},
  year = {2025}
}
```
