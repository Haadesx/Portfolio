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
        githubUrl: "https://github.com/Haadesx/ibis-classification",
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
        githubUrl: "https://github.com/Haadesx/fatigue-prediction",
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
        githubUrl: "https://github.com/Haadesx/PDFhelper",
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
        githubUrl: "https://github.com/Haadesx/emotion-music-player",
        isFlagship: true,
    },
];
