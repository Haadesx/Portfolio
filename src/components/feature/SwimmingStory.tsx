import {
  swimmingDistrictAchievement,
  swimmingEvidence,
  swimmingMilestones,
  swimmingStorySections,
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

      <div className="about-swimming-story">
        {swimmingStorySections.map((section) => (
          <div className="swim-story-block" key={section.id}>
            <section
              className="swim-story-section"
              aria-labelledby={`swim-story-${section.id}`}
            >
              <h3 id={`swim-story-${section.id}`}>{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            {section.id === "district-championships" ? (
              <aside
                className="swim-district-card"
                aria-labelledby="district-achievement-title"
              >
                <div className="swim-district-top">
                  <span>DISTRICT / MULTIPLE SEASONS</span>
                  <span>{swimmingDistrictAchievement.evidenceStatus}</span>
                </div>
                <h4 id="district-achievement-title">
                  {swimmingDistrictAchievement.title}
                </h4>
                <p>{swimmingDistrictAchievement.description}</p>
                <div className="swim-district-metric">
                  <strong>
                    ≥{swimmingDistrictAchievement.eventCountPerQualifyingYear.minimumEvents}
                  </strong>
                  <span>EVENTS IN QUALIFYING YEARS</span>
                </div>
                <p className="swim-district-note">
                  {swimmingDistrictAchievement.eventCountPerQualifyingYear.basis} Exact
                  years, event names, placements, and lifetime totals are not yet documented.
                </p>
              </aside>
            ) : null}
          </div>
        ))}
      </div>

      <div className="swim-milestones-heading">
        <p className="eyebrow">A PERSONAL TIMELINE / 2006—2024</p>
        <h3>Milestones<span>.</span></h3>
        <p>
          Selected milestones from a longer competitive history, ordered chronologically. This
          is not a complete event log, and it keeps independently documented events distinct
          from athlete-reported details.
        </p>
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
              {milestone.recurrence ? (
                <p className="swim-recurrence">
                  ≥{milestone.recurrence.minimumEvents} events in qualifying years ·{" "}
                  {milestone.recurrence.basis}
                </p>
              ) : null}
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
            The university record is independent. The 2015 report documents the event and its
            dates; it does not name Varesh. District wins and the 2015 medal are athlete-supplied;
            no individual result sheet is linked yet. Khel Mahakumbh is referenced as program
            context only.
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
        District-level wins and the 2015 state medal are athlete-reported. The ≥3 event figure
        applies to qualifying years described in the athlete’s account, not a lifetime total.
        Medal color, race time, placement, and age category are not asserted. Additional
        certificates and result sheets can be added here as they become available.
      </p>
    </section>
  );
}
