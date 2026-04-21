# Varesh Patel Portfolio

AI-native portfolio built with Next.js and OpenRouter.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Required environment variables:

```bash
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=openai/gpt-4.1-mini
APP_URL=http://localhost:3000
```

Open `http://localhost:3000`.

## What is included

- One-page landing page for background, projects, experience, and contact
- `/chat` page for AI Q&A grounded in resume and portfolio data
- OpenRouter-backed API route using tool calls for projects, resume, and experience context
