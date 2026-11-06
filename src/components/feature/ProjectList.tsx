import { Project } from "@/data/projects";
import { archiveGroups } from "@/data/curation";
import { ProjectCard } from "@/components/feature/ProjectCard";
import { GithubRepo } from "@/lib/github";
import { Star } from "lucide-react";
import { format } from "date-fns";

interface ProjectListProps {
  initialProjects: Project[];
  githubRepos: GithubRepo[];
}

export function ProjectList({ initialProjects, githubRepos }: ProjectListProps) {
  const projectMap = new Map(initialProjects.map((project) => [project.slug, project]));
  const curatedUrls = new Set(
    initialProjects.map((project) => project.githubUrl?.toLowerCase()).filter(Boolean),
  );
  const otherRepos = githubRepos.filter((repo) => !curatedUrls.has(repo.html_url.toLowerCase()));

  const repoCards = (repos: GithubRepo[]) =>
    repos.map((repo) => (
      <a
        key={repo.id}
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col justify-between rounded-lg bg-card p-4 border border-transparent hover:border-secondary/30 transition shadow-sm hover:shadow-md"
      >
        <div>
          <div className="flex items-center justify-between mb-2 gap-3">
            <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-1">
              {repo.name}
            </h3>
            {repo.pushed_at ? (
              <span className="text-xs font-mono text-foreground/60 whitespace-nowrap">
                {format(new Date(repo.pushed_at), "MMM yyyy")}
              </span>
            ) : null}
          </div>
          {repo.description ? (
            <p className="text-sm text-foreground/70 line-clamp-2 mb-4">{repo.description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-foreground/60">
          {repo.language ? <span>{repo.language}</span> : null}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" aria-hidden="true" />
            {repo.stargazers_count}
            <span className="sr-only"> stars</span>
          </span>
        </div>
      </a>
    ));

  return (
    <div className="archive-groups">
      {archiveGroups.map((group, index) => {
        const items = group.slugs
          .map((slug) => projectMap.get(slug))
          .filter((project): project is Project => Boolean(project));

        if (items.length === 0) return null;

        return (
          <section className="archive-group" id={group.id} key={group.id}>
            <div className="archive-group-heading">
              <div>
                <span className="archive-group-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{group.title}</h2>
                <p>{group.blurb}</p>
              </div>
              <span className="archive-group-count">
                {items.length} {items.length === 1 ? "PROJECT" : "PROJECTS"}
              </span>
            </div>
            <div className="archive-grid">
              {items.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="archive-repos">
        <div className="archive-group-heading">
          <div>
            <span className="archive-group-index">08</span>
            <h2>More public repositories</h2>
            <p>
              Selected GitHub repositories that are not part of the curated case-study archive.
              The archive above is intentionally curated; this list is the wider working surface.
            </p>
          </div>
          <span className="archive-group-count">GITHUB</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{repoCards(otherRepos.slice(0, 9))}</div>
        {otherRepos.length > 9 ? (
          <details className="mt-8">
            <summary className="cursor-pointer font-mono text-sm text-secondary">
              Explore {otherRepos.length - 9} more public repositories
            </summary>
            <div className="grid gap-4 md:grid-cols-3 mt-6">{repoCards(otherRepos.slice(9))}</div>
          </details>
        ) : null}
        {githubRepos.length === 0 ? (
          <p className="text-sm text-foreground/70">
            The repository list is temporarily unavailable. You can still browse the curated
            projects above or view all repositories on GitHub.
          </p>
        ) : null}
        <div className="mt-8">
          <a
            href="https://github.com/Haadesx?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            View all repositories on GitHub ↗
          </a>
        </div>
      </section>
    </div>
  );
}
