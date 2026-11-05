import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ExperienceTimeline } from "@/components/feature/ExperienceTimeline";
import { HeroIntro } from "@/components/feature/HeroIntro";

const skills = [
  { title: "Languages", items: "Python · C++ · Java · Swift · TypeScript · JavaScript · SQL" },
  { title: "Machine learning", items: "PyTorch · TensorFlow · Scikit-learn · DDP · SLURM" },
  { title: "Computer vision", items: "OpenCV · YOLO · CNNs · Image classification" },
  { title: "Data & tools", items: "Git · Docker · Linux · Qdrant · Hugging Face" },
  { title: "Applications", items: "Discrete diffusion · FastMCP · FastAPI · React · Gradio" },
];

const details: Record<string, { label: string; text: string }[]> = {
  "ibis-2-0": [
    { label: "Problem & dataset", text: "Identify approximately 1,150 Indian bird species across a dataset of approximately 710 GB." },
    { label: "Approach", text: "A two-stage object detection and image classification pipeline, with ResNet-50 used for classification." },
    { label: "Evaluation", text: "Approximately 79% top-1 validation accuracy. This is a validation result, not a measure of production performance." },
    { label: "Limitations", text: "The validation confusion matrix shows confusion among visually similar subspecies, and the dataset is highly imbalanced." },
  ],
  "fatigue-prediction": [
    { label: "Problem & data", text: "Predict daily fatigue from physiological, activity and survey data across 135 participants." },
    { label: "Approach", text: "Feature engineering and a PyTorch model using CORAL ordinal loss across iterative experiments." },
    { label: "Evaluation", text: "Reported MAE improved from approximately 1.17 to 0.25; approximately 85% of predictions were within one point." },
    { label: "Limitations", text: "Fatigue is subjective and noisy, which makes prediction and generalization difficult." },
  ],
};

