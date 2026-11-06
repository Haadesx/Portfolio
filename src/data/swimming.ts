export type SwimmingEvidence = {
  id: string;
  label: string;
  href: string;
  status: string;
  note: string;
};

export type SwimmingRecurrence = {
  minimumEvents: number;
  basis: string;
};

export type SwimmingMilestone = {
  id: string;
  marker: string;
  title: string;
  level: string;
  period: string;
  detail: string;
  venue?: string;
  status?: string;
  recurrence?: SwimmingRecurrence;
};

export type SwimmingDistrictAchievement = {
  id: string;
  title: string;
  level: string;
  period: string;
  description: string;
  evidenceStatus: string;
  eventCountPerQualifyingYear: SwimmingRecurrence;
  specificYears?: string[];
  evidenceId?: string;
  photograph?: string;
  certificate?: string;
};

export type SwimmingStorySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const swimmingEvidence: SwimmingEvidence[] = [
  {
    id: "cvmu",
    label: "OFFICIAL UNIVERSITY RECORD ↗",
    href: "https://www.ilsass.edu.in/index_files/doc/2025/CVMU_Annual_Reports/CVMU_Annual%20Report_2023-24.pdf#page=202",
    status: "INDEPENDENT RECORD",
    note: "CVM University Annual Report 2023–24, printed page 201, section 7: Aquatics. The PDF page is 202.",
  },
  {
    id: "west-zone-scoonews",
    label: "2015 WEST ZONE TOURNAMENT ↗",
    href: "https://scoonews.com/news/news-cbse-west-zone-swimming-championship-2015-concludes-with-enthu-at-sanskriti-hellip-the-school-112/",
    status: "EVENT REPORT",
    note: "Independent reporting confirms the event, host, and October 3–6, 2015 dates. It does not name Varesh.",
  },
];

export const swimmingFacts = [
  { value: "~20", label: "YEARS IN THE WATER" },
  { value: "2012", label: "COMPETITIVE SWIMMING BEGAN" },
  { value: "2015", label: "STATE-LEVEL 200m IM MEDAL" },
  { value: "2023–24", label: "UNIVERSITY AQUATICS" },
];

export const swimmingProgression = [
  {
    id: "district",
    marker: "01 / DISTRICT",
    title: "Repeated event wins",
    detail: "Multiple competitive seasons",
  },
  {
    id: "state",
    marker: "02 / STATE",
    title: "200m IM medal",
    detail: "Gujarat Khel Mahakumbh · 2015",
  },
  {
    id: "university",
    marker: "03 / UNIVERSITY",
    title: "CVM University",
    detail: "South West Zone · 2023–24",
  },
];

export const swimmingIntro =
  "Before I was building machine learning systems, I was spending hours in the pool. I’ve been swimming since I was three and competing since 2012. Over the years, I repeatedly won district-level events and advanced to state-level competition through Gujarat’s Khel Mahakumbh, later representing my university at an inter-university aquatics tournament.";

export const swimmingDistrictAchievement: SwimmingDistrictAchievement = {
  id: "district-championships",
  title: "Repeated District-Level Champion",
  level: "District",
  period: "Multiple competitive seasons",
  description:
    "Across multiple competitive seasons, I won district-level swimming events and progressed to state-level competition. In the qualifying years described in my competitive history, those district results included wins across at least three events.",
  evidenceStatus: "ATHLETE-REPORTED",
  eventCountPerQualifyingYear: {
    minimumEvents: 3,
    basis: "Athlete-reported. Applies to qualifying years only, not a lifetime total.",
  },
};

