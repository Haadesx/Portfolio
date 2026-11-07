import Link from "next/link";
import type { Project } from "@/data/projects";
import type { FlagshipCuration } from "@/data/curation";
import { FlagshipDiagram } from "./FlagshipDiagram";

type FlagshipPanelProps = {
  project: Project;
  curation: FlagshipCuration;
  index: number;
};

export function FlagshipPanel({ project, curation, index }: FlagshipPanelProps) {
  const detailCells = [
    { label: "METHOD", text: curation.method },
    { label: "EVIDENCE", text: curation.evaluation },
    { label: "LIMITS", text: curation.limitation },
  ];

  return (
    <article className="flagship-panel" data-reveal>
      <div className="panel-top">
        <span className="signal-pill">● {curation.label}</span>
        <span className="panel-id">PROJECT / 0{index + 1}</span>
      </div>

      <div className="flagship-intro">
        <div className="flagship-copy">
          <h3 data-decode>{project.title}</h3>
          <p>{curation.thesis}</p>
        </div>
        <FlagshipDiagram variant={curation.diagram} />
      </div>

      <div className="flagship-facts">
        {curation.facts.map((fact) => (
          <div key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </div>
        ))}
      </div>

      <div className="flagship-scan">
        <div>
          <span>WHAT I DID</span>
          <p>{curation.contribution}</p>
        </div>
        <div>
          <span>WHY IT IS INTERESTING</span>
          <p>{curation.differentiator}</p>
        </div>
      </div>

      <details className="flagship-disclosure">
        <summary>
          <span className="disclosure-title">ENGINEERING DETAILS</span>
          <span className="disclosure-hint">METHOD · EVIDENCE · LIMITS</span>
          <span className="disclosure-toggle" aria-hidden="true">+</span>
        </summary>
        <div className="flagship-detail-grid">
          {detailCells.map((cell) => (
            <div className="flagship-detail" key={cell.label}>
              <span>{cell.label}</span>
              <p>{cell.text}</p>
            </div>
          ))}
        </div>
      </details>

      <div className="flagship-footer">
        <span className="flagship-role">BUILD / EVALUATION / WRITE-UP</span>
        <div className="flagship-links">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              SOURCE ↗
            </a>
          ) : null}
          {project.paperUrl ? (
            <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">
              REPORT ↗
            </a>
          ) : null}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              DEMO ↗
            </a>
          ) : null}
          <Link href={`/projects/${project.slug}`}>CASE STUDY ↗</Link>
        </div>
      </div>
    </article>
  );
}
