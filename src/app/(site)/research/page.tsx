import Link from "next/link";
import type { Metadata } from "next";
import { publications } from "@/data/publications";
import { awards } from "@/data/curation";

export const metadata: Metadata = {
  title: "Research | Varesh Patel",
  description:
    "Varesh Patel’s peer-reviewed publications in computer vision and representation learning, plus externally verified hackathon awards.",
};

export default function ResearchPage() {
  return (
    <div className="research-page">
      <section className="research-hero" aria-labelledby="research-title">
        <p className="eyebrow">RESEARCH / PUBLICATIONS &amp; RECOGNITION</p>
        <h1 className="research-title" id="research-title">
          Research<span>.</span>
        </h1>
        <p className="research-lede">
          Three peer-reviewed papers spanning pose estimation, gesture recognition, and emotion-aware
          recommenders, plus two hackathon builds recognised with externally verified awards. Every
          record below links to its official source.
        </p>
        <div className="hero-actions">
          <Link className="button-primary" href="/projects">
            Explore selected work <span>↗</span>
          </Link>
          <Link className="text-link" href="/contact">
            Get in touch ↗
          </Link>
        </div>
      </section>

      <section className="editorial-section reference-publications" aria-labelledby="publications-title">
        <div className="reference-heading">
          <p className="eyebrow">PUBLICATIONS / PEER REVIEWED</p>
          <h2 id="publications-title">
            Published work<span>.</span>
          </h2>
          <p>Conference and journal papers with links to the official publisher record.</p>
        </div>
        <div className="publication-list">
          {publications.map((publication) => (
            <div key={publication.id} className="research-publication">
              <span>
                {publication.venue} · {publication.year} · {publication.authorsLabel}
              </span>
              <h3>{publication.title}</h3>
              {publication.doi ? <p className="research-doi">DOI: {publication.doi}</p> : null}
              <a
                className="publication-paper-link"
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${publication.title} (${publication.venue})`}
              >
                READ PAPER ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="editorial-section reference-awards" aria-labelledby="awards-title">
        <div className="reference-heading">
          <p className="eyebrow">RECOGNITION / EXTERNALLY VERIFIED</p>
          <h2 id="awards-title">
            Awards<span>.</span>
          </h2>
          <p>
            Two hackathon builds with awards verified on Devpost. Both are prototypes; neither is a
            production safety or payment guarantee.
          </p>
        </div>
        <div className="awards-grid">
          {awards.map((award, index) => (
            <article className="award-card" key={award.event}>
              <div className="award-card-top">
                <span className="eyebrow">{award.event}</span>
                <span className="panel-id">AWARD / 0{index + 1}</span>
              </div>
              <h3>{award.award}</h3>
              <p>{award.project}</p>
              <div className="award-links">
                <Link href={`/projects/${award.slug}`}>VIEW PROJECT ↗</Link>
                <a href={award.source} target="_blank" rel="noopener noreferrer">
                  DEVPOST ↗
                </a>
              </div>
              <span className="award-note">{award.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="research-footer" aria-labelledby="research-more-title">
        <div>
          <p className="eyebrow">KEEP EXPLORING</p>
          <h2 id="research-more-title">The work behind the papers.</h2>
          <p>
            Case studies cover the systems, evaluation, and limits; the résumé covers roles and dates.
          </p>
        </div>
        <div className="research-footer-links">
          <Link className="text-link" href="/projects">
            Case studies ↗
          </Link>
          <Link className="text-link" href="/about">
            Background ↗
          </Link>
          <Link className="text-link" href="/contact">
            Contact ↗
          </Link>
          <a className="text-link" href="/resume.pdf">
            Résumé ↗
          </a>
        </div>
      </section>
    </div>
  );
}
