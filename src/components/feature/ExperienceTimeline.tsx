import { experience } from '@/data/experience';

export function ExperienceTimeline() {
    return (
        <>
            <ol className="experience-timeline" aria-label="Professional experience, newest first">
                {experience.map((exp) => (
                    <li className="experience-entry" key={exp.id}>
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
                                {exp.highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
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
