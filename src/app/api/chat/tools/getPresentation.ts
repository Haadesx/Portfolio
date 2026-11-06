import { tool } from 'ai';
import { z } from 'zod';
import { portfolioFacts } from '@/lib/portfolio-facts';

export const getPresentation = tool({
  description:
    "Introduces the portfolio assistant and gives a concise, grounded background for Varesh Patel: who he is, his education, most recent experience, publications, project count, awards, and where to look next. Use for 'who are you?', 'tell me about yourself', 'introduce yourself', or 'give me the background'.",
  inputSchema: z.object({}),
  execute: async () => {
    const { identity, contact, education, experience, publications, projectCount, awards } =
      portfolioFacts;
    const mostRecent = experience[0];
    const flagshipSlugs = new Set(portfolioFacts.flagships.map((flagship) => flagship.slug));
    const flagshipTitles = portfolioFacts.projects
      .filter((project) => flagshipSlugs.has(project.slug))
      .map((project) => project.title);

    return [
      `I'm the AI guide for Varesh Patel's portfolio — an AI assistant, not Varesh, and no human is present in this chat.`,
      '',
      `**${identity.name}** — ${identity.role} — based in ${identity.location}. Age: ${identity.age} (as of November 2026).`,
      '',
      `**Education:** ${education
        .map((entry) => `${entry.school} — ${entry.degree} in ${entry.field} (${entry.period})`)
        .join('; ')}.`,
      `**Most recent experience:** ${mostRecent.company} — ${mostRecent.role} (${mostRecent.period}).`,
      `**Publications:** ${publications.length} verified (${publications.map((publication) => publication.venueShort).join(', ')}).`,
      `**Portfolio:** ${projectCount} curated case studies, including the flagship systems ${flagshipTitles.join(', ')}.`,
      `**Awards:** ${awards.map((award) => `${award.event} — ${award.award}`).join('; ')}.`,
      '',
      `**Skills:** ${portfolioFacts.skills.ai.slice(0, 6).join(', ')}, plus ${portfolioFacts.skills.languages.slice(0, 4).join(', ')} and product-facing delivery.`,
      '',
      `Links: /about · /projects · /resume.pdf · /contact · ${contact.github}`,
    ].join('\n');
  },
});
