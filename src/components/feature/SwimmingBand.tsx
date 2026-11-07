import Link from "next/link";
import {
  swimmingEvidence,
  swimmingFacts,
  swimmingIntro,
  swimmingProgression,
} from "@/data/swimming";

export function SwimmingBand() {
  const universityRecord = swimmingEvidence.find((item) => item.id === "cvmu");

  return (
    <div className="swim-band" data-reveal>
      <div className="swim-band-copy">
        <p className="eyebrow">BEYOND ENGINEERING / COMPETITIVE SWIMMING</p>
        <h3>
          Two decades in the water<span>.</span>
        </h3>
        <p className="swim-band-lede">{swimmingIntro}</p>

        <ol className="swim-progression" aria-label="Competitive progression">
          {swimmingProgression.map((step) => (
            <li key={step.id}>
              <span>{step.marker}</span>
              <strong>{step.title}</strong>
              <small>{step.detail}</small>
            </li>
          ))}
        </ol>

        <ul className="swim-ledger" aria-label="Swimming milestones">
          {swimmingFacts.map((fact) => (
            <li key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </li>
          ))}
        </ul>

        <div className="swim-band-links">
          <Link className="text-link" href="/about#swimming">
            Read the full swimming story ↗
          </Link>
          {universityRecord ? (
            <a
              className="text-link"
              href={universityRecord.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official university record ↗
            </a>
          ) : null}
        </div>
      </div>

      <div className="swim-band-visual" aria-hidden="true">
        <svg viewBox="0 0 560 400" role="presentation" focusable="false">
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
          <rect width="560" height="400" fill="url(#swim-fade)" />
          <rect width="560" height="400" fill="url(#swim-glow)" />
          {[70, 122, 174, 226, 278, 330].map((y, index) => (
            <path
              key={y}
              d={`M-30 ${y} C 110 ${y - 20}, 284 ${y + 20}, 590 ${y - 7}`}
              fill="none"
              stroke={index === 2 ? "#f15b4e" : "#7de0e6"}
              strokeOpacity={index === 2 ? 0.7 : 0.27}
              strokeWidth={index === 2 ? 1.2 : 0.8}
            />
          ))}
          <path d="M72 0V400M488 0V400" stroke="#f15b4e" strokeOpacity=".28" strokeWidth="1" />
          <circle cx="280" cy="200" r="96" fill="none" stroke="#7de0e6" strokeOpacity=".2" />
          <circle cx="280" cy="200" r="66" fill="none" stroke="#7de0e6" strokeOpacity=".14" />
          <circle cx="280" cy="200" r="38" fill="none" stroke="#f15b4e" strokeOpacity=".45" />
          <circle cx="280" cy="200" r="3" fill="#f15b4e" />
          <path d="M184 200H376" stroke="#7de0e6" strokeOpacity=".18" />
          <path d="M280 104V296" stroke="#7de0e6" strokeOpacity=".18" />
          <text x="72" y="42" fill="#7de0e6" fillOpacity=".6" fontSize="10" fontFamily="monospace" letterSpacing="2">
            WATER / SINCE 2006
          </text>
          <text x="488" y="376" fill="#f15b4e" fillOpacity=".8" fontSize="10" fontFamily="monospace" letterSpacing="2" textAnchor="end">
            200m IM / 2015
          </text>
        </svg>
        <span className="swim-visual-caption">POOL GEOMETRY / PERSONAL HISTORY</span>
      </div>
    </div>
  );
}
