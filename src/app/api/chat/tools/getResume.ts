import { tool } from 'ai';
import { z } from 'zod';
import { portfolioFacts } from '@/lib/portfolio-facts';

export const getResume = tool({
  description:
    "Returns the served résumé link plus its canonical metadata and headline credentials (education, GPA, most recent role, publications). Use when the user asks for the résumé, CV, or a quick credential summary.",
  inputSchema: z.object({}),
  execute: async () => {
    const { contact, education, experience, publications } = portfolioFacts;
    const mostRecent = experience[0];

    return [
      `**Résumé (PDF):** [Varesh Patel — Résumé](${contact.resumePath}) — updated ${contact.resumeUpdated}.`,
      '',
      'Headline credentials:',
      `- **Education:** ${education[0].school} — ${education[0].degree} in ${education[0].field} (${education[0].period}), ${education[0].gpa?.label} ${education[0].gpa?.value}/${education[0].gpa?.scale}.`,
      `- **Most recent role:** ${mostRecent.company} — ${mostRecent.role} (${mostRecent.period}).`,
      `- **Publications:** ${publications.length} verified papers (${publications.map((publication) => publication.venueShort).join(', ')}).`,
      '',
      'The PDF at /resume.pdf is the canonical, current version. More detail: /about.',
    ].join('\n');
  },
});
