import { ExperienceTimeline } from "./ExperienceTimeline";

const capabilities = [
  {
    title: "Training and evaluation",
    body: "Trained language and vision models from scratch, including a discrete diffusion LM on a multi-GPU SLURM cluster, and wrote the evaluation that showed where it failed.",
  },
  {
    title: "Computer vision",
    body: "Built pose, detection, OCR, and classification pipelines for real datasets, from 710 GB of bird imagery to real-time caregiver monitoring.",
  },
  {
    title: "Applied AI and interfaces",
    body: "Shipped the software around the model: a nine-tool MCP integration at Impruvon Health, React dashboards, and FastAPI services.",
  },
];

export function ExperienceCapabilities() {
  return (
    <>
      <div className="experience-panel" data-reveal>
        <ExperienceTimeline />
      </div>
      <div className="capability-panel" data-reveal>
        <p className="eyebrow">WHAT I CAN DO / EVIDENCE</p>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <div key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </div>
          ))}
        </div>
        <p className="capability-stack">
          <span>STACK</span> Python, PyTorch, OpenCV, TypeScript, React, FastAPI, Docker, SLURM.
        </p>
      </div>
    </>
  );
}
