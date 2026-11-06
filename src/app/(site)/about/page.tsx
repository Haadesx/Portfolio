import Link from "next/link";

export const metadata = {
    title: "About | Varesh Patel",
    description: "Varesh Patel’s background in machine learning, computer vision, and applied AI.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 sm:px-8 py-12 max-w-3xl min-h-[80vh]">
            <h1 className="text-4xl font-bold text-primary mb-8">About Me</h1>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>I’m <strong>Varesh Patel</strong>, a machine learning engineer interested in computer vision, applied AI, and building systems that are easier to inspect and debug.</p>
                <p>Most recently, I built Python/FastMCP integrations at Impruvon Health and trained a discrete diffusion language model from scratch. My work spans computer vision, representation editing, edge inference, and prototypes that turn machine learning into usable workflows. I care about clear evaluation, reproducible experiments, and understanding where a system can fail.</p>
                <h2 className="text-2xl font-bold text-primary mt-12">Selected work</h2>
                <p>I trained <Link href="/projects/diffullm" className="text-secondary hover:underline">DiffuLLM</Link>, a discrete diffusion language model; built <Link href="/projects/iconoclast" className="text-secondary hover:underline">ICONOCLAST</Link>, an evaluated representation-editing framework; and worked on <Link href="/projects/carewatch" className="text-secondary hover:underline">CareWatch</Link>, a computer-vision safety-review prototype. <Link href="/projects/medcheck" className="text-secondary hover:underline">MedCheck</Link> is a more recent OCR-first applied-vision build.</p>
                <h2 className="text-2xl font-bold text-primary mt-12">Education</h2>
                <p><strong>Rutgers University</strong> — M.S. in Computer Science, September 2025–May 2027 (expected); GPA: 3.98/4.00.</p>
                <p><strong>G.H. Patel College of Engineering and Technology</strong> — B.Tech in Computer Science and Design, September 2021–April 2025; CGPA: 8.3/10.</p>
                <h2 className="text-2xl font-bold text-primary mt-12">Beyond the model</h2>
                <p>As IEEE GCET Student Branch secretary, I organized technical and networking events and coordinated branch operations. I have also created Adobe Express content and run workshops for the Rutgers community as a student ambassador.</p>
                <p>I published <a href="https://pypi.org/project/lootqdm/" className="text-secondary hover:underline">lootqdm</a>, a Python training-loop toolkit with PyTorch and Keras integrations.</p>
                <div className="flex flex-wrap gap-6 pt-6"><Link href="/projects" className="text-secondary font-mono hover:underline">Explore projects →</Link><a href="/resume.pdf" className="text-secondary font-mono hover:underline">View résumé →</a></div>
            </div>
        </div>
    );
}
