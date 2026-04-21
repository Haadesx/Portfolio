import { tool } from 'ai';
import { z } from 'zod';
import { getVisibleProjects } from '@/lib/projects';

export const getProjects = tool({
  description:
    'This tool will show a list of Varesh Patel projects fetched from GitHub and curated portfolio content.',
  inputSchema: z.object({}),
  execute: async () => {
    try {
      const projects = await getVisibleProjects();

      if (projects.length > 0) {
        const projectList = projects
          .map(
            (p: { title: string; description: string; category: string; githubUrl: string }) =>
              `- **${p.title}** (${p.category}): ${p.description} [GitHub](${p.githubUrl})`
          )
          .join('\n');

        return `Here are some of my most relevant projects. Ask me to go deeper into any of them.\n\n${projectList}`;
      }

      return "Here are some of my projects. Ask me if you want the most impactful ones first.";
    } catch {
      return "Here are some of my projects. Ask me if you want the most impactful ones first.";
    }
  },
});
