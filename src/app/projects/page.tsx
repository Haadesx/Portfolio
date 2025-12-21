import { ProjectList } from "@/components/feature/ProjectList";
import { projects } from "@/data/projects";
import { getGithubRepos } from "@/lib/github";

export const metadata = {
    title: "Projects | Varesh Patel",
    description: "Showcase of AI/ML projects, experiments, and open source contributions.",
};

export default async function ProjectsPage() {
    const githubRepos = await getGithubRepos();

    return (
        <div className="container mx-auto px-4 sm:px-8 py-12">
            <div className="max-w-4xl mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Archive</h1>
                <p className="text-lg text-foreground/80">
                    A collection of things I've built. From production ML systems to weekend experiments.
                </p>
            </div>

            <ProjectList initialProjects={projects} githubRepos={githubRepos} />

            <div className="pb-20"></div>
        </div>
    );
}
