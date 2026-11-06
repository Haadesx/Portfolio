import type { UIMessage } from 'ai';

import { experience } from '@/data/experience';
import { education } from '@/data/education';
import { publications } from '@/data/publications';
import { varesh } from '@/data/varesh';
import { getProjectCount, getAwards } from '@/lib/portfolio-facts';
import { OFF_TOPIC_REPLY, isStrongOffTopicTask } from '@/lib/chat/scope';

/**
 * Deterministic answers for clear factual or protected intents.
 *
 * These run BEFORE any model call. They are intentionally narrow: only the
 * last user message is inspected, and an unmatched message returns `null`
 * (the model then answers with the canonical facts layer).
 */
export type DeterministicReply = {
  text: string;
  category: string;
};

const recent = experience[0];
const second = experience[1];
const third = experience[2];
const fourth = experience[3];

const VISA_PATTERN =
  /\b(visas?|sponsor(ship|s|ed|ing)?|work[- ]authori[sz]ation|authori[sz]ed to work|immigration|green card|citizenship|citizen|permanent resident|f-?1|stem opt|opt|cpt|h-?1b|tn visa)\b/;

const COMMITMENT_PATTERN =
  /\b(i accept|accept (this|the|your|an) (offer|job|position|role)|accepts? the offer|negotiate|negotiation|salary|compensation|promise|guarantee|commit(ment)?|confirm (his )?(availability|relocation|start date)|available immediately|willing to relocate|relocat(e|ion)|start date|sign (this|the|an)|send (this|the|an) (email|message)|speak (on his behalf|for him)|on his behalf|agree to (a|the|\$)|reply ['"]i accept)/;

const IDENTITY_PATTERN =
  /\b(are you (varesh|patel|the real|a human|human|an ai|ai|a bot|a robot|real)|am i (talking|speaking) to|real varesh|actual person|human or (an )?ai|who are you|what are you(?!\s+(working|building|doing|looking|studying|planning))|tell me about yourself|introduce yourself|what('| i)?s your name|what do you do)\b/;

const PUBLICATION_TERMS =
  /\b(publications?|published|peer[- ]reviewed|research papers?|authored papers?)\b/;
const PAPER_WORDS = /\bpapers?\b/;
const PUBLICATION_CONTEXT =
  /\b(venues?|journals?|conferences?|citations?|dois?|icdam|ijirmf|ieee|springer|authored|written|wrote|publish(ed|ing)?)\b/;

const MOST_RECENT_PATTERN =
  /\b(most recent (role|job|position|experience|internship)|current (role|job|position|employer)|where (do|does) (you|varesh|he) work|where (are|is) (you|varesh|he) working|what (do|does) (you|varesh|he) do now|currently employed|are you employed|still working|latest (role|job|internship)|last (role|job|internship)|impruvon|did (you|he) intern at|work right now|work now)\b/;

const EXPERIENCE_LIST_PATTERN =
  /\b(experience|work history|professional background|internships?|intern\b|worked at|companies|employers|career|roles? (have|has) (you|he) (had|worked))\b/;

const EDUCATION_PATTERN =
  /\b(education|gpa|cgpa|degree|degrees|university|college|rutgers|gh patel|g\.h\. patel|coursework|academic|school|studying|studied)\b/;

const AVAILABILITY_PATTERN =
  /\b((what|which|any)\b[^?]{0,40}\b(internships?|roles?|jobs?|positions?|work)\b[^?]{0,40}\b(looking for|targeting|interested in|want|seeking|open to)\b|(looking for|targeting|seeking|interested in|open to)\b[^?]{0,40}\b(internships?|roles?|jobs?|positions?|work)\b|(what|which) (is|are) (you|he|varesh) looking for|availability|available for)\b/;

const SWIMMING_PATTERN =
  /\b(swim|swims|swimming|swimmer|pool|aquatics|medals?|athlete|athletics|sports?|individual medley|khel mahakumbh|west zone|inter-university)\b/;

const PROJECT_COUNT_PATTERN =
  /\b(how many|number of|count of|total)\b[^?]{0,40}\b(projects?|case stud(y|ies)|repositor(y|ies))\b/;

const AWARDS_PATTERN =
  /\b(awards?|honors?|prizes?|winners?|hackathons?|devpost|bitcamp|hackhers|recognition|won(?!['’]t))\b/;

const AGE_PATTERN = /\b(how old|age|birthday|born|birth year)\b/;

const CONTACT_PATTERN =
  /\b(contact|email|e-mail|linkedin|github|resume|résumé|curriculum vitae|cv|reach (him|out)|get in touch|phone|address|hire|hiring|recruiter|interview|location|based in|where (is|are) (he|you|varesh) based)\b/;

const PROJECT_NAMES =
  /\b(diffullm|diffusion[- ]model|iconoclast|carewatch|eyeq|medcheck|healthtwin|h-swarm|m-agent|zypher|edge ?ai|webgpu|lootqdm|crucible|ibis|fatigue|pdfhelper|pdf helper|emotion[- ]spotify|payment liveness|can'?t hackher|event[- ]based|pose estimation)\b/;



function reply(text: string, category: string): DeterministicReply {
  return { text, category };
}

function getLastUserText(messages: UIMessage[]): string | null {
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user') return null;
  const text = (last.parts ?? [])
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join(' ')
    .trim();
  return text.length > 0 ? text : null;
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

const IDENTITY_REPLY = `I'm an AI assistant and the guide to Varesh Patel's portfolio — not Varesh, and no human is present in this chat. I can walk you through his ML/CV projects, research publications, internships, skills, athletics, and how to reach him. What would you like to explore?`;

const VISA_REPLY = `I can't answer immigration or work-authorization questions. That's a personal status the portfolio doesn't document, and I won't guess. Please ask Varesh directly: **${varesh.email}** or [LinkedIn](${varesh.linkedin}).`;

const COMMITMENT_REPLY = `I can't accept offers, negotiate, confirm availability or start dates, or speak for Varesh — only he can make those commitments. Please contact him directly: **${varesh.email}** or [LinkedIn](${varesh.linkedin}).`;

const PUBLICATIONS_REPLY = [
  `Varesh has **${publications.length} verified publications**:`,
  '',
  ...publications.map(
    (publication) =>
      `- **${publication.venueShort}** — "${publication.title}" (${publication.authorsLabel}). [Official link](${publication.url})`,
  ),
  '',
  'They are linked on the homepage under Research & publications. Citation counts are not tracked in the portfolio data.',
].join('\n');

const MOST_RECENT_REPLY = `Most recent: **${recent.company} — ${recent.role} (${recent.period})**. Concurrently, **${second.company}** (${second.role}, ${second.period}). Before that: **${third.company}** (${third.role}, ${third.period}) and **${fourth.company}** (${fourth.role}, ${fourth.period}). He is currently an M.S. computer science student at Rutgers, not a full-time employee. Full timeline: /#experience.`;

const EXPERIENCE_REPLY = [
  `Newest first: ${experience
    .map((entry) => `${entry.company} (${entry.role}, ${entry.period}${entry.concurrent ? ', concurrent' : ''})`)
    .join(' → ')}.`,
  '',
  `Full detail: /#experience. Varesh is interested in ${varesh.lookingFor.slice(0, 3).join(', ')}; only he can confirm availability.`,
].join('\n');

const EDUCATION_REPLY = [
  `Varesh is pursuing an **${education[0].degree} in ${education[0].field} at ${education[0].school}** (${education[0].period}, ${education[0].location}) with a **${education[0].gpa?.label} of ${education[0].gpa?.value}/${education[0].gpa?.scale}**, as documented on the site.`,
  `He earned a **${education[1].degree} in ${education[1].field} at ${education[1].school}** (${education[1].period}) with a **${education[1].gpa?.label} of ${education[1].gpa?.value}/${education[1].gpa?.scale}**.`,
  'Details: /about.',
].join(' ');

const AVAILABILITY_REPLY = `Varesh is interested in ${varesh.lookingFor.join(', ')}. Most recent: **${recent.company} — ${recent.role} (${recent.period})**. I can describe these interests, but I can't confirm availability, start dates, relocation, compensation, or any commitment — only he can. Contact him at **${varesh.email}** or [LinkedIn](${varesh.linkedin}).`;

const SWIMMING_REPLY = `Varesh has been swimming since about age 3 (c. 2006) and competing since 2012. He repeatedly won district events and advanced to Gujarat state competition across a sustained 2014–2024 period (athlete-reported), with a 2015 state-level 200m IM medal at Khel Mahakumbh — medal color, placement, and time aren't recorded. In October 2015 he competed at the CBSE West Zone championship, and in 2023–24 he represented CVM University/GCET at the South West Zone Inter-University Aquatics (SRM Chennai), which the CVMU annual report documents. Full story: /#swimming.`;

const PROJECT_COUNT_REPLY = `Varesh's portfolio has **${getProjectCount()} curated case studies** — from the DiffuLLM and ICONOCLAST research builds to CareWatch, MedCheck, HealthTwin, and earlier applied work. Browse them at /projects.`;

const AWARDS_REPLY = [
  'Varesh has two externally verified hackathon awards:',
  '',
  ...getAwards().map(
    (award) =>
      `- **${award.event} — ${award.award}** (${award.project}); verified on Devpost: ${award.source}`,
  ),
  '',
  'Those are the only awards documented in the portfolio data. See /#recognition.',
].join('\n');

const AGE_REPLY = `Varesh is **23 years old** as of November 2026.`;

const CONTACT_REPLY = `Best professional contact: **${varesh.email}**, [LinkedIn](${varesh.linkedin}), or [GitHub](${varesh.github}). The served résumé is [PDF](${varesh.resume.path}), updated ${varesh.resume.updated}. Email or LinkedIn is the fastest route; the assistant doesn't share a phone number or home address.`;

function isPublicationIntent(text: string): boolean {
  if (PUBLICATION_TERMS.test(text)) return true;
  if (PROJECT_NAMES.test(text) && !/\b(publications?|peer[- ]reviewed|publish(ed|ing)?)\b/.test(text)) {
    return false;
  }
  return PAPER_WORDS.test(text) && PUBLICATION_CONTEXT.test(text);
}

/**
 * Returns a deterministic reply for the last user message, or `null` when the
 * intent is not clearly deterministic. Never calls a model.
 */
export function getDeterministicReply(messages: UIMessage[]): DeterministicReply | null {
  const raw = getLastUserText(messages);
  if (!raw) return null;
  const text = normalize(raw);

  // Protected and safety-critical intents come first: they must not depend on
  // model behaviour or be displaced by a differently-phrased question.
  if (VISA_PATTERN.test(text)) return reply(VISA_REPLY, 'visa');
  if (COMMITMENT_PATTERN.test(text)) return reply(COMMITMENT_REPLY, 'commitment');
  if (isStrongOffTopicTask(text)) return reply(OFF_TOPIC_REPLY, 'off-topic');

  if (IDENTITY_PATTERN.test(text)) return reply(IDENTITY_REPLY, 'identity');
  if (isPublicationIntent(text)) return reply(PUBLICATIONS_REPLY, 'publications');
  if (MOST_RECENT_PATTERN.test(text)) return reply(MOST_RECENT_REPLY, 'most-recent-role');
  if (AVAILABILITY_PATTERN.test(text)) return reply(AVAILABILITY_REPLY, 'availability');
  // Swimming before the broader education pattern: "university aquatics" must
  // be answered as athletics, not as a degree question.
  if (SWIMMING_PATTERN.test(text)) return reply(SWIMMING_REPLY, 'swimming');
  if (EDUCATION_PATTERN.test(text)) return reply(EDUCATION_REPLY, 'education');
  if (EXPERIENCE_LIST_PATTERN.test(text)) return reply(EXPERIENCE_REPLY, 'experience');
  if (PROJECT_COUNT_PATTERN.test(text)) return reply(PROJECT_COUNT_REPLY, 'project-count');
  if (AWARDS_PATTERN.test(text)) return reply(AWARDS_REPLY, 'awards');
  if (AGE_PATTERN.test(text)) return reply(AGE_REPLY, 'age');
  if (CONTACT_PATTERN.test(text)) return reply(CONTACT_REPLY, 'contact');

  return null;
}
