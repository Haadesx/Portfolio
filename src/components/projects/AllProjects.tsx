'use client';

import { Card, Carousel } from '@/components/projects/apple-cards-carousel';
import { DynamicProjectContent } from '@/components/projects/Data';
import { RESUME_PROJECTS } from '@/components/projects/ResumeData';
import { MergedProject } from '@/types/projects';
import { useEffect, useState } from 'react';

export default function AllProjects() {
  const [projects, setProjects] = useState<MergedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const githubCards = projects.map((project, index) => (
      <Card
        key={project.repoName}
        card={{
          src: `https://opengraph.githubassets.com/1/${encodeURIComponent('Haadesx')}/${encodeURIComponent(project.repoName)}`,
          title: project.title,
          category: project.category,
          content: <DynamicProjectContent project={project} />,
      }}
      index={index + RESUME_PROJECTS.length}
      layout={true}
    />
  ));

  const resumeCards = RESUME_PROJECTS.map((card, index) => (
    <Card key={card.title} card={card} index={index} layout={true} />
  ))

  const cards = [...resumeCards, ...githubCards];

  if (loading) {
    return (
      <div className="w-full h-full pt-8">
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          My Projects
        </h2>
        <div className="flex items-center justify-center py-20">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-3 w-3 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-3 w-3 rounded-full bg-neutral-400 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full h-full pt-8">
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          My Projects
        </h2>
        <p className="max-w-7xl mx-auto mt-4 text-neutral-500">
          No projects to display yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full pt-8">
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
