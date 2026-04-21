export const portfolio = {
  name: "Varesh Patel",
  email: "workmailvaresh@gmail.com",
  phone: "+1-470-758-5500",
  headline:
    "Machine Learning Engineer · Applied AI · Computer Vision · Agentic Systems",
  avatar: "https://avatars.githubusercontent.com/u/128777625?v=4",
  summary:
    "I build applied ML systems where models, interfaces, and operational workflows all matter. My work spans computer vision, time-series modeling, agentic tooling, and shipping end-to-end products across Python backends, React frontends, and iOS clients.",
  links: {
    linkedin: "https://www.linkedin.com/in/vareshpatel/?skipRedirect=true",
    github: "https://github.com/Haadesx",
    resume: "/Varesh_Resume_ML.pdf",
  },
  education: [
    {
      school: "Rutgers University",
      degree: "M.S. in Computer Science",
      location: "New Brunswick, NJ",
      period: "September 2025 – May 2027 (Expected)",
    },
    {
      school: "G.H. Patel College of Engineering and Technology",
      degree: "B.Tech in Computer Science and Design",
      location: "Anand, Gujarat, India",
      period: "September 2021 – April 2025",
    },
  ],
  experience: [
    {
      company: "Foundation for Ecological Security",
      role: "Artificial Intelligence Intern",
      location: "India",
      period: "January 2025 – May 2025",
      highlights: [
        "Built a bird-species classification pipeline for IBIS 2.0 on a 710GB dataset spanning 1,150 species.",
        "Trained a two-stage computer vision system that reached 79% validation accuracy.",
        "Shipped the workflow through a Gradio GUI and CLI for biodiversity researchers.",
      ],
    },
    {
      company: "Arcascope",
      role: "Artificial Intelligence Intern",
      location: "United States",
      period: "October 2024 – January 2025",
      highlights: [
        "Iterated through 20 versions of a wearable-data fatigue prediction pipeline with physiological and temporal features.",
        "Reduced MAE by 78%, from 1.17 to 0.25.",
        "Reached 85% accuracy with a custom PyTorch ordinal regression model using CORAL layers and specialized losses.",
      ],
    },
  ],
  projects: [
    {
      name: "CareWatch (EyeQ)",
      tag: "Computer Vision · Safety",
      year: "2026",
      description:
        "An AI-powered caretaker abuse detection MVP using pose-based motion heuristics, Gemini scene verification, rolling evidence capture, and event logging.",
      stack: ["Python", "React", "SQLite", "iOS", "Computer Vision"],
      outcome:
        "Won Bitcamp 2026 2nd Prize and Best Social Good Hack while shipping a multi-surface monitoring product.",
    },
    {
      name: "Payment Liveness Platform",
      tag: "Identity · Payments",
      year: "2026",
      description:
        "A secure bank and Solana payment workflow with webcam liveness checks, deepfake detection, verification scoring, and retry-based decision flows.",
      stack: ["Python", "React", "TypeScript", "Solana", "iOS"],
      outcome:
        "Won Best Use Case of Solana API at HackHERS 2026.",
    },
    {
      name: "HealthTwin by H-Swarm",
      tag: "Agentic Systems · Applied AI",
      year: "2026",
      description:
        "A healthcare decision workspace that turns uploaded financial, operational, and market evidence into assumptions, scenarios, briefs, and capital memos.",
      stack: ["FastAPI", "React", "Shared packages", "Evaluation tooling"],
      outcome:
        "Structured as repeatable scenario analysis rather than a one-off AI demo.",
    },
  ],
  publications: [
    "OpenPose, PoseNet and MoveNet: The Evolution of Deep Learning Methods in Yoga Pose Classification — ICDAM 2025.",
    "Machine Learning-Based Hand Gesture Recognition for Immersive Gaming — IJIRMF 2024.",
    "Emotion-Aware Music Recommendations: Evaluating Custom CNN vs. VGG16 and Inception V3 — IEEE FMLDS 2024.",
  ],
  skillGroups: [
    {
      title: "Languages",
      items: ["Python", "C++", "Java", "Swift", "TypeScript", "JavaScript", "SQL"],
    },
    {
      title: "ML / AI",
      items: [
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
        "OpenCV",
        "Hugging Face",
        "Computer Vision",
        "RAG",
        "LLM applications",
      ],
    },
    {
      title: "Application Stack",
      items: ["FastAPI", "React", "Vite", "Docker", "SQLite", "Qdrant", "Gradio"],
    },
    {
      title: "Leadership",
      items: ["IEEE GCET Secretary", "Event operations", "Cross-team coordination"],
    },
  ],
  featuredRepos: [
    {
      name: "M-Agent",
      url: "https://github.com/Haadesx/M-Agent",
      description:
        "Markdown-native agent control plane for breaking product briefs or codebases into task agents.",
    },
    {
      name: "realtime-voice-csm",
      url: "https://github.com/Haadesx/realtime-voice-csm",
      description:
        "Real-time voice conversation system with web audio visualization and GPU acceleration.",
    },
    {
      name: "EyeQ",
      url: "https://github.com/Haadesx/EyeQ",
      description: "Hackathon project repository for the caretaker abuse detection system.",
    },
  ],
} as const;

export const systemContext = `
You are Varesh Patel speaking in first person through an AI portfolio.

Voice:
- concise, direct, credible
- warm but not overly casual
- answer like a strong candidate who has actually built the work
- avoid hype and avoid sounding like a generic assistant

Rules:
- stay grounded in the provided data
- if something is not in the portfolio data, say that directly instead of inventing it
- for recruiter-style questions, synthesize strengths clearly
- for project questions, emphasize problem, implementation, stack, and outcome
- when asked how to contact or find Varesh, include email, LinkedIn, GitHub, and resume link when relevant

Structured portfolio data:
${JSON.stringify(portfolio, null, 2)}
`;
