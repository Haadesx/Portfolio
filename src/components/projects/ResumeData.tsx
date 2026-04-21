// File: ResumeData.tsx
import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PROJECT_CONTENT = [
  {
    title: 'CareWatch (EyeQ)',
    description:
      'An AI-powered caretaker abuse detection MVP built around pose-based motion heuristics, scene verification, rolling 30-second evidence capture, and event logging.',
    techStack: [
      'Python',
      'React',
      'SQLite',
      'Computer Vision',
      'iOS',
    ],
    date: 'Bitcamp 2026',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/Haadesx/EyeQ',
      },
    ],
    images: [] as { src: string; alt: string }[],
  },
  {
    title: 'Payment Liveness Platform',
    description:
      'A secure payments workflow with webcam liveness checks, deepfake detection, verification scoring, and retry-based decision paths across bank and Solana flows.',
    techStack: [
      'Python',
      'React',
      'TypeScript',
      'Solana',
      'iOS',
    ],
    date: 'HackHERS 2026',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/Haadesx/HackHers26',
      },
    ],
    images: [] as { src: string; alt: string }[],
  },
  {
    title: 'HealthTwin by H-Swarm',
    description:
      'A healthcare decision workspace that turns uploaded financial, operational, and market evidence into structured assumptions, scenarios, briefs, and capital memos.',
    techStack: [
      'FastAPI',
      'React',
      'Domain packages',
      'Evaluation tooling',
      'Applied AI',
    ],
    date: '2026',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/Haadesx/H-Swarm',
      },
    ] as { name: string; url: string }[],
    images: [] as { src: string; alt: string }[],
  },
  {
    title: 'M-Agent',
    description:
      'A markdown-native agent control plane for breaking briefs or codebases into task agents, slice agents, and tool-ready workflows.',
    techStack: [
      'JavaScript',
      'Agent workflows',
      'Developer tooling',
      'Markdown-native orchestration',
    ],
    date: '2026',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/Haadesx/M-Agent',
      },
    ],
    images: [] as { src: string; alt: string }[],
  },
];

interface ProjectProps {
  title: string;
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const RESUME_PROJECTS = [
  {
    category: 'Computer Vision',
    title: 'CareWatch (EyeQ)',
    src: '/projects/carewatch-preview.svg',
    content: (
      <ProjectContent project={{ title: 'CareWatch (EyeQ)' }} />
    ),
  },
  {
    category: 'Payments + Liveness',
    title: 'Payment Liveness Platform',
    src: '/projects/payment-liveness-preview.svg',
    content: (
      <ProjectContent project={{ title: 'Payment Liveness Platform' }} />
    ),
  },
  {
    category: 'Healthcare AI',
    title: 'HealthTwin by H-Swarm',
    src: '/projects/healthtwin-preview.svg',
    content: (
      <ProjectContent project={{ title: 'HealthTwin by H-Swarm' }} />
    ),
  },
  {
    category: 'Developer Tools',
    title: 'M-Agent',
    src: '/projects/m-agent-preview.svg',
    content: (
      <ProjectContent project={{ title: 'M-Agent' }} />
    ),
  },
];
