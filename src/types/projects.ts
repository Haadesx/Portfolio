// TypeScript interfaces for the GitHub auto-grab pipeline

export interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    topics: string[];
    updated_at: string;
    fork: boolean;
}

export interface ProjectConfigEntry {
    visible: boolean;
    category: string;
    title: string;
    description: string;
    order: number;
}

export interface ProjectsConfig {
    repos: Record<string, Partial<ProjectConfigEntry>>;
}

export interface MergedProject {
    // GitHub data
    repoName: string;
    githubUrl: string;
    homepage: string | null;
    language: string | null;
    stars: number;
    topics: string[];
    updatedAt: string;
    // Merged (config overrides GitHub)
    title: string;
    description: string;
    category: string;
    visible: boolean;
    order: number;
}
