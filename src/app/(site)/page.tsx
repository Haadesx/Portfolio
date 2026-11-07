import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { awards, featuredFlagships, medcheckSpotlight } from "@/data/curation";
import { HeroIntro } from "@/components/feature/HeroIntro";
import { FlagshipPanel } from "@/components/feature/FlagshipPanel";
import { ExperienceCapabilities } from "@/components/feature/ExperienceCapabilities";
import { SwimmingBand } from "@/components/feature/SwimmingBand";

const email = "workmailvaresh@gmail.com";

// Canonical publication records are also mirrored in the case-study and chat
// facts. `scripts/validate-content.mjs` statically asserts that the homepage
// advertises these official publication links.
const publications = [
  {
    venue: "Springer / ICDAM 2025 · Shah, Patel, Joshi",
    title:
      "OpenPose, PoseNet and MoveNet: the evolution of deep learning methods in yoga pose classification",
    url: "https://doi.org/10.1007/978-3-032-02949-2_2",
    ariaLabel:
      "Read the OpenPose, PoseNet and MoveNet paper at Springer / ICDAM 2025",
  },
  {
    venue: "2024 / IJIRMF · Varesh Patel",
    title: "Machine learning-based hand gesture recognition for immersive gaming",
    url: "https://www.ijirmf.com/wp-content/uploads/NOBCON-2024-min.pdf#page=17",
    ariaLabel:
      "Read the hand gesture recognition paper in the NOBCON-2024 proceedings",
  },
  {
    venue: "2024 / IEEE FMLDS · Varesh Patel, Khyati Mehta",
    title: "Emotion-aware music recommendations: custom CNN vs VGG16 vs InceptionV3",
    url: "https://doi.org/10.1109/FMLDS63805.2024.00092",
    ariaLabel:
      "Read the emotion-aware music recommendations paper at IEEE FMLDS 2024",
  },
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
  const medcheck = getProject(medcheckSpotlight.slug);

  return (
    <div className="editorial">
      <section className="hero" aria-labelledby="hero-title" data-hero-decode>
        <HeroIntro />
        <div className="blueprint" aria-hidden="true"><i /><i /><i /><i /><span /><span /><span /></div>
        <div className="hero-topline"><span>Varesh Patel / Portfolio 2026</span><span>Machine learning &amp; computer vision</span></div>
        <div className="outline-word" aria-hidden="true">VARESH</div>
        <div className="hero-grid">
          <div className="hero-intro">
            <p className="eyebrow">MACHINE LEARNING / COMPUTER VISION / APPLIED AI</p>
            <h1 id="hero-title"><span className="sr-only">Varesh Patel, machine learning and computer vision engineer. </span>Making data<br /><em>make sense.</em></h1>
            <p className="hero-lede">I’m Varesh. I build computer vision and predictive systems, and the tools that make them useful.</p>
            <p className="hero-note">M.S. computer science at Rutgers, expected May 2027. Most recently I built AI tooling at Impruvon Health.</p>
            <div className="hero-actions"><a className="button-primary" href="#selected-work">View selected work <span>↗</span></a><a className="text-link" href="/resume.pdf">View résumé ↗</a><Link className="text-link" href="/contact">Contact ↗</Link></div>
            <p className="hero-index">{projects.length} CASE STUDIES / {featuredFlagships.length} FLAGSHIP SYSTEMS</p>
          </div>
          <div className="identity-tile">
            <Image src="/portrait.jpg" alt="Varesh Patel" fill priority sizes="(max-width: 800px) 100vw, 33vw" className="identity-photo" />
            <div className="tile-grid" aria-hidden="true" />
            <span className="tile-label">IDENTITY / 001</span>
            <div className="tile-bottom"><span>V / P</span><span>ML / CV<br />ENGINEER</span></div>
          </div>
          <div className="hero-side">
            <div><span className="meta-label">FOCUS / 01</span><h2>Vision<br />systems</h2><p>Detection, pose, OCR, and visual understanding.</p></div>
            <div><span className="meta-label">FOCUS / 02</span><h2>Predictive<br />models</h2><p>Learning from time-series and real-world signals.</p></div>
            <a href="#selected-work">SCROLL TO EXPLORE <span>↓</span></a>
          </div>
        </div>
        <div className="nameplate"><span>VARESH PATEL</span><span>ML / CV ENGINEER</span></div>
      </section>

      <section className="editorial-section reference-work" id="selected-work"><span id="projects" />
        <div className="reference-heading" data-reveal><p className="eyebrow">SELECTED WORK / FLAGSHIP SYSTEMS</p><h2 data-decode>Selected work<span>.</span></h2><p>Three systems that show the range: a model trained from scratch, a computer-vision safety prototype, and an evaluation framework for model edits. MedCheck is the most recent applied build.</p></div>
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
          <div className="recent-project-detail recent-project-detail--two">
            <p><span>WHAT I DID</span>{medcheckSpotlight.contribution}</p>
            <p><span>EVIDENCE &amp; LIMITS</span>{medcheckSpotlight.evaluation} {medcheckSpotlight.limitation}</p>
          </div>
          <div className="recent-project-footer">
            <Link className="text-link" href={`/projects/${medcheck.slug}`}>Full case study ↗</Link>
            {medcheck.githubUrl ? <a className="text-link" href={medcheck.githubUrl} target="_blank" rel="noopener noreferrer">Source ↗</a> : null}
          </div>
        </article>

        <div className="selected-work-footer" data-reveal>
          <p>Evaluation harnesses, open-source tools, and earlier builds live in the full archive.</p>
          <div>
            <Link className="text-link" href="/projects">View all {projects.length} case studies ↗</Link>
            <a className="text-link" href="https://github.com/Haadesx" target="_blank" rel="noopener noreferrer">Explore GitHub ↗</a>
          </div>
        </div>
      </section>

      <section className="editorial-section reference-experience" id="experience">
        <div className="reference-heading" data-reveal><p className="eyebrow">EXPERIENCE / CAPABILITIES</p><h2 data-decode>Where I’ve worked<span>.</span></h2><p>Internships in healthcare AI, ecological research, and physiological modeling, plus campus work at Adobe and IEEE.</p></div>
        <ExperienceCapabilities />
      </section>

      <section className="editorial-section reference-publications reference-credibility" id="recognition">
        <div className="reference-heading" data-reveal><p className="eyebrow">RESEARCH / RECOGNITION / BEYOND ENGINEERING</p><h2 data-decode>Research &amp; recognition<span>.</span></h2><p>Three peer-reviewed papers, two hackathon awards verified on Devpost, and nearly two decades of competitive swimming.</p></div>
        <div className="credibility-grid">
          <div className="credibility-column" data-reveal>
            <h3>Publications</h3>
            <div className="publication-list">
              {publications.map((publication) => (
                <div key={publication.url}>
                  <span>{publication.venue}</span>
                  <h4>{publication.title}</h4>
                  <a className="publication-paper-link" href={publication.url} target="_blank" rel="noopener noreferrer" aria-label={publication.ariaLabel}>READ PAPER ↗</a>
                </div>
              ))}
            </div>
          </div>
          <div className="credibility-column" data-reveal>
            <h3>Awards</h3>
            <div className="awards-grid">
              {awards.map((award) => (
                <article className="award-card" key={award.event}>
                  <div className="award-card-top"><span className="eyebrow">{award.event}</span><span className="award-mark">DEVPOST VERIFIED</span></div>
                  <h4>{award.award}</h4>
                  <p className="award-project">{award.project}</p>
                  <div className="award-links"><Link href={`/projects/${award.slug}`}>View project ↗</Link><a href={award.source} target="_blank" rel="noopener noreferrer">Devpost ↗</a></div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <SwimmingBand />
      </section>

      <section className="contact-cta reference-contact" aria-labelledby="contact-title" data-reveal>
        <p className="eyebrow">CONTACT / GET IN TOUCH</p>
        <h2 id="contact-title">Tell me what<br /><span>you’re building.</span></h2>
        <p>If you’re hiring, or working on something in ML or computer vision, email is the fastest way to reach me.</p>
        <a className="contact-email" href={`mailto:${email}`}>{email}</a>
        <div className="reference-contact-actions">
          <a className="text-link" href="/resume.pdf">Résumé ↗</a>
          <a className="text-link" href="https://github.com/Haadesx" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="text-link" href="https://www.linkedin.com/in/vareshpatel/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <Link className="text-link" href="/about">More about me ↗</Link>
        </div>
      </section>
    </div>
  );
}
