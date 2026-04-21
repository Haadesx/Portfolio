import { getVisibleProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

// GET — returns merged, display-ready project list (only visible ones)
export async function GET() {
  try {
    const projects = await getVisibleProjects();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error('[Projects API] Error:', err);
    return NextResponse.json({ projects: [] });
  }
}
