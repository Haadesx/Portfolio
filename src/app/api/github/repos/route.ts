import { GitHubRepo } from '@/types/projects';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://api.github.com/users/bottyash/repos?per_page=100&sort=updated', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
            next: { revalidate: 3600 }, // cache for 1 hour
        });

        if (!res.ok) {
            const text = await res.text();
            console.error('[GitHub API] Error:', res.status, text);
            return NextResponse.json({ error: 'Failed to fetch repos' }, { status: res.status });
        }

        const allRepos: GitHubRepo[] = await res.json();

        // Filter out forks, return essential fields
        const repos = allRepos
            .filter((r) => !r.fork)
            .map((r) => ({
                name: r.name,
                description: r.description,
                html_url: r.html_url,
                homepage: r.homepage,
                language: r.language,
                stargazers_count: r.stargazers_count,
                topics: r.topics || [],
                updated_at: r.updated_at,
                fork: r.fork,
            }));

        return NextResponse.json({ repos });
    } catch (err) {
        console.error('[GitHub API] Unexpected error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
