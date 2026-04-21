import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description:
    'This tool shows my contact information.',
  inputSchema: z.object({}),
  execute: async () => {
    return "Here is my contact information above. Feel free to reach out about ML roles, collaborations, or interesting product problems.";
  },
});
