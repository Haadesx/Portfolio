import Link from "next/link";
import { SwimmingStory } from "@/components/feature/SwimmingStory";

export const metadata = {
    title: "About | Varesh Patel",
    description:
        "Varesh Patel’s background in machine learning, computer vision, applied AI, education, and competitive swimming.",
};

export default function AboutPage() {
    return (
        <div className="editorial about-page">
            <section className="about-hero" aria-labelledby="about-title">
                <p className="eyebrow">ABOUT / VARESH PATEL</p>
                <h1 id="about-title">The longer version<span>.</span></h1>
                <p className="about-lede">
                    I’m Varesh Patel, a machine learning engineer working on computer vision,
                    applied AI, and the systems around a model. I care about evaluation, and about
                    knowing where a system can fail.
                </p>
                <div className="about-actions">
                    <Link className="button-primary" href="/projects">Explore the case studies <span>↗</span></Link>
                    <a className="text-link" href="/resume.pdf">View résumé ↗</a>
                    <Link className="text-link" href="/contact">Contact ↗</Link>
                </div>
            </section>

            <section className="editorial-section about-section" aria-labelledby="approach-title">
                <div className="reference-heading" data-reveal>
                    <p className="eyebrow">BACKGROUND / HOW I WORK</p>
                    <h2 id="approach-title" data-decode>From data to something usable<span>.</span></h2>
                </div>
                <div className="about-prose" data-reveal>
                    <p>
                        My work usually starts with unstructured data and ends with a model someone
                        can use. I have trained language and vision models from scratch, studied how
                        representation edits change behavior, and built the interfaces around the
                        result. I care about the whole path: the data, the evaluation, and the
                        interface.
                    </p>
                    <p>
                        I’m an M.S. computer science candidate at Rutgers, expected May 2027, with a
                        3.98/4.00 GPA. My work spans computer vision, diffusion language modeling,
                        representation editing, and applied AI systems. Most recently I built AI
                        tooling at Impruvon Health.
                    </p>
                    <p>
                        Outside a course or a job, I build things to answer a question: a diffusion
                        model to see whether denoising can generate text, a representation-editing
                        framework to measure the cost of an edit, or a terminal tool because a
                        training loop should be easier to watch.
                    </p>
                </div>
            </section>

            <section className="editorial-section about-section" aria-labelledby="education-title">
                <div className="reference-heading" data-reveal>
                    <p className="eyebrow">EDUCATION / FORMAL TRAINING</p>
                    <h2 id="education-title" data-decode>Education<span>.</span></h2>
                </div>
                <ul className="about-education" data-reveal>
                    <li>
                        <strong>Rutgers University</strong>
                        <span>Sep 2025 – May 2027 (expected)</span>
                        <p>M.S. in Computer Science, New Brunswick, NJ. GPA 3.98/4.00.</p>
                    </li>
                    <li>
                        <strong>G.H. Patel College of Engineering and Technology</strong>
                        <span>Sep 2021 – Apr 2025</span>
                        <p>B.Tech in Computer Science and Design, Anand, Gujarat, India. CGPA 8.3/10.</p>
                    </li>
                </ul>
            </section>

            <section className="editorial-section about-section" aria-labelledby="beyond-title">
                <div className="reference-heading" data-reveal>
                    <p className="eyebrow">BEYOND THE MODEL / COMMUNITY AND TOOLS</p>
                    <h2 id="beyond-title" data-decode>Beyond engineering<span>.</span></h2>
                </div>
                <div className="about-beyond" data-reveal>
                    <div>
                        <h3>IEEE GCET Student Branch</h3>
                        <p>
                            As branch secretary I organized more than 39 technical and networking
                            events and coordinated branch operations.
                        </p>
                    </div>
                    <div>
                        <h3>Adobe Campus Ambassador</h3>
                        <p>
                            Ran Adobe Express workshops and made content for the Rutgers student
                            community.
                        </p>
                    </div>
                    <div>
                        <h3>lootqdm</h3>
                        <p>
                            Published{" "}
                            <a href="https://pypi.org/project/lootqdm/" target="_blank" rel="noopener noreferrer">
                                lootqdm
                            </a>{" "}
                            on PyPI, a training-loop toolkit with PyTorch and Keras integrations.
                        </p>
                    </div>
                    <div>
                        <h3>Open source</h3>
                        <p>
                            Edge inference, browser LLM benchmarks, and pose-estimation work are in
                            the{" "}
                            <Link href="/projects#open-source">project archive</Link>.
                        </p>
                    </div>
                </div>
            </section>

            <div className="editorial-section about-section">
                <SwimmingStory />
            </div>

            <nav className="about-links" aria-label="More pages">
                <Link className="text-link" href="/projects">All case studies ↗</Link>
                <a className="text-link" href="/resume.pdf">Résumé ↗</a>
                <Link className="text-link" href="/contact">Contact ↗</Link>
                <Link className="text-link" href="/chat">Ask AI about my work ↗</Link>
            </nav>
        </div>
    );
}
