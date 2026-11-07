export type Project = {
    slug: string;
    title: string;
    shortDescription: string;
    category: string[];
    techStack: string[];
    problem: string;
    approach: string;
    resultsMetrics: string[];
    githubUrl?: string;
    demoUrl?: string;
    paperUrl?: string;
    images?: string[];
    isFlagship?: boolean;
};

export const projects: Project[] = [
    {
        slug: "ibis-2-0",
        title: "AI-Powered Bird Species Classification (IBIS 2.0)",
        shortDescription: "Bird-species classification system trained on 710GB of field imagery.",
        category: ["CV", "MLOps"],
        techStack: ["PyTorch", "Gradio", "ResNet"],
        problem: "Classifying 1,150 bird species from a 710GB unstructured image dataset.",
        approach: "Two-stage deep learning pipeline with custom preprocessing.",
        resultsMetrics: ["79% Validation Accuracy", "1,150 Species Covered"],
    },
    {
        slug: "fatigue-prediction",
        title: "Daily Fatigue Prediction",
        shortDescription: "Predicting daily fatigue scores from wearable sensor data.",
        category: ["Time-Series", "Health AI"],
        techStack: ["PyTorch", "CORAL Loss", "Runge-Kutta"],
        problem: "Quantifying daily fatigue using noisy wearable sensor data.",
        approach: "PyTorch model with CORAL ordinal logs and extensive feature engineering over 20 iterations.",
        resultsMetrics: ["0.25 MAE (down from 1.17)", "85% Accuracy", "78% MAE Reduction"],
    },
    {
        slug: "pdf-helper",
        title: "PDFhelper: Intelligent Document Retrieval",
        shortDescription: "RAG-based system for efficient document querying and management.",
        category: ["NLP", "RAG"],
        techStack: ["LLaMA 3.2", "Qdrant", "Hugging Face"],
        problem: "Efficiently retrieving context from large PDF repositories.",
        approach: "Vector search with Qdrant and LLaMA 3.2 embeddings.",
        resultsMetrics: ["Improved retrieval efficiency"],
    },
    {
        slug: "emotion-spotify",
        title: "Emotion-Driven Spotify Clone",
        shortDescription: "Music recommendation system based on facial emotion recognition.",
        category: ["CV", "App"],
        techStack: ["CNN", "React", "Python"],
        problem: "Static playlists don't match real-time user mood.",
        approach: "Facial emotion recognition CNN integrated with music recommendation engine.",
        resultsMetrics: ["95.83% Emotion Recognition Accuracy"],
    },
    {
        slug: "medcheck", title: "MedCheck: Vision-Assisted Medication Label Verification",
        shortDescription: "An OCR-first medication-label verifier built for HackRU 2026.",
        category: ["CV", "Health AI", "Applied AI"], techStack: ["React", "Flask", "FastAPI", "YOLO11n", "RapidOCR"],
        problem: "Help caregivers verify that a medication bottle matches the tracked prescription before a dose is logged.",
        approach: "Extract label fields, preserve confidence and source, compare name and strength, and require explicit confirmation for dose logging.",
        resultsMetrics: ["Working prototype", "OCR-first + human confirmation"], githubUrl: "https://github.com/Haadesx/HackRU26",
    },
    {
        slug: "carewatch", title: "CareWatch: A Computer Vision Safety Monitoring Prototype",
        shortDescription: "A hackathon prototype that turns pose and scene signals into short evidence clips for human review.",
        category: ["CV", "Health AI", "Applied AI"], techStack: ["Python", "React", "YOLOv8", "SQLite", "iOS"],
        problem: "Surface potentially concerning caregiver interactions for human review without claiming automated abuse detection.",
        approach: "Combine pose-based motion heuristics, scene verification, rolling 30-second clip capture, alert logging, and a review dashboard.",
        resultsMetrics: ["Bitcamp 2026 · Best Social Good Hack"], githubUrl: "https://github.com/Haadesx/EyeQ",
    },
    {
        slug: "payment-liveness", title: "Can't HackHer: Payment Liveness",
        shortDescription: "A hackathon payment-verification prototype with webcam liveness challenges and audit records.",
        category: ["CV", "App"], techStack: ["React", "TypeScript", "Python", "Solana"],
        problem: "Explore identity-verification workflows for bank and Solana payments.",
        approach: "Capture a webcam challenge, present verification scores, and support retry and audit workflows.",
        resultsMetrics: ["HackHERS 2026 · MLH Best Use of Solana"], githubUrl: "https://github.com/Haadesx/HackHers26",
    },
    {
        slug: "healthtwin", title: "HealthTwin by H-Swarm",
        shortDescription: "A healthcare decision workspace for evidence and scenario analysis.",
        category: ["Applied AI", "App"], techStack: ["FastAPI", "React", "Python"],
        problem: "Turn financial and operational evidence into structured healthcare scenarios.",
        approach: "An evidence-ingestion workflow with assumptions, scenarios, briefs, and evaluation scaffolding.",
        resultsMetrics: ["Deterministic demo workflow"], githubUrl: "https://github.com/Haadesx/H-Swarm",
    },
    {
        slug: "diffullm", title: "DiffuLLM: Training a Diffusion Language Model From Scratch",
        shortDescription: "A from-scratch discrete diffusion language model trained on recipe corpora.",
        category: ["NLP", "Research"], techStack: ["PyTorch", "Transformers", "D3PM", "DDP", "SLURM"],
        problem: "Explore parallel denoising as an alternative to left-to-right text generation.",
        approach: "A bidirectional transformer reconstructs masked text with an absorbing-mask discrete diffusion process, then iteratively unmasks a sequence.",
        resultsMetrics: ["500k+ training iterations", "D3PM-style absorbing-mask diffusion"], githubUrl: "https://github.com/Haadesx/Diffusion-Model", paperUrl: "https://github.com/Haadesx/Diffusion-Model/blob/main/report.pdf",
    },
    {
        slug: "iconoclast", title: "ICONOCLAST: Evaluating Targeted LLM Representation Edits",
        shortDescription: "A Python framework for measuring the utility cost of refusal-behavior edits in open-weight language models.",
        category: ["NLP", "Research"], techStack: ["Python", "PyTorch", "Hugging Face", "Optuna"],
        problem: "Study the trade-off between refusal behavior and benign capability in edited language models.",
        approach: "Contrastive residual activations, benign-subspace preservation, projection edits, and Optuna parameter search.",
        resultsMetrics: ["10 matched model comparisons", "6 released edit artifacts"], githubUrl: "https://github.com/Haadesx/Iconoclast",
    },
    {
        slug: "crucible", title: "Crucible",
        shortDescription: "A sandboxed adversarial evaluation harness for AI agent security.",
        category: ["AI Systems", "Security"], techStack: ["Python", "FastAPI", "React"],
        problem: "Evaluate agent defenses against evolving prompt-injection strategies without affecting real systems.",
        approach: "Red and blue strategies compete inside a sandbox with deterministic evaluation and fake tools.",
        resultsMetrics: ["Offline deterministic demo"], githubUrl: "https://github.com/Haadesx/Crucible",
    },
    {
        slug: "edge-ai", title: "Zypher EdgeAI Demo",
        shortDescription: "An embedded gesture-recognition demo running on an emulated Arm Cortex-M.",
        category: ["Edge AI", "MLOps"], techStack: ["Zephyr", "TensorFlow Lite Micro", "QEMU", "CMSIS-NN"],
        problem: "Make embedded inference observable and repeatable without requiring physical hardware.",
        approach: "Run quantized gesture recognition with RTOS threads, structured UART output and runtime diagnostics.",
        resultsMetrics: ["QEMU demo · mock sensor data"], githubUrl: "https://github.com/Haadesx/Zypher-EdgeAI-Demo",
    },
    {
        slug: "webgpu-edge-ai", title: "WebGPU Edge AI Benchmark",
        shortDescription: "A collaborative benchmark comparing in-browser quantized language models with cloud-hosted models.",
        category: ["Applied AI", "Research"], techStack: ["WebGPU", "WebLLM", "React", "TypeScript"],
        problem: "Compare the responsiveness and output quality of browser-based and cloud language-model inference.",
        approach: "Run a fixed prompt workload across inference paths and collect latency, throughput, quality, and memory estimates.",
        resultsMetrics: ["16-prompt benchmark workload", "Collaborative CS553 project"], githubUrl: "https://github.com/Haadesx/WebGPU_AI",
    },
    {
        slug: "lootqdm", title: "lootqdm: Training Loop Toolkit",
        shortDescription: "An open-source terminal interface for tracking machine-learning training with game-inspired progress and goals.",
        category: ["MLOps", "Open Source"], techStack: ["Python", "PyTorch", "Keras"],
        problem: "Make training-loop progress and metrics easier to follow in the terminal.",
        approach: "Track live metrics, configurable goals, and persistent profiles with integrations for PyTorch and Keras.",
        resultsMetrics: ["Published Python package"], githubUrl: "https://github.com/Haadesx/lootqdm",
    },
    {
        slug: "event-pose-estimation", title: "Event-Based Arm Pose Estimation",
        shortDescription: "A pipeline for estimating arm joints from event-camera point clouds.",
        category: ["CV", "Research"], techStack: ["Python", "PointNet", "MediaPipe"],
        problem: "Estimate arm joint positions from asynchronous event-camera data.",
        approach: "Generate pseudo-labels from source video and train a PointNet-based model for joint-coordinate regression.",
        resultsMetrics: ["DHP19 and MoCA datasets", "Pseudo-label-based evaluation"], githubUrl: "https://github.com/Haadesx/BIC-Pose-Estimation-Final",
    },
    {
        slug: "m-agent", title: "M-Agent: Agent Systems Control Plane",
        shortDescription: "A local tool for generating markdown-native workspaces and agent instruction bundles.",
        category: ["AI Systems", "Developer Tools"], techStack: ["JavaScript", "Python", "Markdown"],
        problem: "Organize product briefs and repository tasks into structured workspaces for coding agents.",
        approach: "Analyze a brief or repository and generate task breakdowns, agent files, and tool-specific integration bundles.",
        resultsMetrics: ["Local workspace generator"], githubUrl: "https://github.com/Haadesx/M-Agent",
    },

];
