import Link from "next/link";

export const metadata = {
    title: "About | Varesh Patel",
    description: "More about Varesh Patel, an AI/ML Engineer.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 sm:px-8 py-12 max-w-3xl min-h-[80vh]">
            <h1 className="text-4xl font-bold text-primary mb-8">About Me</h1>

            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                    I'm <strong>Varesh Patel</strong>, a graduate Computer Science student at <strong>Rutgers University</strong> (MS CS) and a dedicated AI/ML Engineer.
                </p>
                <p>
                    My journey in engineering is driven by a single principle: <strong>impact through intelligence</strong>.
                    I don’t just train models; I build systems that solve tangible problems—whether that's helping researchers classify thousands of bird species or predicting human fatigue to improve health outcomes.
                </p>
                <p>
                    Currently, I am focused on <strong>Computer Vision</strong> and <strong>Time-Series Analysis</strong>.
                    I enjoy the challenge of dealing with unstructured data and noisy signals. I believe that the difference between a "model" and a "product" is rigorous engineering—clean code, reproducible pipelines, and measurable metrics.
                </p>

                <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Core Principles</h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                    {[
                        { title: "Reproducibility First", desc: "If it doesn't run on another machine, it doesn't exist." },
                        { title: "Metrics over Hype", desc: "I optimize for F1-scores and MAE, not buzzwords." },
                        { title: "User Centric", desc: "An accurate model is useless if the interface is unusable." },
                        { title: "Keep it Simple", desc: "Start with the simplest baseline. Complexity must earn its way in." }
                    ].map(item => (
                        <li key={item.title} className="bg-card p-4 rounded-lg border border-white/5">
                            <h3 className="font-bold text-secondary mb-1">{item.title}</h3>
                            <p className="text-sm">{item.desc}</p>
                        </li>
                    ))}
                </ul>

                <div className="mt-12">
                    <Link href="/contact" className="text-secondary font-mono hover:underline">
                        Let's build something together &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
