import type { UIMessage } from 'ai';

import { getProjectCount } from '@/lib/portfolio-facts';

/**
 * Deterministic pre-generation scope gate.
 *
 * The assistant is a narrow-purpose guide to Varesh's portfolio. This module
 * decides — before any model call — whether a request is in scope, a strong
 * off-topic task, or a first message that needs portfolio context.
 *
 * Design notes:
 * - Strong off-topic tasks block even when prefixed with "I'm recruiting",
 *   "first answer this", a fake authority claim, or prior in-scope context.
 * - Follow-ups inherit scope from earlier in-scope user turns.
 * - Detection combines multiple patterns/word boundaries; no single keyword
 *   is allowed to decide an outcome.
 */
export type ScopeDecision =
  | { allowed: true }
  | { allowed: false; category: 'off-topic' | 'needs-portfolio-context'; reply: string };

export const OFF_TOPIC_REPLY = `I'm the AI guide for Varesh's portfolio, so I can't take on coding, homework, writing, translation, or other general-assistant work. I'm happy to go deep on his work instead — for example DiffuLLM's diffusion training, ICONOCLAST's evaluation, CareWatch's limits, or his ML experience.`;

const NEEDS_CONTEXT_REPLY = `I'm the AI guide for Varesh Patel's portfolio, so I can help with his background, ${getProjectCount()} curated case studies, research publications, experience, skills, athletics, hiring fit, and contact details. What would you like to explore? Try "What are his strongest projects?", "What has he published?", or "Would he be a good fit for a computer-vision role?"`;