export default function Home() {
  const featured = projects.filter((p) => p.slug === "ibis-2-0" || p.slug === "fatigue-prediction");
  const recentOrder = ["iconoclast", "diffullm", "medcheck", "crucible", "webgpu-edge-ai", "lootqdm", "event-pose-estimation", "m-agent", "carewatch", "payment-liveness", "healthtwin", "edge-ai", "pdf-helper", "emotion-spotify"];
  const more = projects.filter((p) => p.slug !== "ibis-2-0" && p.slug !== "fatigue-prediction")
    .sort((a, b) => (recentOrder.indexOf(a.slug) < 0 ? Infinity : recentOrder.indexOf(a.slug)) - (recentOrder.indexOf(b.slug) < 0 ? Infinity : recentOrder.indexOf(b.slug)));
  const metrics = [
    [{ value: "79%", label: "VALIDATION TOP-1" }, { value: "92%", label: "VALIDATION TOP-5" }, { value: "1,150", label: "BIRD SPECIES" }, { value: "710 GB", label: "IMAGE CORPUS" }],
    [{ value: "1.17 → 0.25", label: "REPORTED MAE" }, { value: "78%", label: "MAE REDUCTION" }, { value: "85%", label: "WITHIN ONE POINT" }, { value: "~20", label: "MODEL ITERATIONS" }],
  ];
  return (
    <div className="editorial">
      <section className="hero" aria-labelledby="hero-title">
        <HeroIntro />
        <div className="blueprint" aria-hidden="true"><i /><i /><i /><i /><span /><span /><span /></div>
        <div className="hero-topline"><span>Varesh Patel / Portfolio 2026</span><span>Machine learning &amp; computer vision</span></div>
        <div className="outline-word" aria-hidden="true">VARESH</div>
        <div className="hero-grid">
          <div className="hero-intro">
            <p className="eyebrow">ML &amp; CV ENGINEER / RESEARCHER / BUILDER</p>
            <h1 id="hero-title"><span className="sr-only">Varesh Patel — Machine Learning and Computer Vision Engineer, researcher, and builder. </span>Making data<br /><em>make sense.</em></h1>
            <p className="hero-lede">I’m Varesh — I build computer vision and predictive systems, and the interfaces that make them useful.</p>
            <p className="hero-note">Research-minded, product-obsessed. I care about evidence, evaluation, and the gap between a model that works and a tool people trust.</p>
            <div className="hero-actions"><a className="button-primary" href="#selected-work">Explore selected work <span>↗</span></a><Link className="text-link" href="/chat">Ask about my work ↗</Link><a className="text-link" href="/resume.pdf">View résumé ↗</a></div>
            <p className="hero-index">16 CASE STUDIES / 2 FLAGSHIP SYSTEMS</p>
          </div>
          <div className="identity-tile">
            <Image src="/portrait.jpg" alt="Varesh Patel" fill priority sizes="(max-width: 800px) 100vw, 33vw" className="identity-photo" />
            <div className="tile-grid" aria-hidden="true" />
            <span className="tile-label">IDENTITY / 001</span>
            <div className="tile-bottom"><span>V / P</span><span>ENGINEERING<br />WITH INTENT</span></div>
          </div>
          <div className="hero-side">
            <div><span className="meta-label">FOCUS / 01</span><h2>Vision<br />systems</h2><p>Classification, detection, and visual understanding.</p></div>
            <div><span className="meta-label">FOCUS / 02</span><h2>Predictive<br />models</h2><p>Learning from time-series and real-world signals.</p></div>
            <a href="#selected-work">SCROLL TO EXPLORE <span>↓</span></a>
          </div>
        </div>
        <div className="nameplate"><span>VARESH PATEL</span><span>ML / CV ENGINEER</span></div>
      </section>
      <section className="editorial-section reference-about" id="background">
        <div className="reference-heading" data-reveal><p className="eyebrow">BACKGROUND / THE APPROACH</p><h2 data-decode>Background &amp; philosophy<span>.</span></h2><p>Building reliable systems at the intersection of machine learning and the real world.</p></div>
        <div className="about-columns"><div data-reveal><p>My work moves from unstructured data to models people can actually use. From identifying bird species in the field to learning from noisy wearable signals, I care about the complete system: the data, the evaluation, and the interface around the model.</p><p>I’m an M.S. computer science candidate at Rutgers (expected May 2027, GPA 3.98/4.00), working across computer vision, diffusion language modeling, representation editing, and applied AI systems.</p><blockquote>Make the result measurable. Make the system understandable.</blockquote><Link className="text-link" href="/about">Read my background ↗</Link></div><div className="principle-list" data-reveal><div><span>01 / DATA</span><h3>Work from evidence</h3><p>Understand the dataset before making a claim about a model.</p></div><div><span>02 / EVALUATION</span><h3>Measure what matters</h3><p>Compare against baselines and make limitations visible.</p></div><div><span>03 / DELIVERY</span><h3>Build for people</h3><p>Turn research into workflows others can inspect and use.</p></div></div></div>
      </section>
      <section className="editorial-section reference-work" id="selected-work"><span id="projects" />
        <div className="reference-heading" data-reveal><p className="eyebrow">ENGINEERING / SELECTED WORK</p><h2 data-decode>Flagship projects<span>.</span></h2><p>Research-grade evaluation, honest limitations, and systems designed to be used.</p></div>
        <div className="flagship-stack">{featured.map((project, index) => <article className="flagship-panel" key={project.slug} data-reveal>
          <div className="panel-top"><span className="signal-pill">● {index === 0 ? "COMPUTER VISION" : "PREDICTIVE MODELING"}</span><span className="panel-id">PROJECT / 0{index + 1}</span></div>
          <div className="flagship-copy"><h3 data-decode>{index === 0 ? "IBIS 2.0 — Bird species identification" : "Daily fatigue prediction"}</h3><p>{index === 0 ? "A researcher-facing computer vision pipeline for identifying Indian bird species across a large, imbalanced image dataset." : "An ordinal modeling pipeline for estimating daily fatigue from wearable, physiological, and survey signals."}</p></div>
          <div className="metric-grid">{metrics[index].map((metric) => <div key={metric.label}><strong data-decode>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
          <div className="architecture-header"><div><p className="eyebrow">ENGINEERING BREAKDOWN</p><h4>Inside the system</h4><p>Open a layer to inspect the approach and evaluation.</p></div><Link className="text-link" href={`/projects/${project.slug}`}>Full case study ↗</Link></div>
          <div className="architecture-grid">{details[project.slug].map((item, itemIndex) => <details key={item.label} open={itemIndex === 0 ? true : undefined}><summary><span>{String(itemIndex + 1).padStart(2, "0")} / {item.label}</span><span>+</span></summary><p>{item.text}</p></details>)}</div>
        </article>)}</div>
        <div className="reference-heading matrix-heading" data-reveal><p className="eyebrow">PROJECT INDEX / RECENT BUILDS</p><h2 data-decode>The project matrix<span>.</span></h2><p>Experiments, research, and applications across vision, AI systems, and software.</p></div>
        <div className="matrix-grid">{more.map((project, index) => <article className="matrix-card" key={project.slug} data-reveal><div className="matrix-card-top"><span className="signal-pill">{project.category[0]}</span><span className="panel-id">{String(index + 1).padStart(2, "0")}</span></div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.shortDescription}</p><div className="matrix-result" data-decode>{project.resultsMetrics.join(" · ")}</div><div className="matrix-tags">{project.techStack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="matrix-link" href={`/projects/${project.slug}`}>EXPLORE PROJECT ↗</Link></article>)}</div>
        <div className="matrix-footer"><Link className="text-link" href="/projects">View all case studies ↗</Link><a className="text-link" href="https://github.com/Haadesx" target="_blank" rel="noopener noreferrer">Explore GitHub ↗</a></div>
      </section>
      <section className="editorial-section reference-experience" id="experience"><div className="reference-heading" data-reveal><p className="eyebrow">EXPERIENCE / IN PRACTICE</p><h2 data-decode>Where the work happens<span>.</span></h2><p>Research, engineering, and community work across teams and disciplines.</p></div><div className="experience-panel" data-reveal><ExperienceTimeline /></div></section>
      <section className="editorial-section reference-skills" id="skills"><div className="reference-heading" data-reveal><p className="eyebrow">CAPABILITIES / TOOLKIT</p><h2 data-decode>The technical stack<span>.</span></h2><p>Tools and methods selected for the problem, from training to deployment.</p></div><div className="skill-matrix">{skills.map((group) => <div className="skill-card" key={group.title} data-reveal><h3>{group.title}</h3><p>{group.items}</p></div>)}</div></section>
      <section className="editorial-section reference-publications" id="publications"><div className="reference-heading" data-reveal><p className="eyebrow">RESEARCH / WRITING</p><h2 data-decode>Research &amp; publications<span>.</span></h2><p>Selected work in pose estimation, recognition, and emotion-aware systems.</p></div><div className="publication-list" data-reveal><div><span>2025 / ICDAM</span><h3>OpenPose, PoseNet and MoveNet: the evolution of deep learning methods in yoga pose classification</h3></div><div><span>2024 / IJIRMF</span><h3>Machine learning-based hand gesture recognition for immersive gaming</h3></div><div><span>2024 / IEEE FMLDS</span><h3>Emotion-aware music recommendations: custom CNN vs VGG16 vs InceptionV3</h3></div></div></section>
      <section className="contact-cta reference-contact" data-reveal><p className="eyebrow">LET’S WORK TOGETHER</p><h2>Let’s build something<br /><span>worth understanding.</span></h2><p>Have a challenging problem in machine learning or computer vision? I’d love to hear about it.</p><div><Link className="button-primary" href="/contact">Start a conversation <span>↗</span></Link><a className="text-link" href="/resume.pdf">View résumé ↗</a></div><a className="contact-social" href="https://github.com/Haadesx">GITHUB ↗</a><a className="contact-social" href="https://www.linkedin.com/in/vareshpatel/">LINKEDIN ↗</a></section>
    </div>
  );
}
