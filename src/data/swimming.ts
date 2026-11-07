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
  "Before machine learning, I was in the pool. I started swimming at three and competing in 2012, then kept racing through school and university: repeated district wins, state-level meets through Gujarat’s Khel Mahakumbh, and a 2015 state medal in the 200m individual medley.";

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
      "Swimming has been part of my life since I was three. Long before I worked with machine learning, I was training in the pool, learning to race, and building a routine around it.",
      "I started competing in 2012 and spent more than a decade racing at school, district, state, and regional level.",
    ],
  },
  {
    id: "district-championships",
    title: "District Championships",
    paragraphs: [
      "At district level I kept winning events. In the qualifying years on record, those results included wins across at least three events, and they came before my state appearances.",
      "Through Gujarat’s Khel Mahakumbh I qualified from district meets to the state level repeatedly, especially across a sustained 2014–2024 period. That describes a sustained stretch, not qualification in every calendar year.",
      "The exact years, event names, placements, and lifetime totals are not fully documented.",
    ],
  },
  {
    id: "state-level",
    title: "Competing at State Level",
    paragraphs: [
      "The 2015 state-level medal in the 200m individual medley is still the result I am proudest of. The medal colour, exact placement, and race time are not recorded here.",
    ],
  },
  {
    id: "school-university",
    title: "School and University Competition",
    paragraphs: [
      "That year I also competed at the CBSE West Zone Swimming Championship at Sanskriti – The School in Ajmer.",
      "I kept competing at university. In the 2023–24 season I represented CVM University through GCET at the South West Zone Inter-University Aquatics Tournament at SRM University in Chennai.",
      "Swimming has been part of my life for about two decades. It runs alongside engineering, and it is still something I do for myself.",
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
