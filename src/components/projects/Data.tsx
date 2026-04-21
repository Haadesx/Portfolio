'use client';

import { ChevronRight, Link, Star, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { MergedProject } from '@/types/projects';

// --- COMPONENT FOR DYNAMIC PROJECT CONTENT ---
export const DynamicProjectContent = ({ project }: { project: MergedProject }) => {
  const techStack = project.topics.length > 0
    ? project.topics.map((t) => t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
    : project.language
      ? [project.language]
      : [];

  const links = [
    { name: 'GitHub Repository', url: project.githubUrl },
    ...(project.homepage ? [{ name: 'Live Demo', url: project.homepage }] : []),
  ];

  const formattedDate = new Date(project.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <span>Updated {formattedDate}</span>
            {project.stars > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {project.stars}
              </span>
            )}
            {project.language && (
              <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs dark:bg-neutral-700">
                {project.language}
              </span>
            )}
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {project.description}
          </p>

          {/* Tech stack */}
          {techStack.length > 0 && (
            <div className="pt-4">
              <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Links section */}
      {links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {links.map((link, index) => (
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
    </div>
  );
};