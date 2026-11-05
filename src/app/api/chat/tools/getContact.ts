import { tool } from 'ai';
import { z } from 'zod';
import { varesh } from '@/data/varesh';

export const getContact = tool({
  description:
    'This tool shows my contact information.',
  inputSchema: z.object({}),
  execute: async () => {
    return [
      'Here is how to reach me:',
      '',
      `- **Email:** ${varesh.email}`,
      `- **Location:** ${varesh.location}`,
      `- **LinkedIn:** ${varesh.linkedin}`,
      `- **GitHub:** ${varesh.github}`,
      '',
      'Feel free to reach out about ML roles, collaborations, or interesting product problems.',
    ].join('\n');
  },
});
