import Link from "next/link";
import { Folder, Github, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    return (
        <div className={cn(
            "group relative flex flex-col justify-between rounded-lg bg-card p-6 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-secondary/20",
            className
        )}>
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-secondary">
                        <Folder className="h-10 w-10" />
                    </div>
                    <div className="flex gap-4">
                        {project.githubUrl && (
                            <a href={project.githubUrl} aria-label={`${project.title} source code`} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-secondary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        )}
                        {project.demoUrl && (
                            <a href={project.demoUrl} aria-label={`${project.title} live demo`} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-secondary transition-colors">
                                <ExternalLink className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="mb-2 text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    <Link href={`/projects/${project.slug}`} className="before:absolute before:inset-0">
                        {project.title}
                    </Link>
                </h3>

                <div className="mb-4 text-sm text-foreground/80">
                    <p>{project.shortDescription}</p>
                    <div className="mt-2 text-xs opacity-80">
                        <span className="font-mono text-secondary">Problem:</span> {project.problem}
                    </div>
                    <div className="mt-1 text-xs opacity-80">
                        <span className="font-mono text-secondary">Result:</span> {project.resultsMetrics[0]}
                    </div>
                </div>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-foreground/60">
                {project.techStack.map((tech) => (
                    <li key={tech} className="mr-2">
                        {tech}
                    </li>
                ))}
            </ul>
        </div>
    );
}
