import { tool } from 'ai';
import { z } from 'zod';
import { portfolioFacts } from '@/lib/portfolio-facts';

export const getCrazy = tool({
  description:
    "Tells the story of Varesh Patel's boldest documented build — DiffuLLM, a discrete diffusion language model trained from scratch — plus other high-risk builds (ICONOCLAST, Zypher EdgeAI). Use when the user asks for the craziest, boldest, hardest, or most ambitious thing he has built.",
  inputSchema: z.object({}),
  execute: async () => {
    const diffullm = portfolioFacts.flagships.find((flagship) => flagship.slug === 'diffullm');
    const iconoclast = portfolioFacts.flagships.find((flagship) => flagship.slug === 'iconoclast');
    const zypher = portfolioFacts.projects.find((project) => project.slug === 'edge-ai');
    const diffullmProject = portfolioFacts.projects.find((project) => project.slug === 'diffullm');

    const lines = [
      'The boldest build in the portfolio is **DiffuLLM** — a discrete diffusion language model trained from scratch as an alternative to left-to-right generation.',
    ];

    if (diffullm) {
      lines.push(
        '',
        `- **What it is:** ${diffullm.thesis}`,
        `- **Method:** ${diffullm.method}`,
        `- **Honest limit:** ${diffullm.limitation}`,
        `- **Case study:** /projects/diffullm${diffullmProject?.paperUrl ? ` · report ${diffullmProject.paperUrl}` : ''}`,
      );
    }

    if (iconoclast) {
      lines.push(
        '',
        `Another high-risk build is **ICONOCLAST** — ${iconoclast.thesis.toLowerCase()} It compares ${iconoclast.facts.find((fact) => fact.label.includes('MATCHED'))?.value ?? 'ten'} matched model configurations, and the KL trade-offs stay visible in the results.`,
      );
    }

    if (zypher) {
      lines.push(
        '',
        `And **${zypher.title}** — ${zypher.shortDescription}`,
      );
    }

    lines.push(
      '',
      'None of these are claimed as production systems; the case studies document the evaluation and the limits. Explore them at /projects.',
    );

    return lines.join('\n');
  },
});
