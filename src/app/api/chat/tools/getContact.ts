import { tool } from 'ai';
import { z } from 'zod';
import { portfolioFacts } from '@/lib/portfolio-facts';

export const getContact = tool({
  description:
    "Returns Varesh Patel's professional contact details — email, LinkedIn, GitHub, résumé link, and location. Use when the user asks how to reach him, for his email/LinkedIn, or how to get in touch. Does not include a phone number or home address.",
  inputSchema: z.object({}),
  execute: async () => {
    const { contact } = portfolioFacts;

    return [
      'Here is how to reach Varesh professionally:',
      '',
      `- **Email:** ${contact.email}`,
      `- **LinkedIn:** ${contact.linkedin}`,
      `- **GitHub:** ${contact.github}`,
      `- **Résumé:** [PDF](${contact.resumePath}) — updated ${contact.resumeUpdated}`,
      `- **Location:** ${contact.location}`,
      '',
      'Email or LinkedIn is the best route for hiring, research collaboration, or project questions. The assistant does not share a phone number or home address.',
    ].join('\n');
  },
});
