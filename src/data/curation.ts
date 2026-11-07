export type FlagshipFact = {
  value: string;
  label: string;
};

export type FlagshipCuration = {
  slug: string;
  label: string;
  thesis: string;
  contribution: string;
  differentiator: string;
  method: string;
  evaluation: string;
  limitation: string;
  facts: FlagshipFact[];
  diagram: "diffusion" | "carewatch" | "representation";
};

export const featuredFlagships: FlagshipCuration[] = [
  {
    slug: "diffullm",
    label: "Deep Learning / Generative Models / Research",
    thesis:
      "A discrete diffusion language model built from scratch, trained to generate text by denoising masked tokens instead of predicting one token at a time.",
    contribution:
      "I built the model and training stack: a bidirectional Transformer, D3PM-style absorbing-mask corruption, iterative unmasking, DDP/SLURM training, checkpointing, and the qualitative evaluation. The two SEDD comparison systems were built by collaborators.",
    differentiator:
      "Every token is denoised in parallel, so generation starts from a fully masked sequence and resolves all positions at once rather than left to right.",
    method:
      "Absorbing [MASK] corruption, logit-normal timestep sampling, masked-only cross-entropy, and confidence-based unmasking from a fully masked sequence.",
    evaluation:
      "The evaluated checkpoint (best_step503000.pt) was tested on structured recipe completion. Short and medium outputs stay coherent; longer ones repeat, leak malformed control tokens, and drift. The README also references a 1.2M-step run, so the page keeps 503k as the evaluated checkpoint until that discrepancy is reconciled.",
    limitation:
      "A recipe-domain research study with qualitative evaluation. It is not a broad benchmark or a production model, and the 1.2M-step figure is not used as a headline result.",
    facts: [
      { value: "500k+", label: "TRAINING ITERATIONS" },
      { value: "D3PM", label: "ABSORBING-MASK DIFFUSION" },
      { value: "DDP", label: "SLURM CLUSTER TRAINING" },
    ],
    diagram: "diffusion",
  },
  {
    slug: "carewatch",
    label: "Computer Vision / Applied AI / Hackathon",
    thesis:
      "A human-in-the-loop safety prototype that turns pose and scene signals into short clips a caregiver can review.",
    contribution:
      "Hackathon team build. I worked on the pose heuristics, evidence capture, and review flow. Teammates built the surrounding app and the iOS client, and the repository is the source of truth for the combined implementation.",
    differentiator:
      "A rolling 30-second buffer means an alert arrives with the footage that triggered it, not a bare score.",
    method:
      "YOLOv8 pose and person tracking, proximity and fast-motion heuristics, hosted or local scene verification, a rolling 30-second frame buffer, SQLite event logging, push alerts, a React dashboard, and an iOS guardian client.",
    evaluation:
      "Externally recognized with Bitcamp 2026's Best Social Good Hack on Devpost. It is a staged prototype, not a validated detector: there are no published precision, recall, sensitivity, or false-positive figures.",
    limitation:
      "A scan or alert is evidence for human review, not proof of abuse. Camera conditions, staged demos, and false positives limit what the prototype establishes.",
    facts: [
      { value: "YOLOv8", label: "POSE ESTIMATION" },
      { value: "30 SEC", label: "ROLLING EVIDENCE BUFFER" },
      { value: "BITCAMP", label: "BEST SOCIAL GOOD HACK" },
    ],
    diagram: "carewatch",
  },
  {
    slug: "iconoclast",
    label: "LLM Research / Representation Learning / Evaluation",
    thesis:
      "A framework for editing refusal behavior in open-weight language models while measuring the collateral cost, not only the refusal count.",
    contribution:
      "I built the Python framework: contrastive residual activation analysis, per-layer direction estimation, benign-subspace projection, LoRA edits, Optuna parameter search, a holdout evaluator, a CLI, tests, and the released model artifacts. The original research workspace lives in NLP_Project.",
    differentiator:
      "The edit preserves a benign-activation subspace, so removing refusals can cost less capability than a plain directional edit.",
    method:
      "Residual activations from harmful and benign prompts, mean/median/variance/hybrid direction estimators, benign-subspace projection, rank-one or low-rank LoRA edits, and holdout evaluation over 20 harmful and 64 benign prompts with first-token KL.",
    evaluation:
      "Ten matched open-weight comparisons. Under the repository's selection rule (fewer harmful refusals, then fewer overrefusals, then lower KL), ICONOCLAST wins all ten and has lower KL in eight. The tradeoffs stay visible: Falcon3 is a behavior win but a KL outlier (6.1448 vs 0.1648), and Yi-1.5 has lower KL under HERETIC. Treat it as optimized holdout benchmarking, not broad statistical confirmation.",
    limitation:
      "No large-N evaluator outputs were available. The framework changes refusal behavior; it is not a safety guarantee or a universal intelligence-preservation claim.",
    facts: [
      { value: "10", label: "MATCHED MODEL COMPARISONS" },
      { value: "6", label: "RELEASED EDIT ARTIFACTS" },
      { value: "OPTUNA", label: "PARAMETER SEARCH" },
    ],
    diagram: "representation",
  },
];

