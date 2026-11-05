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
        shortDescription: "Enterprise-scale bird classification system handling 710GB of data.",
        category: ["CV", "MLOps"],
        techStack: ["PyTorch", "Gradio", "ResNet"],
        problem: "Classifying 1,150 bird species from a massive 710GB unstructured dataset.",
        approach: "Two-stage deep learning pipeline with custom preprocessing.",
        resultsMetrics: ["79% Validation Accuracy", "1,150 Species Covered"],
        isFlagship: true,
    },
    {
        slug: "fatigue-prediction",
        title: "Daily Fatigue Prediction",
        shortDescription: "Predicting daily fatigue scores from wearable data with high precision.",
        category: ["Time-Series", "Health AI"],
        techStack: ["PyTorch", "CORAL Loss", "Runge-Kutta"],
        problem: "Quantifying daily fatigue using noisy wearable sensor data.",
        approach: "PyTorch model with CORAL ordinal logs and extensive feature engineering over 20 iterations.",
        resultsMetrics: ["0.25 MAE (down from 1.17)", "85% Accuracy", "78% MAE Reduction"],
        isFlagship: true,
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
        isFlagship: true,
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
        isFlagship: true,
    },
    {
        slug: "medcheck", title: "MedCheck",
        shortDescription: "An OCR-first medication label verification prototype built for HackRU 2026.",
        category: ["CV", "Health AI", "App"], techStack: ["React", "FastAPI", "YOLO", "OCR"],
        problem: "Helping caregivers review medication labels against tracked prescriptions.",
        approach: "Extract label evidence, compare name and strength, and require explicit confirmation for dose logging.",
        resultsMetrics: ["Working prototype · iOS preview"], githubUrl: "https://github.com/Haadesx/HackRU26",
    },
    {
        slug: "carewatch", title: "CareWatch (EyeQ)",
        shortDescription: "A hackathon MVP exploring video-assisted caregiver safety monitoring.",
        category: ["CV", "Health AI", "App"], techStack: ["Python", "React", "YOLOv8", "SQLite"],
        problem: "Surface potentially concerning interactions for caregiver review.",
        approach: "Combine pose-based heuristics, vision model review, rolling clip capture and alert logging.",
        resultsMetrics: ["Bitcamp 2026 · 2nd Prize, Best Social Good Hack"], githubUrl: "https://github.com/Haadesx/EyeQ",
    },
    {
        slug: "payment-liveness", title: "Payment Liveness Platform",
        shortDescription: "A hackathon payment verification MVP with webcam liveness challenges.",
        category: ["CV", "App"], techStack: ["React", "TypeScript", "Python", "Solana"],
        problem: "Explore identity verification workflows for bank and Solana payments.",
        approach: "Capture a webcam challenge, present verification scores, and support retry and audit workflows.",
        resultsMetrics: ["HackHERS 2026 · Best Use Case of Solana API"], githubUrl: "https://github.com/Haadesx/HackHers26",
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
        slug: "diffullm", title: "DiffuLLM: Discrete Diffusion for Text",
        shortDescription: "A collaborative study of discrete diffusion language models trained on recipe corpora.",
        category: ["NLP", "Research"], techStack: ["PyTorch", "Transformers", "D3PM"],
        problem: "Explore parallel denoising as an alternative approach to text generation.",
        approach: "A bidirectional transformer reconstructs masked text with a discrete diffusion process.",
        resultsMetrics: ["500k+ training iterations", "Distributed training with PyTorch DDP and SLURM"], githubUrl: "https://github.com/Haadesx/Diffusion-Model",
    },
    {
        slug: "iconoclast", title: "ICONOCLAST: LLM Representation Editing",
        shortDescription: "A Python framework for studying refusal-behavior editing in open-weight language models.",
        category: ["NLP", "Research"], techStack: ["Python", "PyTorch", "Hugging Face", "Optuna"],
        problem: "Study the trade-off between refusal behavior and benign capability in edited language models.",
        approach: "Contrastive residual activations, benign-subspace preservation, projection edits, and parameter search.",
        resultsMetrics: ["10 matched model comparisons", "6 edited model artifacts released"], githubUrl: "https://github.com/Haadesx/Iconoclast",
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
