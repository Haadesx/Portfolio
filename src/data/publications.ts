import type { FactConfidence } from '@/lib/portfolio-facts';

export type Publication = {
  id: string;
  title: string;
  /** Display venue, e.g. "Springer / ICDAM 2025". */
  venue: string;
  /** Short conference/journal label used in compact answers. */
  venueShort: string;
  year: number;
  authors: string[];
  authorsLabel: string;
  /** Official paper link. */
  url: string;
  doi: string | null;
  confidence: FactConfidence;
  /** Where the record was verified (from the audit evidence). */
  verification: string;
};

/**
 * Canonical publication record — three verified papers. Titles, venues,
 * author order and links match the homepage Research & publications section.
 * Do not rename, reorder, or add publications without updating this module.
 */
export const publications: Publication[] = [
  {
    id: 'yoga-pose-classification',
    title:
      'OpenPose, PoseNet and MoveNet: the evolution of deep learning methods in yoga pose classification',
    venue: 'Springer / ICDAM 2025',
    venueShort: 'Springer ICDAM 2025',
    year: 2025,
    authors: ['Shah', 'Patel', 'Joshi'],
    authorsLabel: 'Shah, Patel, Joshi',
    url: 'https://doi.org/10.1007/978-3-032-02949-2_2',
    doi: '10.1007/978-3-032-02949-2_2',
    confidence: 'verified',
    verification: 'Verified via Springer / Crossref DOI metadata.',
  },
  {
    id: 'hand-gesture-gaming',
    title: 'Machine learning-based hand gesture recognition for immersive gaming',
    venue: 'IJIRMF 2024',
    venueShort: 'IJIRMF 2024 (NOBCON proceedings)',
    year: 2024,
    authors: ['Varesh Patel'],
    authorsLabel: 'Varesh Patel',
    url: 'https://www.ijirmf.com/wp-content/uploads/NOBCON-2024-min.pdf#page=17',
    doi: null,
    confidence: 'verified',
    verification: 'Verified in the IJIRMF NOBCON-2024 proceedings PDF.',
  },
  {
    id: 'emotion-aware-music',
    title: 'Emotion-aware music recommendations: custom CNN vs VGG16 vs InceptionV3',
    venue: 'IEEE FMLDS 2024',
    venueShort: 'IEEE FMLDS 2024',
    year: 2024,
    authors: ['Varesh Patel', 'Khyati Mehta'],
    authorsLabel: 'Varesh Patel, Khyati Mehta',
    url: 'https://doi.org/10.1109/FMLDS63805.2024.00092',
    doi: '10.1109/FMLDS63805.2024.00092',
    confidence: 'verified',
    verification: 'Verified via IEEE Xplore DOI metadata.',
  },
];

export function getPublicationList(): Publication[] {
  return publications;
}
