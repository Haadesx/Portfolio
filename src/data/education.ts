import type { FactConfidence } from '@/lib/portfolio-facts';

export type EducationStatus = 'in-progress' | 'completed';

export type EducationGpa = {
  label: string;
  value: string;
  scale: string;
};

export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  start: string;
  end: string | null;
  status: EducationStatus;
  gpa: EducationGpa | null;
  confidence: FactConfidence;
  note: string;
};

/**
 * Canonical education record. The GPA figures are the ones published on the
 * site (about page / résumé). Treat them as documented, not independently
 * verified by a registrar.
 */
export const education: EducationEntry[] = [
  {
    id: 'rutgers',
    school: 'Rutgers University',
    degree: 'M.S.',
    field: 'Computer Science',
    location: 'New Brunswick, NJ',
    period: 'Sep 2025 – May 2027 (expected)',
    start: '2025-09',
    end: '2027-05',
    status: 'in-progress',
    gpa: { label: 'GPA', value: '3.98', scale: '4.00' },
    confidence: 'documented',
    note: 'Graduate program in progress; expected graduation May 2027.',
  },
  {
    id: 'gh-patel',
    school: 'G.H. Patel College of Engineering and Technology',
    degree: 'B.Tech',
    field: 'Computer Science & Design',
    location: 'Anand, Gujarat, India',
    period: 'Sep 2021 – Apr 2025',
    start: '2021-09',
    end: '2025-04',
    status: 'completed',
    gpa: { label: 'CGPA', value: '8.3', scale: '10' },
    confidence: 'documented',
    note: 'Undergraduate degree completed April 2025.',
  },
];

export function getEducation(): EducationEntry[] {
  return education;
}
