# IBIS 2.0: Intelligent Bird Species Classification

[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Gradio](https://img.shields.io/badge/Gradio-orange?logo=gradio&logoColor=white)](https://gradio.app/)

> **Enterprise-scale bird classification system handling 710GB of data across 1,150 species.**

## 📌 Problem
Ecological researchers at **Foundation for Ecological Security** process terabytes of field imagery manually. 
- **Scale:** 1,150 species.
- **Volume:** 710TB raw images.
- **Challenge:** High class imbalance and variable lighting conditions.

## 💡 Solution
We built a two-stage deep learning pipeline:
1. **Detection Head:** Locates bird regions.
2. **Classification Head:** ResNet-50 fine-tuned on custom species hierarchy.

**Outcome:** Replaced manual workflow, achieving **79% Validation Accuracy**.

## 📊 Results

| Metric | Score |
|:-------|:------|
| **Top-1 Accuracy** | 79.0% |
| **Top-5 Accuracy** | 92.0% |
| **F1-Score** | 0.76 |

## 🚀 Quickstart

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Download Weights
```bash
# Downloads pretrained ResNet50 weights from HF Hub
python scripts/download_weights.py --model ibis-resnet50
```

### 3. Run Inference GUI
```bash
python app.py
```
*Opens a local Gradio interface at http://127.0.0.1:7860*

### 4. CLI Batch Prediction
```bash
python predict.py --input_dir ./data/test_images --output_csv predictions.csv
```

## 📂 Data Setup
Due to size (710GB), full data is not included. 
- Run `python scripts/download_sample.py` to get a 1GB sample dataset.
