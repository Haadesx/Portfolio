import { tool } from 'ai';
import { z } from 'zod';
import { getProjectCount, portfolioFacts } from '@/lib/portfolio-facts';

export const getProjects = tool({
  description:
    "Lists all of Varesh Patel's curated portfolio projects (case studies) with categories, links to the case study, and GitHub URLs where present. Use when the user asks what he has built, for a project list, or to find a specific project.",
  inputSchema: z.object({}),
  execute: async () => {
    const { projects } = portfolioFacts;
    const flagshipSlugs = new Set(portfolioFacts.flagships.map((flagship) => flagship.slug));

    const lines = projects.map((project) => {
      const flags = [
        flagshipSlugs.has(project.slug) ? 'flagship' : null,
        project.slug === portfolioFacts.medcheckSpotlight.slug ? 'recent spotlight' : null,
      ]
        .filter(Boolean)
        .join(', ');
      const links = [`[case study](/projects/${project.slug})`];
      if (project.githubUrl) links.push(`[GitHub](${project.githubUrl})`);
      if (project.paperUrl) links.push(`[paper](${project.paperUrl})`);
      return `- **${project.title}**${flags ? ` (${flags})` : ''} — ${project.shortDescription} (${project.category.join(', ')}). ${links.join(' · ')}`;
    });

    return [
      `Varesh's portfolio has **${getProjectCount()} curated case studies**:`,
      '',
      ...lines,
      '',
      'Browse the full archive at /projects, or open any case study above for the problem, method, evidence, and limits.',
    ].join('\n');
  },
});
