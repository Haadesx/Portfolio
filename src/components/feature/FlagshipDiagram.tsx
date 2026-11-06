export function FlagshipDiagram({ variant }: { variant: "diffusion" | "carewatch" | "representation" }) {
  if (variant === "diffusion") {
    return (
      <div className="flagship-diagram" aria-hidden="true">
        <p className="diagram-label">MASKED RECONSTRUCTION / ITERATIVE UNMASKING</p>
        <div className="diagram-token-row">
          <span>title</span>
          <span>ingredients</span>
          <span className="is-masked">MASK</span>
          <span className="is-masked">MASK</span>
        </div>
        <p className="diagram-arrow">↓ denoise</p>
        <div className="diagram-token-row">
          <span>title</span>
          <span>ingredients</span>
          <span>simmer</span>
          <span>serve</span>
        </div>
        <p className="diagram-foot">D3PM · ABSORBING [MASK] · BIDIRECTIONAL TRANSFORMER</p>
      </div>
    );
  }

  if (variant === "carewatch") {
    return (
      <div className="flagship-diagram" aria-hidden="true">
        <p className="diagram-label">EVIDENCE PATH / HUMAN-IN-THE-LOOP</p>
        <div className="diagram-pipeline">
          <span>VIDEO</span>
          <i>→</i>
          <span>POSE</span>
          <i>→</i>
          <span>MOTION</span>
          <i>→</i>
          <span>SCENE</span>
          <i>→</i>
          <span>REVIEW</span>
        </div>
        <p className="diagram-foot">YOLOV8 POSE · 30-SECOND BUFFER · ALERT + CLIP</p>
      </div>
    );
  }

  return (
    <div className="flagship-diagram" aria-hidden="true">
      <p className="diagram-label">BENIGN-SUBSPACE PRESERVING EDIT</p>
      <div className="diagram-representation">
        <div>
          <span>RESIDUAL</span>
          <i />
          <i />
          <i />
        </div>
        <b>→</b>
        <div>
          <span>DIRECTION</span>
          <i className="is-wide" />
        </div>
        <b>→</b>
        <div>
          <span>EDIT</span>
          <i />
          <i className="is-wide" />
        </div>
      </div>
      <p className="diagram-foot">CONTRASTIVE ACTIVATIONS · LoRA EDIT · KL + REFUSAL EVAL</p>
    </div>
  );
}
