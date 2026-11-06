# Varesh Patel Portfolio

Cinematic editorial portfolio with a tool-grounded AI assistant, built with Next.js, Tailwind CSS, and OpenRouter.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Yes | Chat and assistant requests |
| `APP_URL` | Recommended | OpenRouter referer header, e.g. `http://localhost:3000` |
| `GITHUB_TOKEN` | Optional | Higher GitHub API rate limits for the project archive |
| `ADMIN_PASSWORD` | Optional | Enables the unlisted `/admin` project config editor |

## Scripts

```bash
npm run dev    # development server
npm run build  # production build
npm run start  # serve the production build
npm run lint   # ESLint
npm run validate:content  # project, MDX, archive, and claim consistency
```

## Routes

- `/` — cinematic home: blueprint intro, scroll-driven bounding boxes, project evidence
- `/projects` — curated case-study archive grouped by evidence type, plus the wider GitHub surface
- `/projects/[slug]` — MDX case studies under `src/content/projects`
- `/research` — publications and externally verified awards with official links
- `/about`, `/contact` — background and contact details
- `/chat` — tool-calling assistant grounded in portfolio data
- `/admin` — optional project config editor (unlisted)
- `/sitemap.xml`, `/robots.txt` — metadata routes

## API routes

- `POST /api/chat` — OpenRouter tool-calling chat (nine portfolio tools)
- `GET /api/projects` — curated, visible GitHub projects
- `GET /api/github/repos`, `GET /api/github-stars` — GitHub helpers
- `POST /api/admin/auth`, `GET|POST /api/admin/projects` — optional admin config API

> The admin editor persists to `src/data/projects-config.json` on the local filesystem. That works for local authoring, but serverless production filesystems are read-only, so treat the editor as a local tool until a Git-backed persistence layer exists.