export const medcheckSpotlight = {
  slug: "medcheck",
  label: "Recent Applied CV / HackRU 2026",
  thesis:
    "An OCR-first medication-label checker built around uncertainty, provenance, and human confirmation.",
  contribution:
    "I originated the project, set the OCR-first architecture and safety rules, and coordinated integration across the React dashboard, Flask/TimescaleDB backend, and inference services. Teammates and agent-assisted implementation contributed parts of the codebase; the repository's provenance docs record that split.",
  evaluation:
    "The release manifest reports 523 inference and 81 backend tests at commit 57eb80b, though those numbers were not re-executed for this portfolio build. There is no clinical validation.",
  limitation:
    "A label scan is evidence about a bottle, not proof of ingestion. The repository documents a working prototype; it is not a clinical decision system or a hosted medication service.",
  facts: [
    { value: "YOLO11n", label: "BOTTLE DETECTION" },
    { value: "RapidOCR", label: "MULTI-FRAME OCR" },
    { value: "HUMAN", label: "CONFIRMATION REQUIRED" },
  ],
};

export type Award = {
  event: string;
  award: string;
  project: string;
  slug: string;
  source: string;
  note: string;
};

export const awards: Award[] = [
  {
    event: "Bitcamp 2026",
    award: "Best Social Good Hack",
    project: "CareWatch / EyeQ",
    slug: "carewatch",
    source: "https://devpost.com/software/eyeq-0c8wdl",
    note: "Verified on Devpost.",
  },
  {
    event: "HackHERS 2026",
    award: "MLH Best Use of Solana",
    project: "Can't HackHer",
    slug: "payment-liveness",
    source: "https://devpost.com/software/can-t-hackher",
    note: "Verified on Devpost.",
  },
];

export type ArchiveGroup = {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
};

export const archiveGroups: ArchiveGroup[] = [
  {
    id: "selected",
    title: "Selected work",
    blurb: "The systems that best represent trained models, computer vision, and evaluated AI.",
    slugs: ["diffullm", "carewatch", "iconoclast", "medcheck"],
  },
  {
    id: "research",
    title: "Machine learning & research",
    blurb: "Model training, evaluation, and inference studies beyond the homepage flagships.",
    slugs: ["event-pose-estimation", "webgpu-edge-ai", "fatigue-prediction"],
  },
  {
    id: "vision",
    title: "Computer vision",
    blurb: "Earlier applied vision work at research scale, with its validation context preserved.",
    slugs: ["ibis-2-0"],
  },
  {
    id: "applied",
    title: "Applied AI & products",
    blurb: "Interfaces and workflows where the model has to operate inside a real product shape.",
    slugs: ["payment-liveness", "healthtwin"],
  },
  {
    id: "systems",
    title: "AI systems & developer tools",
    blurb: "Evaluation harnesses, embedded inference, and tooling for agentic and ML workflows.",
    slugs: ["crucible", "edge-ai", "m-agent"],
  },
  {
    id: "open-source",
    title: "Open source",
    blurb: "Released software with an install path beyond the portfolio.",
    slugs: ["lootqdm"],
  },
  {
    id: "earlier",
    title: "Earlier work",
    blurb: "Earlier applied builds retained for context and continuity.",
    slugs: ["pdf-helper", "emotion-spotify"],
  },
];
