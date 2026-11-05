type Experience = {
    company: string;
    role: string;
    period: string;
    start: string;
    description: string[];
};

// Ordered newest start date first. Adobe (2025–2026) and Foundation (Jan–May 2025)
// overlap; when start dates are the same, the previously published order is kept.
const experiences: Experience[] = [
    {
        company: "Impruvon Health",
        role: "AI & Software Development Intern",
        period: "Summer 2026",
        start: "2026",
        description: [
            "Built a Python and FastMCP integration exposing nine typed tools for operational and transformed HL7 queries.",
            "Implemented multi-location analytics across orders, dispenses, patient records, and clinical data.",
            "Automated pull-request demos with Playwright recordings and validated narrated walkthroughs."
        ],
    },
    {
        company: "Adobe",
        role: "Campus Ambassador",
        period: "2025 – 2026",
        start: "2025",
        description: ["Created content around Adobe Express and ran workshops for the Rutgers student community."],
    },
    {
        company: "Foundation for Ecological Security",
        role: "AI Intern",
        period: "Jan 2025 – May 2025",
        start: "2025-01",
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
        start: "2024-10",
        description: [
            "Built a fatigue prediction pipeline using heart-rate and step data from 135 participants; evaluated ~20 model iterations.",
            "Improved MAE by ~78% (1.17 → 0.25) using PyTorch model with CORAL layer + ordinal losses.",
            "Engineered features and used Runge–Kutta integration."
        ],
    },
    {
        company: "IEEE GCET Student Branch",
        role: "Secretary",
        period: "Dec 2023 – Dec 2024",
        start: "2023-12",
        description: ["Organized more than 39 technical and networking events and coordinated branch operations and communications."],
    },
];

export function ExperienceTimeline() {
    return (
        <>
            <ol className="experience-timeline" aria-label="Professional experience, newest first">
                {experiences.map((exp) => (
                    <li className="experience-entry" key={`${exp.company}-${exp.role}`}>
                        <time className="experience-date" dateTime={exp.start}>
                            {exp.period}
                        </time>
                        <span className="experience-rail" aria-hidden="true">
                            <span className="experience-marker" />
                        </span>
                        <div className="experience-content">
                            <h3>{exp.role}</h3>
                            <p className="experience-company">{exp.company}</p>
                            <ul>
                                {exp.description.map((desc) => (
                                    <li key={desc}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
            <p className="experience-note">
                Ordered by start date, newest first. Overlapping ranges reflect concurrent roles.
            </p>
        </>
    );
}
