import { tool } from 'ai';
import { z } from 'zod';
import { varesh } from '@/data/varesh';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Varesh Patel. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  inputSchema: z.object({}),
  execute: async () => {
    return `${varesh.description}\n\n${varesh.summary}`;
  },
});
