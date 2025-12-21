# Reproducibility Checklist

Before making a repo public/flagship, ensure:

- [ ] **Dependency Management:**
  - [ ] `requirements.txt` is present and clean (use `pip freeze > requirements.txt` in a fresh venv).
  - [ ] Optional: `environment.yml` for Conda users.
  - [ ] Optional: `Dockerfile` for full environment replication.

- [ ] **Data Access:**
  - [ ] Is the data public? If yes, provide a download script (`scripts/download_data.sh`) or link.
  - [ ] If private, provide a small "sample" dataset in `data/sample/` so code can run.

- [ ] **Model Weights:**
  - [ ] Are pre-trained weights available? (Host on Hugging Face Hub or Google Drive).
  - [ ] Provide a script to download weights automatically.

- [ ] **Seeding:**
  - [ ] Are random seeds fixed for reproducibility? (`torch.manual_seed`, `np.random.seed`, etc.)

- [ ] **Entry Points:**
  - [ ] Does `python main.py` work out of the box? (or strict instructions).
  - [ ] Is there a CLI argument parser? (e.g., `argparse` or `hydra`).

- [ ] **Documentation:**
  - [ ] Does README have a clear "Quickstart" section?
  - [ ] proper citation info?