export const swimmingStorySections: SwimmingStorySection[] = [
  {
    id: "early-years",
    title: "Early Years in the Pool",
    paragraphs: [
      "Swimming has been part of my life since I was three years old. Long before I started working with machine learning, I was training in the pool, learning to compete, and building a routine around the sport.",
      "I began competing in 2012 and spent more than a decade participating in swimming competitions across school, district, state, and regional levels.",
    ],
  },
  {
    id: "district-championships",
    title: "District Championships",
    paragraphs: [
      "At district level, I repeatedly won events. In the qualifying years described in my competitive history, those district results included wins across at least three events, and they preceded my state-level appearances.",
      "Through Gujarat’s Khel Mahakumbh, I repeatedly qualified through district-level meets to compete at the state level, particularly across a sustained 2014–2024 period. This describes a sustained period, not qualification in every calendar year.",
      "The exact years, event names, placements, and lifetime totals are not yet fully documented.",
    ],
  },
  {
    id: "state-level",
    title: "Competing at State Level",
    paragraphs: [
      "One of my proudest early achievements was earning a state-level medal in the 200m Individual Medley in 2015. The medal’s color, exact placement, and race time are not recorded here.",
    ],
  },
  {
    id: "school-university",
    title: "School and University Competition",
    paragraphs: [
      "That same year, I competed at the CBSE West Zone Swimming Championship hosted by Sanskriti – The School in Ajmer.",
      "I continued competing during university. In the 2023–24 season, I represented CVM University through GCET at the South West Zone Inter-University Aquatics Tournament, hosted at SRM University in Chennai.",
      "Swimming has remained a defining part of my life for roughly two decades. It is something I have pursued independently of engineering, and it continues to be an important part of who I am.",
    ],
  },
];

// Kept as a flat export for compatibility with earlier content consumers.
export const swimmingAboutParagraphs = swimmingStorySections.flatMap(
  (section) => section.paragraphs,
);

export const swimmingMilestones: SwimmingMilestone[] = [
  {
    id: "beginning",
    marker: "AGE 03 / THE BEGINNING",
    period: "c. 2006",
    level: "PERSONAL",
    title: "Started swimming",
    detail: "Began swimming at approximately three years old, around 2006.",
    status: "ATHLETE ACCOUNT",
  },
  {
    id: "competitive",
    marker: "2012 / COMPETITIVE SWIMMING",
    period: "2012",
    level: "SCHOOL",
    title: "Began organized competition",
    detail: "Started competing in school-level swimming competitions.",
    status: "ATHLETE ACCOUNT",
  },
  {
    id: "district-championships",
    marker: "2010s–2020s / DISTRICT → STATE",
    period: "2010s–2020s",
    level: "DISTRICT → STATE",
    title: "District championships and state progression",
    detail:
      "Across multiple competitive seasons, including a sustained 2014–2024 period, won district-level events and advanced to Gujarat state-level competition. In qualifying years, results included wins across at least three events. Exact years and event names are not yet documented.",
    status: "ATHLETE-REPORTED",
    recurrence: {
      minimumEvents: 3,
      basis: "Athlete-reported. Qualifying years only, not a lifetime total.",
    },
  },
  {
    id: "state-medal",
    marker: "2015 / STATE MEDAL",
    period: "2015",
    level: "STATE",
    title: "200m Individual Medley medal",
    detail:
      "Earned a medal at the state-level Khel Mahakumbh swimming competition in the 200m Individual Medley. Medal color, exact placement, and race time are not recorded here.",
    status: "ATHLETE-SUPPLIED",
  },
  {
    id: "west-zone",
    marker: "OCTOBER 2015 / WEST ZONE",
    period: "OCTOBER 2015",
    level: "SCHOOL / WEST ZONE",
    title: "CBSE West Zone Swimming Championship",
    detail:
      "Competed at the CBSE West Zone Swimming Championship. Independent reports confirm the event was held October 3–6, 2015.",
    venue: "Sanskriti – The School, Ajmer, Rajasthan",
    status: "EVENT REPORTED / PARTICIPATION ATHLETE-SUPPLIED",
  },
  {
    id: "university",
    marker: "2023–24 / UNIVERSITY REPRESENTATION",
    period: "DEC 31, 2023 – JAN 6, 2024",
    level: "UNIVERSITY",
    title: "South West Zone Inter-University Aquatics",
    detail:
      "Represented CVM University through GCET at the South West Zone Inter-University Aquatics Tournament during the 2023–24 season.",
    venue: "SRM University, Chennai",
    status: "INDEPENDENTLY DOCUMENTED",
  },
];
