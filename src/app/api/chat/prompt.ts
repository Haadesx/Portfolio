import { buildChatSystemPrompt } from '@/lib/portfolio-facts';

/**
 * The chat system prompt. Generated from the canonical facts layer so a fact
 * edit happens in one place. Backend route imports `SYSTEM_PROMPT`.
 */
export const SYSTEM_PROMPT: { role: 'system'; content: string } = {
  role: 'system',
  content: buildChatSystemPrompt(),
};