const STRONG_OFF_TOPIC_PATTERNS: RegExp[] = [
  // Named algorithm/coding-exercise tasks.
  /\b(bubble sort|quick ?sort|merge sort|insertion sort|selection sort|binary search tree|linked list|fizzbuzz|two[- ]sum|leetcode|hash table|dynamic programming)\b/,
  // Explicit coding-task framing (recruiter tests, "coding question", assessments).
  /\b(coding|programming) (question|challenge|assessment|exercise|test|interview|problem|task)\b/,
  /\bsolve (this|the|that) (coding|programming|leetcode|algorithm|data structure)\b/,
  /\bhomework help\b/,
  /\b(answer|solve|do)\b[^.?]{0,20}\b(this|the following)\b[^.?]{0,30}\b(coding|programming|question|problem|homework|exercise)\b/,
  /\b(answer|solve|do)\b[^.?]{0,20}\b(this|the following)\b[^?]{0,40}\b(then|first|before)\b[^?]{0,60}\b(portfolio|varesh|projects?|about him|his work)\b/,
  // "write/give me/build ... code/program/component/..." requests.
  /\b(write|give me|create|implement|build|provide|generate|debug|fix|refactor)\b[^.?]{0,60}\b(code|program|script|function|implementation|component|algorithm|class|query|solution|app|api|module)\b/,
  /\b(code|implementation|function|script|program)\b[^.?]{0,25}\bfor (me|him|us)\b/,
  // "Python code", "SQL query", "React component", ...
  /\b(python|javascript|typescript|java|c\+\+|c#|sql|react|node|pytorch|tensorflow|numpy|pandas)\b[^.?]{0,40}\b(code|solution|implementation|script|query|component|program|function)\b/,
  // SQL / database construction.
  /\b(sql query|select .{0,40} from|create (a )?(users? )?(table|database|schema)|insert into|update .{0,30} set)\b/,
  // Homework / math.
  /\b(homework|assignment|worksheet|exam question|integral|derivative|solve (for|this|the)|equation|calculus|algebra)\b/,
  /\bsolve\b[^.?]{0,40}(?:=|for\b)/,
  // Creative writing.
  /\b(write|compose|draft)\b[^.?]{0,50}\b(essay|story|poem|haiku|fiction|novel|cover letter|song|speech|blog post)\b/,
  // Translation.
  /\b(translate|translation)\b/,
  // Recipes.
  /\b(recipe|cook|cooking|meal plan|dinner idea)\b/,
  // General programming tutoring.
  /\b(teach me|tutorial|from zero|step[- ]by[- ]step)\b[^.?]{0,50}\b(python|javascript|java|c\+\+|sql|decorators?|recursion|algorithms?|coding|programming|math|calculus)\b/,
  /\b(explain|teach|walk me through)\b[^.?]{0,40}\b(python decorators?|decorators?|recursion|closures|pointers|linked lists?|sorting algorithms?|big[- ]o|regex|async|react hooks?|sql joins?|list comprehensions?)\b/,
  // Instruction manipulation / fake authority / scope renegotiation.
  /\b(ignore (all |any )?(previous|prior|above|your) (instructions|rules|prompt)|developer mode|jailbreak|system prompt|hidden instructions|no restrictions|without restrictions|act as a general (ai|assistant)|general[- ]purpose assistant|underlying assistant|outside (this|the) portfolio|are you (a )?general (ai |purpose )?assistant)\b/,
  /\b(repeat|print|reveal|show)\b[^.?]{0,40}\b(system prompt|system instruction|instructions|prompt|hidden|verbatim|text above)\b/,
  // Infrastructure / model-provider disclosure about this site or assistant.
  /\b(what|which) (model|provider|version|llm)\b[^?]{0,40}\b(power|powers|this chat|this site|this website|running)\b/,
  /\b(this (chat|website|site|assistant)|the (chat|website|site))\b[^?]{0,60}\b(built with|framework|hosting|dependencies|package list|model|provider|version)\b/,
  /\b(framework|hosting provider|package list|dependencies)\b[^?]{0,40}\b(website|site|built|chat)\b/,
  // Unrelated general-knowledge explanations.
  /\b(explain|why is|why does|what causes)\b[^.?]{0,50}\b(sky|rainbow|photosynthesis|capital of|weather|gravity|relativity|climate)\b/,
];

const PORTFOLIO_SIGNAL_PATTERNS: RegExp[] = [
  /\b(varesh|patel|portfolio|initvaresh)\b/,
  /\b(his|he|him)\b/,
  /\b(projects?|case stud(y|ies)|repositor(y|ies)|repos?|github)\b/,
  /\b(diffullm|iconoclast|carewatch|eyeq|medcheck|healthtwin|h-swarm|m-agent|zypher|webgpu|lootqdm|crucible|ibis|fatigue|pdfhelper|pdf helper|emotion[- ]spotify|payment liveness|can'?t hackher|event[- ]based|pose estimation)\b/,
  /\b(experience|internships?|intern|job|career|employer|impruvon|adobe|arcascope|foundation for ecological|ieee)\b/,
  /\b(education|gpa|cgpa|degree|university|college|rutgers|gh patel|g\.h\. patel|coursework|school|academic)\b/,
  /\b(skills?|stack|python|pytorch|tensorflow|opencv|fastapi|fastmcp|react|typescript|qdrant|gradio|llms?|rag|diffusion|cnn|transformer|hugging face|slurm|ddp|ordinal|ocr|yolo|mcp)\b/,
  /\b(publications?|papers?|published|research|awards?|honors?|prizes?|hackathons?|devpost|bitcamp|hackhers)\b/,
  /\b(swim|swimming|medals?|athletics?|sports?|aquatics|pool)\b/,
  /\b(resume|résumé|curriculum vitae|cv|contact|email|linkedin|hire|hiring|recruiter|available|availability)\b/,
  /\b(age|how old|born)\b/,
  /\b(who are you|tell me about yourself|about you|about yourself|introduce yourself|your background|your work)\b/,
  /\b(what|which) (kind of |type of )?(role|roles|job|jobs|position|positions)\b/,
  /\b(role|roles|job|position)\b[^?]{0,40}\b(for|fit|fits|hiring|looking)\b/,
  /\b(looking for|targeting|interested in)\b/,
  /\b(built|builds|what (have|has) (you|he) (ever )?built)\b/,
  /\b(you|your|yours)\b/,
  /\b(machine learning|deep learning|computer vision|\bml\b|\bcv\b|model evaluation|evaluation|metrics?|benchmarks?)\b/,
  /\b(good fit|fit for|qualified|qualifications|candidate)\b/,
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

/** True when the text is a strong off-topic work request, regardless of framing. */
export function isStrongOffTopicTask(text: string): boolean {
  const normalized = normalize(text);
  return STRONG_OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(normalized));
}

/** True when the text contains a portfolio-topic signal. */
export function hasPortfolioSignal(text: string): boolean {
  const normalized = normalize(text);
  return PORTFOLIO_SIGNAL_PATTERNS.some((pattern) => pattern.test(normalized));
}

function getUserTexts(messages: UIMessage[]): string[] {
  return messages
    .filter((message) => message.role === 'user')
    .map((message) =>
      (message.parts ?? [])
        .map((part) => (part.type === 'text' ? part.text : ''))
        .join(' ')
        .trim(),
    )
    .filter((text) => text.length > 0);
}

/**
 * Deterministic scope decision. Only user text is inspected; assistant text is
 * ignored so a model output can never widen the policy.
 */
export function assessScope(messages: UIMessage[]): ScopeDecision {
  const userTexts = getUserTexts(messages);
  if (userTexts.length === 0) return { allowed: true };

  const last = userTexts[userTexts.length - 1];

  // Strong off-topic work always blocks, even with prior portfolio context.
  if (isStrongOffTopicTask(last)) {
    return { allowed: false, category: 'off-topic', reply: OFF_TOPIC_REPLY };
  }

  if (hasPortfolioSignal(last)) return { allowed: true };

  // Follow-ups inherit scope from earlier in-scope user turns.
  const priorInScope = userTexts.slice(0, -1).some((text) => hasPortfolioSignal(text));
  if (priorInScope) return { allowed: true };

  return { allowed: false, category: 'needs-portfolio-context', reply: NEEDS_CONTEXT_REPLY };
}
