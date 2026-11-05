"use client";

import { useState, useMemo } from "react";
import { Project } from "@/data/projects";
import { ProjectCard } from "@/components/feature/ProjectCard";
import { GithubRepo } from "@/lib/github";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ProjectListProps {
    initialProjects: Project[];
    githubRepos: GithubRepo[];
}

const CATEGORIES = ["All", "CV", "NLP", "Time-Series", "Web/App", "MLOps"];

export function ProjectList({ initialProjects, githubRepos }: ProjectListProps) {
    const [filter, setFilter] = useState("All");
    const curatedUrls = new Set(initialProjects.map((project) => project.githubUrl?.toLowerCase()).filter(Boolean));
    const otherRepos = githubRepos.filter((repo) => !curatedUrls.has(repo.html_url.toLowerCase()));

    const repoCards = (repos: GithubRepo[]) => repos.map((repo) => (
        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-lg bg-card p-4 border border-transparent hover:border-secondary/30 transition shadow-sm hover:shadow-md">
            <div>
                <div className="flex items-center justify-between mb-2 gap-3">
                    <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-1">{repo.name}</h3>
                    {repo.pushed_at && <span className="text-xs font-mono text-foreground/60 whitespace-nowrap">{format(new Date(repo.pushed_at), 'MMM yyyy')}</span>}
                </div>
                {repo.description && <p className="text-sm text-foreground/70 line-clamp-2 mb-4">{repo.description}</p>}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-foreground/60">
                {repo.language && <span>{repo.language}</span>}
                <span className="flex items-center gap-1"><Star className="w-3 h-3" aria-hidden="true" />{repo.stargazers_count}<span className="sr-only"> stars</span></span>
            </div>
        </a>
    ));

    const filteredProjects = useMemo(() => {
        if (filter === "All") return initialProjects;
        return initialProjects.filter((p) => p.category.some(c =>
            // Simple mapping or exact match
            c.includes(filter) || (filter === "Web/App" && p.category.includes("App"))
        ));
    }, [initialProjects, filter]);

    return (
        <div className="space-y-16">
            {/* Flagship Projects Section */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-primary">Case Studies</h2>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-mono transition-all border",
                                    filter === cat
                                        ? "bg-secondary/10 text-secondary border-secondary"
                                        : "bg-transparent text-foreground/60 border-white/10 hover:border-white/30 hover:text-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>

            {/* Other Repos Section */}
            <section>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="text-secondary font-mono text-xl">04.</span>
                    Other Experiments & Utilities
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {repoCards(otherRepos.slice(0, 9))}
                </div>
                {otherRepos.length > 9 && <details className="mt-8"><summary className="cursor-pointer font-mono text-sm text-secondary">Explore {otherRepos.length - 9} more public repositories</summary><div className="grid gap-4 md:grid-cols-3 mt-6">{repoCards(otherRepos.slice(9))}</div></details>}
                {githubRepos.length === 0 && <p className="text-sm text-foreground/70">The repository list is temporarily unavailable. You can still browse all projects on GitHub.</p>}
                <div className="mt-8 text-center">
                    <a href="https://github.com/Haadesx?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-transparent px-6 py-3 text-sm font-medium text-foreground ring-1 ring-inset ring-white/10 transition hover:bg-white/5">
                        View all repositories on GitHub
                    </a>
                </div>
            </section>
        </div>
    );
}
