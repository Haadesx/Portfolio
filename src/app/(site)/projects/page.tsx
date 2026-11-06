import { ProjectList } from "@/components/feature/ProjectList";
import { projects } from "@/data/projects";
import { archiveGroups } from "@/data/curation";
import { getGithubRepos } from "@/lib/github";

export const metadata = {
  title: "Projects | Varesh Patel",
  description:
    "Selected machine learning, computer vision, applied AI, open-source, and earlier work by Varesh Patel.",
};

export default async function ProjectsPage() {
  const githubRepos = await getGithubRepos();

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <header className="archive-hero">
        <p className="eyebrow">PROJECTS / CURATED ARCHIVE</p>
        <h1>Project archive<span>.</span></h1>
        <p>
          Selected work comes first: trained models, evaluated representation edits, computer
          vision, and applied AI. The full archive keeps the earlier work and the wider GitHub
          surface accessible without flattening everything into one grid.
        </p>
      </header>

      <nav className="archive-nav" aria-label="Archive sections">
        {archiveGroups.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            {group.title}
          </a>
        ))}
      </nav>

      <ProjectList initialProjects={projects} githubRepos={githubRepos} />

      <div className="pb-20"></div>
    </div>
  );
}
