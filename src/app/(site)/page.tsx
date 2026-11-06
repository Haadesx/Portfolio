import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import {
  awards,
  featuredFlagships,
  furtherWorkSlugs,
  medcheckSpotlight,
  openSourceHighlights,
} from "@/data/curation";
import { ExperienceTimeline } from "@/components/feature/ExperienceTimeline";
import { FlagshipPanel } from "@/components/feature/FlagshipPanel";
import { HeroIntro } from "@/components/feature/HeroIntro";

const skills = [
  { title: "Languages", items: "Python · C++ · Java · Swift · TypeScript · JavaScript · SQL" },
  { title: "Machine learning", items: "PyTorch · TensorFlow · Scikit-learn · DDP · SLURM" },
  { title: "Computer vision", items: "OpenCV · YOLO · CNNs · Image classification" },
  { title: "Data & tools", items: "Git · Docker · Linux · Qdrant · Hugging Face" },
  { title: "Applications", items: "Discrete diffusion · FastMCP · FastAPI · React · Gradio" },
];

const projectMap = new Map(projects.map((project) => [project.slug, project]));

function getProject(slug: string) {
  const project = projectMap.get(slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
}

export default function Home() {
  const flagships = featuredFlagships.map((curation) => ({
    curation,
    project: getProject(curation.slug),
  }));
  const furtherWork = furtherWorkSlugs.map(getProject);
  const medcheck = getProject(medcheckSpotlight.slug);

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
            <p className="hero-index">16 CASE STUDIES / 3 FLAGSHIP SYSTEMS</p>
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
        <div className="about-columns">
          <div data-reveal>
            <p>My work moves from unstructured data to models people can actually use. I have trained language and vision models from scratch, studied how representation edits change model behavior, and shipped interfaces around the result. I care about the complete system: the data, the evaluation, and the interface.</p>
            <p>I’m an M.S. computer science candidate at Rutgers (expected May 2027, GPA 3.98/4.00), working across computer vision, diffusion language modeling, representation editing, and applied AI systems.</p>
            <blockquote>Make the result measurable. Make the system understandable.</blockquote>
            <Link className="text-link" href="/about">Read my background ↗</Link>
          </div>
          <div className="principle-list" data-reveal>
            <div><span>01 / DATA</span><h3>Work from evidence</h3><p>Understand the dataset before making a claim about a model.</p></div>
            <div><span>02 / EVALUATION</span><h3>Measure what matters</h3><p>Compare against baselines and make limitations visible.</p></div>
            <div><span>03 / DELIVERY</span><h3>Build for people</h3><p>Turn research into workflows others can inspect and use.</p></div>
          </div>
        </div>
      </section>

      <section className="editorial-section reference-work" id="selected-work"><span id="projects" />
        <div className="reference-heading" data-reveal><p className="eyebrow">ENGINEERING / SELECTED WORK</p><h2 data-decode>Flagship projects<span>.</span></h2><p>Three systems chosen for depth: a model trained from scratch, a computer-vision safety prototype, and an evaluated representation-editing framework.</p></div>
        <div className="flagship-stack">
          {flagships.map(({ curation, project }, index) => (
            <FlagshipPanel key={project.slug} project={project} curation={curation} index={index} />
          ))}
        </div>

        <article className="recent-project" data-reveal>
          <div className="panel-top"><span className="signal-pill">● {medcheckSpotlight.label}</span><span className="panel-id">RECENT / 01</span></div>
          <div className="recent-project-body">
            <div>
              <h3>{medcheck.title}</h3>
              <p>{medcheckSpotlight.thesis}</p>
            </div>
            <div className="recent-project-facts">
              {medcheckSpotlight.facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
            </div>
          </div>
          <div className="recent-project-detail">
            <p><span>CONTRIBUTION</span>{medcheckSpotlight.contribution}</p>
            <p><span>METHOD</span>{medcheckSpotlight.method}</p>
            <p><span>EVIDENCE &amp; LIMITS</span>{medcheckSpotlight.evaluation} {medcheckSpotlight.limitation}</p>
          </div>
          <div className="recent-project-footer">
            <Link className="text-link" href={`/projects/${medcheck.slug}`}>FULL CASE STUDY ↗</Link>
            {medcheck.githubUrl ? <a className="text-link" href={medcheck.githubUrl} target="_blank" rel="noopener noreferrer">SOURCE ↗</a> : null}
          </div>
        </article>

        <div className="reference-heading matrix-heading" data-reveal><p className="eyebrow">FURTHER EVIDENCE / RECENT BUILDS</p><h2 data-decode>More engineering<span>.</span></h2><p>Evaluation harnesses, embedded inference, inference benchmarking, and released tooling.</p></div>
        <div className="matrix-grid">
          {furtherWork.map((project, index) => (
            <article className="matrix-card" key={project.slug} data-reveal>
              <div className="matrix-card-top"><span className="signal-pill">{project.category[0]}</span><span className="panel-id">{String(index + 1).padStart(2, "0")}</span></div>
              <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
              <p>{project.shortDescription}</p>
              <div className="matrix-result" data-decode>{project.resultsMetrics.join(" · ")}</div>
              <div className="matrix-tags">{project.techStack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link className="matrix-link" href={`/projects/${project.slug}`}>EXPLORE PROJECT ↗</Link>
            </article>
          ))}
        </div>
        <div className="matrix-footer"><Link className="text-link" href="/projects">View all 16 case studies ↗</Link><a className="text-link" href="https://github.com/Haadesx" target="_blank" rel="noopener noreferrer">Explore GitHub ↗</a></div>
      </section>

      <section className="editorial-section reference-awards" id="recognition">
        <div className="reference-heading" data-reveal><p className="eyebrow">RECOGNITION / EXTERNAL VALIDATION</p><h2 data-decode>Awards<span>.</span></h2><p>Two hackathon builds with externally verified awards. Both are prototypes; neither is a production safety or payment guarantee.</p></div>
        <div className="awards-grid">
          {awards.map((award, index) => (
            <article className="award-card" key={award.event} data-reveal>
              <div className="award-card-top"><span className="eyebrow">{award.event}</span><span className="panel-id">AWARD / 0{index + 1}</span></div>
              <h3>{award.award}</h3>
              <p>{award.project}</p>
              <div className="award-links"><Link href={`/projects/${award.slug}`}>VIEW PROJECT ↗</Link><a href={award.source} target="_blank" rel="noopener noreferrer">DEVPOST ↗</a></div>
              <span className="award-note">{award.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section reference-opensource" id="open-source">
        <div className="reference-heading" data-reveal><p className="eyebrow">OPEN SOURCE / RESEARCH</p><h2 data-decode>Released work<span>.</span></h2><p>Software that exists beyond a portfolio card: an installable package, embedded inference, an inference benchmark, and a computer-vision research pipeline.</p></div>
        <div className="oss-grid">
          {openSourceHighlights.map((item) => (
            <article className="oss-card" key={item.name} data-reveal>
              <span className="eyebrow">{item.meta}</span>
              <h3>{item.name}</h3>
              <p>{item.blurb}</p>
              <div className="oss-links">
                <Link href={`/projects/${item.slug}`}>CASE STUDY ↗</Link>
                {item.external ? <a href={item.external} target="_blank" rel="noopener noreferrer">{item.externalLabel ?? "EXTERNAL"} ↗</a> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section reference-experience" id="experience"><div className="reference-heading" data-reveal><p className="eyebrow">EXPERIENCE / IN PRACTICE</p><h2 data-decode>Where the work happens<span>.</span></h2><p>Research, engineering, and community work across teams and disciplines.</p></div><div className="experience-panel" data-reveal><ExperienceTimeline /></div></section>

      <section className="editorial-section reference-skills" id="skills"><div className="reference-heading" data-reveal><p className="eyebrow">CAPABILITIES / TOOLKIT</p><h2 data-decode>The technical stack<span>.</span></h2><p>Tools and methods selected for the problem, from training to deployment.</p></div><div className="skill-matrix">{skills.map((group) => <div className="skill-card" key={group.title} data-reveal><h3>{group.title}</h3><p>{group.items}</p></div>)}</div></section>

      <section className="editorial-section reference-publications" id="publications"><div className="reference-heading" data-reveal><p className="eyebrow">RESEARCH / WRITING</p><h2 data-decode>Research &amp; publications<span>.</span></h2><p>Selected work in pose estimation, recognition, and emotion-aware systems.</p></div><div className="publication-list" data-reveal><div><span>SPRINGER / ICDAM 2025 · SHAH, PATEL, JOSHI</span><h3>OpenPose, PoseNet and MoveNet: the evolution of deep learning methods in yoga pose classification</h3></div><div><span>2024 / IJIRMF</span><h3>Machine learning-based hand gesture recognition for immersive gaming</h3></div><div><span>2024 / IEEE FMLDS</span><h3>Emotion-aware music recommendations: custom CNN vs VGG16 vs InceptionV3</h3></div></div></section>

      <section className="contact-cta reference-contact" data-reveal><p className="eyebrow">LET’S WORK TOGETHER</p><h2>Let’s build something<br /><span>worth understanding.</span></h2><p>Have a challenging problem in machine learning or computer vision? I’d love to hear about it.</p><div><Link className="button-primary" href="/contact">Start a conversation <span>↗</span></Link><a className="text-link" href="/resume.pdf">View résumé ↗</a></div><a className="contact-social" href="https://github.com/Haadesx">GITHUB ↗</a><a className="contact-social" href="https://www.linkedin.com/in/vareshpatel/">LINKEDIN ↗</a></section>
    </div>
  );
}
