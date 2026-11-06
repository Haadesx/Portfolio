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
    { label: "01 / PROBLEM", text: curation.problem },
    { label: "02 / MY CONTRIBUTION", text: curation.contribution },
    { label: "03 / METHOD", text: curation.method },
    { label: "04 / EVIDENCE", text: curation.evaluation },
    { label: "05 / LIMITATIONS", text: curation.limitation },
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

      <div className="flagship-detail-grid">
        {detailCells.map((cell) => (
          <div className="flagship-detail" key={cell.label}>
            <span>{cell.label}</span>
            <p>{cell.text}</p>
          </div>
        ))}
      </div>

      <div className="flagship-footer">
        <span className="flagship-role">RESEARCH / BUILD / EVALUATION</span>
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
          <Link href={`/projects/${project.slug}`}>FULL CASE STUDY ↗</Link>
        </div>
      </div>
    </article>
  );
}
