import {
  swimmingAboutParagraphs,
  swimmingEvidence,
  swimmingMilestones,
} from "@/data/swimming";

export function SwimmingStory() {
  return (
    <section className="about-swimming" id="swimming" aria-labelledby="about-swimming-title">
      <header className="about-swimming-heading">
        <p className="eyebrow">BEYOND THE CODE / COMPETITIVE SWIMMING</p>
        <h2 id="about-swimming-title">
          Competitive Swimming<span>.</span>
        </h2>
      </header>

      <div className="about-swimming-copy">
        {swimmingAboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="swim-milestones-heading">
        <p className="eyebrow">A PERSONAL TIMELINE / 2006—2024</p>
        <h3>Milestones<span>.</span></h3>
        <p>Ordered chronologically. The record keeps the distinction between independently documented events and athlete-supplied details.</p>
      </div>

      <ol className="swim-timeline" aria-label="Competitive swimming milestones">
        {swimmingMilestones.map((milestone) => (
          <li key={milestone.id}>
            <div className="swim-timeline-marker">
              <span>{milestone.marker}</span>
              <small>{milestone.period}</small>
            </div>
            <div className="swim-timeline-content">
              <div className="swim-timeline-meta">
                <span>{milestone.level}</span>
                {milestone.status ? <span className="swim-status">{milestone.status}</span> : null}
              </div>
              <h4>{milestone.title}</h4>
              <p>{milestone.detail}</p>
              {milestone.venue ? <p className="swim-venue">{milestone.venue}</p> : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="swim-evidence">
        <div className="swim-evidence-heading">
          <p className="eyebrow">RECORDS / EVIDENCE</p>
          <h3>Where to look closer<span>.</span></h3>
          <p>
            The university record is independent. The 2015 reports document the event and its
            dates; they do not name Varesh. The Khel Mahakumbh link is program context only.
          </p>
        </div>
        <div className="swim-evidence-list">
          {swimmingEvidence.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} ${item.status}`}
            >
              <span>{item.status}</span>
              <strong>{item.label}</strong>
              <p>{item.note}</p>
            </a>
          ))}
        </div>
      </div>

      <p className="swim-source-note">
        The 2015 state medal and individual competition participation are athlete-supplied.
        Medal color, race time, placement, and age category are not asserted. Additional
        certificates and result sheets can be added here as they become available.
      </p>
    </section>
  );
}
