import { tool } from 'ai';
import { z } from 'zod';
import { portfolioFacts } from '@/lib/portfolio-facts';

export const getSkills = tool({
  description:
    "Lists Varesh Patel's documented technical and working skills: languages, ML/AI frameworks, tools and platforms, and ways of working. Use when the user asks what he works with, his stack, or his strengths.",
  inputSchema: z.object({}),
  execute: async () => {
    const { languages, ai, tools, soft } = portfolioFacts.skills;

    return [
      'Here is the documented toolkit Varesh works with:',
      '',
      `- **Languages:** ${languages.join(', ')}`,
      `- **ML / AI:** ${ai.join(', ')}`,
      `- **Tools & platforms:** ${tools.join(', ')}`,
      `- **Ways of working:** ${soft.join(', ')}`,
      '',
      'These are the skills reflected in his portfolio projects and experience — for concrete examples, see /projects.',
    ].join('\n');
  },
});
