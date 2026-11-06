import type { FactConfidence } from '@/lib/portfolio-facts';

export type ExperienceKind = 'internship' | 'ambassadorship' | 'leadership';

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  kind: ExperienceKind;
  period: string;
  start: string;
  end: string | null;
  concurrent: boolean;
  highlights: string[];
  confidence: FactConfidence;
};

/**
 * Canonical experience record, newest first. `period`/`start` are display and
 * ordering metadata only; the array order is the published order.
 *
 * Impruvon Health (Summer 2026) is the most recent role. The site, the served
 * résumé, and this module must agree on that fact.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'impruvon-health',
    company: 'Impruvon Health',
    role: 'AI & Software Development Intern',
    kind: 'internship',
    period: 'Summer 2026',
    start: '2026',
    end: null,
    concurrent: false,
    highlights: [
      'Built a Python and FastMCP integration exposing nine typed tools for operational and transformed HL7 queries.',
      'Implemented multi-location analytics across orders, dispenses, patient records, and clinical data.',
      'Automated pull-request demos with Playwright recordings and validated narrated walkthroughs.',
    ],
    confidence: 'documented',
  },
  {
    id: 'adobe',
    company: 'Adobe',
    role: 'Campus Ambassador',
    kind: 'ambassadorship',
    period: '2025 – 2026',
    start: '2025',
    end: '2026',
    concurrent: true,
    highlights: [
      'Created content around Adobe Express and ran workshops for the Rutgers student community.',
    ],
    confidence: 'documented',
  },
  {
    id: 'foundation-for-ecological-security',
    company: 'Foundation for Ecological Security',
    role: 'AI Intern',
    kind: 'internship',
    period: 'Jan 2025 – May 2025',
    start: '2025-01',
    end: '2025-05',
    concurrent: false,
    highlights: [
      'Built an AI bird-species classification system for IBIS 2.0 on a ~710 GB image dataset spanning ~1,150 species.',
      'Developed a two-stage deep learning pipeline reaching ~79% validation accuracy.',
      'Delivered Gradio GUI and CLI interfaces for researchers.',
    ],
    confidence: 'documented',
  },
  {
    id: 'arcascope',
    company: 'Arcascope',
    role: 'AI Intern',
    kind: 'internship',
    period: 'Oct 2024 – Jan 2025',
    start: '2024-10',
    end: '2025-01',
    concurrent: false,
    highlights: [
      'Built a fatigue-prediction pipeline on heart-rate and step data from 135 participants and evaluated ~20 model iterations.',
      'Reduced MAE from 1.17 to 0.25 (about a 78% reduction) with a PyTorch model using CORAL layers and ordinal losses.',
      'Reached 85% accuracy and engineered features with Runge–Kutta integration.',
    ],
    confidence: 'documented',
  },
  {
    id: 'ieee-gcet-student-branch',
    company: 'IEEE GCET Student Branch',
    role: 'Secretary',
    kind: 'leadership',
    period: 'Dec 2023 – Dec 2024',
    start: '2023-12',
    end: '2024-12',
    concurrent: false,
    highlights: [
      'Organized more than 39 technical and networking events and coordinated branch operations and communications.',
    ],
    confidence: 'documented',
  },
];

/** The most recent role (newest first). */
export const mostRecentExperience = experience[0];

export function getExperience(): ExperienceEntry[] {
  return experience;
}

export function getMostRecentExperienceEntry(): ExperienceEntry {
  return mostRecentExperience;
}
