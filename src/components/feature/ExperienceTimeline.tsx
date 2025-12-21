

type Experience = {
    company: string;
    role: string;
    period: string;
    description: string[];
};

const experiences: Experience[] = [
    {
        company: "Foundation for Ecological Security",
        role: "AI Intern",
        period: "Jan 2025 – May 2025",
        description: [
            "Built AI bird classification system for IBIS 2.0; handled ~710GB image dataset, ~1,150 species.",
            "Developed a two-stage deep learning pipeline achieving ~79% validation accuracy.",
            "Delivered GUI/CLI via Gradio for researchers."
        ],
    },
    {
        company: "Arcascope",
        role: "AI Intern",
        period: "Oct 2024 – Jan 2025",
        description: [
            "Built fatigue prediction ML pipeline across ~20 iterations; achieved ~85% accuracy and ~0.25 MAE.",
            "Improved MAE by ~78% (1.17 → 0.25) using PyTorch model with CORAL layer + ordinal losses.",
            "Engineered features and used Runge–Kutta integration."
        ],
    },
];

export function ExperienceTimeline() {
    return (
        <div className="space-y-12">
            {experiences.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l border-secondary/30">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-secondary" />
                    <h3 className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-xl font-bold text-primary">
                        <span>{exp.role}</span>
                        <span className="text-secondary text-sm sm:text-lg">@ {exp.company}</span>
                    </h3>
                    <p className="mb-4 font-mono text-xs text-foreground/60">{exp.period}</p>
                    <ul className="space-y-2 text-sm text-foreground/80">
                        {exp.description.map((desc, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-secondary">▹</span>
                                {desc}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
