type Experience = {
    company: string;
    role: string;
    period: string;
    start: string;
    highlight: string;
};

// Newest first. Adobe (2025–2026) overlaps Foundation (Jan–May 2025).
const experiences: Experience[] = [
    {
        company: "Impruvon Health",
        role: "AI & Software Development Intern",
        period: "Summer 2026",
        start: "2026",
        highlight:
            "Built a Python and FastMCP integration that exposes nine typed tools for operational and transformed HL7 queries.",
    },
    {
        company: "Adobe",
        role: "Campus Ambassador",
        period: "2025 – 2026",
        start: "2025",
        highlight:
            "Ran Adobe Express workshops and made content for the Rutgers student community.",
    },
    {
        company: "Foundation for Ecological Security",
        role: "AI Intern",
        period: "Jan 2025 – May 2025",
        start: "2025-01",
        highlight:
            "Trained a two-stage vision pipeline on a 710 GB, 1,150-species image dataset and reached about 79% validation accuracy.",
    },
    {
        company: "Arcascope",
        role: "AI Intern",
        period: "Oct 2024 – Jan 2025",
        start: "2024-10",
        highlight:
            "Cut fatigue-prediction MAE from 1.17 to 0.25, about 78%, with a PyTorch ordinal model on wearable data from 135 participants.",
    },
    {
        company: "IEEE GCET Student Branch",
        role: "Secretary",
        period: "Dec 2023 – Dec 2024",
        start: "2023-12",
        highlight:
            "Organized more than 39 technical and networking events and coordinated branch operations.",
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
                            <p className="experience-highlight">{exp.highlight}</p>
                        </div>
                    </li>
                ))}
            </ol>
            <p className="experience-note">
                Newest first. Overlapping dates are concurrent roles.
            </p>
        </>
    );
}
