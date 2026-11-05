import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/projects");

export function getProjectSlugs() {
    return fs.readdirSync(contentDirectory);
}

export function getProjectBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data, content };
}

export function getAllProjects() {
    const slugs = getProjectSlugs();
    const projects = slugs.map((slug) => getProjectBySlug(slug));
    return projects;
}
