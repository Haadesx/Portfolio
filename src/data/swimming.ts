export type SwimmingEvidence = {
  id: string;
  label: string;
  href: string;
  status: string;
  note: string;
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
  {
    id: "west-zone-scootalks",
    label: "SECOND 2015 REPORT ↗",
    href: "https://www.scootalks.com/ajmer/news-detail/7-states-hellip-1000-swimmers-all-set-for-cbse-west-zone-swimming-competition-2015-108",
    status: "EVENT REPORT",
    note: "A second published report on the same championship. It is event context, not proof of individual participation.",
  },
  {
    id: "khel-mahakumbh",
    label: "KHEL MAHAKUMBH PROGRAM ↗",
    href: "https://khelmahakumbh.gujarat.gov.in/",
    status: "PROGRAM CONTEXT",
    note: "Background on Gujarat's competition program only. It is not proof of the 2015 medal or specific qualifying years.",
  },
];

export const swimmingFacts = [
  { value: "~20", label: "YEARS IN THE WATER" },
  { value: "2012", label: "COMPETITIVE SWIMMING BEGAN" },
  { value: "2015", label: "STATE-LEVEL 200m IM MEDAL" },
  { value: "2023–24", label: "UNIVERSITY AQUATICS" },
];

export const swimmingIntro =
  "Before I was building machine learning systems, I was spending hours in the pool. I’ve been swimming since I was three and competing since 2012. From a state-level medal in the 200m Individual Medley to West Zone competition and representing my university, swimming has been one of the most consistent parts of my life.";

export const swimmingAboutParagraphs = [
  "Swimming has been part of my life since I was three years old. Long before I started working with machine learning, I was training in the pool, learning to compete, and building a routine around the sport.",
  "I began competing in 2012 and spent more than a decade participating in swimming competitions across school, district, state, and regional levels.",
  "Through Gujarat’s Khel Mahakumbh, I repeatedly qualified through district-level meets to compete at the state level, particularly across a sustained 2014–2024 period. One of my proudest early achievements was earning a state-level medal in the 200m Individual Medley in 2015.",
  "That same year, I competed at the CBSE West Zone Swimming Championship hosted by Sanskriti – The School in Ajmer.",
  "I continued competing during university. In the 2023–24 season, I represented CVM University through GCET at the South West Zone Inter-University Aquatics Tournament, hosted at SRM University in Chennai.",
  "Swimming has remained a defining part of my life for roughly two decades. It is something I have pursued independently of engineering, and it continues to be an important part of who I am.",
];

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
    id: "khel-circuit",
    marker: "2014–2024 / STATE-LEVEL CIRCUIT",
    period: "2014–2024",
    level: "DISTRICT → STATE",
    title: "Repeated district-to-state qualification",
    detail:
      "Repeated district-to-state qualification through Gujarat’s Khel Mahakumbh swimming competitions. This describes a sustained period, not qualification in every calendar year.",
    status: "ATHLETE ACCOUNT",
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
