import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { CompileMDX } from "@/components/feature/CompileMDX"; // We will create this wrapper
import { projects } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
    // Generate params based on data/projects.ts or file system
    // We prefer data/projects.ts as the source of truth for slugs, but MDX files must exist.
    const posts = getProjectSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const projectMeta = projects.find(p => p.slug === slug);
    if (!projectMeta) return { title: "Project Not Found" };
    return {
        title: `${projectMeta.title} | Varesh Patel`,
        description: projectMeta.shortDescription,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const mdxData = getProjectBySlug(slug);
    const projectMeta = projects.find(p => p.slug === slug);

    if (!mdxData || !projectMeta) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl">
            <Link href="/projects" className="inline-flex items-center text-sm font-mono text-secondary hover:underline mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{projectMeta.title}</h1>
                <p className="text-xl text-foreground/80 mb-6 leading-relaxed bg-secondary/5 p-4 rounded-lg border-l-2 border-secondary">
                    {projectMeta.shortDescription}
                </p>

                <div className="flex flex-wrap gap-4 items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex flex-wrap gap-2">
                        {projectMeta.techStack.map(stack => (
                            <span key={stack} className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-foreground/80 border border-white/10">
                                {stack}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {projectMeta.githubUrl && (
                            <a href={projectMeta.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-secondary transition-colors">
                                <Github className="w-4 h-4" /> Source Code
                            </a>
                        )}
                        {projectMeta.demoUrl && (
                            <a href={projectMeta.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-secondary transition-colors">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80 prose-code:text-secondary prose-pre:bg-[#112240] prose-pre:border prose-pre:border-white/10">
                <CompileMDX source={mdxData.content} />
            </div>

            <div className="pb-20"></div>
        </article>
    );
}
