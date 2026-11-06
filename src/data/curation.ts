export type FlagshipFact = {
  value: string;
  label: string;
};

export type FlagshipCuration = {
  slug: string;
  label: string;
  capability: string;
  thesis: string;
  problem: string;
  contribution: string;
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
    capability: "Model training from scratch, distributed GPU infrastructure, and failure-aware evaluation.",
    thesis:
      "A from-scratch discrete diffusion language model, trained and evaluated as an alternative to left-to-right text generation.",
    problem:
      "Autoregressive generation is the default for text. Can a bidirectional model learn language by denoising masked tokens in parallel?",
    contribution:
      "Designed and built the DiffuLLM system: a bidirectional Transformer, D3PM-style absorbing-mask corruption, masked reconstruction, iterative unmasking, DDP/SLURM training, checkpointing, and qualitative evaluation. The comparative study also includes two independently built SEDD systems by collaborators.",
    method:
      "Absorbing [MASK] corruption, logit-normal timestep sampling, masked-only cross-entropy, and confidence-based unmasking from a fully masked sequence.",
    evaluation:
      "The selected checkpoint (best_step503000.pt) was evaluated on structured recipe completion. Short and medium generations stay coherent; longer outputs show repetition, malformed control tokens, and drift. The README's comparison table also references a 1.2M-step run, so the page treats 503k as the evaluated checkpoint until that discrepancy is reconciled.",
    limitation:
      "A recipe-domain research study with qualitative evaluation, not a broad benchmark or a production model. The 1.2M-step figure is not used as a headline result.",
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
    capability: "Real-time computer vision, multimodal verification, and human-in-the-loop product design.",
    thesis:
      "A human-in-the-loop safety prototype that turns pose and scene signals into short evidence clips for review.",
    problem:
      "Caregivers cannot monitor hours of footage. The prototype explores how computer vision could surface potentially concerning interactions without claiming to detect abuse automatically.",
    contribution:
      "Hackathon team build. I worked across the pose-heuristic pipeline, evidence capture, and review workflow, while teammates contributed to the surrounding app and iOS client. The repository is the source of truth for the combined implementation.",
    method:
      "YOLOv8 pose and person tracking, proximity and fast-motion heuristics, hosted or local scene verification, a rolling 30-second frame buffer, SQLite event logging, push alerts, a React dashboard, and an iOS guardian client.",
    evaluation:
      "Externally recognized with Bitcamp 2026's Best Social Good Hack on Devpost. The result is a staged prototype, not a validated detector: there are no published precision, recall, sensitivity, or false-positive figures.",
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
    capability: "Controlled representation experiments, optimization, and utility-aware model evaluation.",
    thesis:
      "A representation-editing framework that measures the utility cost of changing model behavior, rather than treating refusal removal as a single number.",
    problem:
      "Directional abliteration can remove refusals while damaging benign behavior. Can a benign-subspace-preserving edit reduce that collateral damage?",
    contribution:
      "Built the Python framework: contrastive residual activation analysis, per-layer direction estimation, benign PCA subspace projection, LoRA edits, Optuna parameter search, a holdout evaluator, a CLI, tests, and released model artifacts. The original research workspace lives in NLP_Project.",
    method:
      "Residual activations from harmful and benign prompts, mean/median/variance/hybrid direction estimators, benign-subspace projection, rank-one or low-rank LoRA edits, and holdout evaluation over 20 harmful and 64 benign prompts with first-token KL.",
    evaluation:
      "Ten matched open-weight comparisons. The repository's selection rule — fewer harmful refusals, then fewer overrefusals, then lower KL — favors ICONOCLAST in all ten, with lower KL in eight. The tradeoffs remain visible: Falcon3 is a behavior win but a KL outlier (6.1448 vs 0.1648), and Yi-1.5 has lower KL under HERETIC. Treat this as optimized holdout benchmarking, not broad statistical confirmation.",
    limitation:
      "No large-N evaluator outputs were available, and the framework changes refusal behavior rather than providing a safety guarantee. It is not a universal intelligence-preservation claim.",
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
    "An OCR-first medication-label verifier designed around uncertainty, provenance, and human confirmation.",
  problem:
    "A caregiver needs to know whether a bottle matches a tracked prescription — and whether a dose is actually due — without treating a model as the authority.",
  contribution:
    "Originated and directed the project, set the OCR-first architecture and safety invariants, and coordinated integration across the React dashboard, Flask/TimescaleDB backend, and inference services. Teammates and agent-assisted implementation contributed parts of the codebase; the repository's provenance docs record that split.",
  method:
    "YOLO11n bottle detection, RapidOCR multi-frame extraction, structured fields with confidence and source metadata, conditional Qwen3-VL escalation, explicit caregiver confirmation, and backend-owned dose and inventory rules.",
  evaluation:
    "The release manifest reports 523 inference and 81 backend tests at commit 57eb80b; those numbers were not re-executed for this portfolio build. A UI-only mock mode is documented separately. There is no clinical validation.",
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
    note: "Externally verified on Devpost.",
  },
  {
    event: "HackHERS 2026",
    award: "MLH Best Use of Solana",
    project: "Can't HackHer",
    slug: "payment-liveness",
    source: "https://devpost.com/software/can-t-hackher",
    note: "Externally verified on Devpost.",
  },
];

export type OpenSourceItem = {
  name: string;
  meta: string;
  blurb: string;
  slug: string;
  external?: string;
  externalLabel?: string;
};

export const openSourceHighlights: OpenSourceItem[] = [
  {
    name: "lootqdm",
    meta: "PYPI / ML TOOLING",
    blurb:
      "A published training-loop toolkit that maps progress, metrics, goals, and run profiles into a terminal interface, with PyTorch and Keras integrations and tests.",
    slug: "lootqdm",
    external: "https://pypi.org/project/lootqdm/",
    externalLabel: "PyPI",
  },
  {
    name: "Zypher EdgeAI",
    meta: "EMBEDDED ML",
    blurb:
      "A Zephyr / TensorFlow Lite Micro gesture-recognition pipeline with INT8 quantization, CMSIS-NN, RTOS thread diagnostics, and a documented stack-overflow debugging story. The public demo runs in QEMU with mock sensor data.",
    slug: "edge-ai",
    external: "https://github.com/Haadesx/Zypher-EdgeAI-Demo",
    externalLabel: "GitHub",
  },
  {
    name: "WebGPU Edge AI",
    meta: "INFERENCE SYSTEMS",
    blurb:
      "A collaborative 16-prompt benchmark comparing browser-local quantized LLM inference with cloud-hosted inference across latency, throughput, memory, and output quality.",
    slug: "webgpu-edge-ai",
    external: "https://github.com/Haadesx/WebGPU_AI",
    externalLabel: "GitHub",
  },
  {
    name: "Event-Based Arm Pose",
    meta: "COMPUTER VISION RESEARCH",
    blurb:
      "A pipeline for arm-joint regression from event-camera point clouds, using MediaPipe pseudo-labels and a PointNet-based model over DHP19 and MoCA workflows.",
    slug: "event-pose-estimation",
    external: "https://github.com/Haadesx/BIC-Pose-Estimation-Final",
    externalLabel: "GitHub",
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

export const furtherWorkSlugs = ["crucible", "m-agent", "healthtwin"];
