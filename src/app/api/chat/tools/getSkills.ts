import { tool } from 'ai';
import { z } from 'zod';
import { varesh } from '@/data/varesh';

export const getSkills = tool({
  description:
    'This tool shows a list of my skills.',
  inputSchema: z.object({}),
  execute: async () => {
    const { languages, ai, tools, soft } = varesh.skills;

    return [
      'Here is the toolkit I work with:',
      '',
      `- **Languages:** ${languages.join(', ')}`,
      `- **ML / AI:** ${ai.join(', ')}`,
      `- **Tools & platforms:** ${tools.join(', ')}`,
      `- **Ways of working:** ${soft.join(', ')}`,
    ].join('\n');
  },
});
