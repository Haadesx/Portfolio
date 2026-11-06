import { tool } from 'ai';
import { z } from 'zod';
import { getMostRecentExperience, portfolioFacts } from '@/lib/portfolio-facts';

export const getInternship = tool({
  description:
    "Returns what Varesh is looking for (ML internships, applied AI product teams, research collaboration), his most recent experience, and direct contact details. Use for hiring, internship, availability, or 'what is he looking for' questions. Never confirms availability or any commitment — only Varesh can.",
  inputSchema: z.object({}),
  execute: async () => {
    const { availability, contact } = portfolioFacts;
    const mostRecent = getMostRecentExperience();

    return [
      'What Varesh is looking for, as documented on the portfolio:',
      '',
      ...availability.map((item) => `- ${item}`),
      '',
      `**Most recent experience:** ${mostRecent.company} — ${mostRecent.role} (${mostRecent.period}).`,
      `- ${mostRecent.highlights[0]}`,
      '',
      'I can describe these interests, but I cannot confirm availability, start dates, relocation, compensation, or any commitment on his behalf — only Varesh can. Please reach him directly:',
      '',
      `- **Email:** ${contact.email}`,
      `- **LinkedIn:** ${contact.linkedin}`,
      `- **Résumé:** [PDF](${contact.resumePath}) — updated ${contact.resumeUpdated}`,
    ].join('\n');
  },
});
