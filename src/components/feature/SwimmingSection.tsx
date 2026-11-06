import Link from "next/link";
import {
  swimmingEvidence,
  swimmingFacts,
  swimmingIntro,
  swimmingProgression,
} from "@/data/swimming";

export function SwimmingSection() {
  const universityRecord = swimmingEvidence.find((item) => item.id === "cvmu");

  return (
    <section
      className="editorial-section reference-swimming"
      id="swimming"
      aria-labelledby="swimming-title"
    >
      <div className="swim-layout">
        <div className="swim-copy" data-reveal>
          <p className="eyebrow">BEYOND THE CODE / COMPETITIVE SWIMMING</p>
          <h2 id="swimming-title" data-decode>
            Two Decades in the Water<span>.</span>
          </h2>
          <p className="swim-lede">{swimmingIntro}</p>

          <ol className="swim-progression" aria-label="Competitive progression">
            {swimmingProgression.map((step) => (
              <li key={step.id}>
                <span>{step.marker}</span>
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </li>
            ))}
          </ol>

          <div className="swim-medal">
            <span>2015 / STATE LEVEL</span>
            <h3>200m Individual Medley medal</h3>
            <p>Gujarat Khel Mahakumbh · State-level competition</p>
            <small>Medal color, race time, and placement are not recorded here.</small>
          </div>

          <div className="swim-university">
            <span>2023–24 / UNIVERSITY REPRESENTATION</span>
            <p>
              Represented CVM University through GCET at the South West Zone
              Inter-University Aquatics Tournament, SRM University, Chennai.
            </p>
            {universityRecord ? (
              <a
                href={universityRecord.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                OFFICIAL UNIVERSITY RECORD ↗
              </a>
            ) : null}
          </div>

          <div className="swim-actions">
            <Link className="text-link" href="/about#swimming">
              Read the full swimming story ↗
            </Link>
          </div>
        </div>

        <div className="swim-visual" data-reveal aria-hidden="true">
          <svg viewBox="0 0 560 460" role="presentation" focusable="false">
            <defs>
              <linearGradient id="swim-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#151515" />
                <stop offset="1" stopColor="#0d0d0d" />
              </linearGradient>
              <radialGradient id="swim-glow" cx="50%" cy="48%" r="55%">
                <stop offset="0" stopColor="#7de0e6" stopOpacity=".1" />
                <stop offset="1" stopColor="#7de0e6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="560" height="460" fill="url(#swim-fade)" />
            <rect width="560" height="460" fill="url(#swim-glow)" />
            {[86, 146, 206, 266, 326, 386].map((y, index) => (
              <path
                key={y}
                d={`M-30 ${y} C 110 ${y - 22}, 284 ${y + 22}, 590 ${y - 8}`}
                fill="none"
                stroke={index === 2 ? "#f15b4e" : "#7de0e6"}
                strokeOpacity={index === 2 ? .7 : .27}
                strokeWidth={index === 2 ? 1.2 : .8}
              />
            ))}
            <path d="M72 0V460M488 0V460" stroke="#f15b4e" strokeOpacity=".28" strokeWidth="1" />
            <circle cx="280" cy="236" r="106" fill="none" stroke="#7de0e6" strokeOpacity=".2" />
            <circle cx="280" cy="236" r="74" fill="none" stroke="#7de0e6" strokeOpacity=".14" />
            <circle cx="280" cy="236" r="42" fill="none" stroke="#f15b4e" strokeOpacity=".45" />
            <circle cx="280" cy="236" r="3" fill="#f15b4e" />
            <path d="M174 236H386" stroke="#7de0e6" strokeOpacity=".18" />
            <path d="M280 130V342" stroke="#7de0e6" strokeOpacity=".18" />
            <text x="72" y="46" fill="#7de0e6" fillOpacity=".6" fontSize="10" fontFamily="monospace" letterSpacing="2">
              WATER / 2006—
            </text>
            <text x="488" y="430" fill="#f15b4e" fillOpacity=".8" fontSize="10" fontFamily="monospace" letterSpacing="2" textAnchor="end">
              200m IM / 2015
            </text>
          </svg>
          <span className="swim-visual-caption">POOL GEOMETRY / PERSONAL HISTORY</span>
        </div>
      </div>

      <ul className="swim-ledger" data-reveal aria-label="Swimming milestones">
        {swimmingFacts.map((fact) => (
          <li key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
