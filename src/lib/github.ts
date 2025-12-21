
export type GithubRepo = {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    updated_at: string;
    fork: boolean;
};

export async function getGithubRepos(): Promise<GithubRepo[]> {
    try {
        const res = await fetch("https://api.github.com/users/Haadesx/repos?sort=updated&per_page=100", {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: process.env.GITHUB_TOKEN
                ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
                : {},
        });

        if (!res.ok) {
            console.error("Failed to fetch GitHub repos:", res.statusText);
            return [];
        }

        const repos: GithubRepo[] = await res.json();
        // Filter out forks and non-useful repos if needed
        return repos.filter(repo => !repo.fork && repo.description);
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}
