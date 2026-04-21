import { ProjectsConfig } from '@/types/projects';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'src', 'data', 'projects-config.json');

async function readConfig(): Promise<ProjectsConfig> {
    try {
        const raw = await fs.readFile(CONFIG_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return { repos: {} };
    }
}

function verifyAuth(req: Request): boolean {
    const password = req.headers.get('x-admin-password');
    return password === process.env.ADMIN_PASSWORD;
}

// GET — return the current config
export async function GET(req: Request) {
    if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const config = await readConfig();
    return NextResponse.json(config);
}

// POST — update the config
export async function POST(req: Request) {
    if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body: ProjectsConfig = await req.json();

        // Validate structure
        if (!body.repos || typeof body.repos !== 'object') {
            return NextResponse.json({ error: 'Invalid config structure' }, { status: 400 });
        }

        await fs.writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[Admin Projects API] Error:', err);
        return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }
}
