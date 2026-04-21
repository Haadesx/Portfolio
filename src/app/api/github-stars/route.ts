export async function GET(req: Request) {
  const headers: HeadersInit = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch('https://api.github.com/repos/Haadesx/Portfolio', {
    headers,
  });

  if (!res.ok) {
    return new Response('Failed to fetch stars', { status: res.status });
  }

  const data = await res.json();
  return Response.json({ stars: data.stargazers_count });
}
