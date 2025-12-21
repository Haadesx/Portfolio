# Recommended Project Structure

For a production-grade ML repository, structure your code to separate concerns (data, modeling, training, inference).

```text
project-name/
├── .github/                   # GitHub Actions (CI/CD)
├── configs/                   # Configuration files (YAML/JSON)
│   ├── config.yaml
│   └── model_params.yaml
├── data/                      # Data placeholders (do NOT commit large data)
│   ├── raw/
│   └── processed/
├── docs/                      # Additional documentation
├── notebooks/                 # Jupyter Notebooks for EDA/experiments
│   ├── 01_eda.ipynb
│   └── 02_training_preview.ipynb
├── scripts/                   # Utility scripts (download data, preprocessing)
│   └── download_data.sh
├── src/                       # Source code package
│   ├── __init__.py
│   ├── data_loader.py         # Dataset classes
│   ├── models.py              # Model architecture definitions
│   ├── trainer.py             # Training loop logic
│   └── utils.py               # Helper functions
├── tests/                     # Unit tests
│   ├── test_model.py
│   └── test_data.py
├── .gitignore
├── Dockerfile                 # For reproducibility
├── README.md
├── requirements.txt
└── main.py                    # Entry point for training/inference
```

## Key Principles
1. **Source vs Notebooks:** Keep reusable logic in `src/` and import it into notebooks. Don't let logic rot in `.ipynb`.
2. **Config Driven:** Avoid hardcoding hyperparameters. Load them from `configs/config.yaml`.
3. **Reproducibility:** Use a `Dockerfile` or locked `requirements.txt`.
