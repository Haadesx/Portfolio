import { createOpenAI } from '@ai-sdk/openai';
import { convertToModelMessages, stepCountIs, streamText } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getInternship';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSports';
import { getWeather } from './tools/getWeather';

export const maxDuration = 30;

const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'HTTP-Referer': process.env.APP_URL ?? 'http://localhost:3000',
    'X-Title': 'Varesh Patel Portfolio',
  },
});

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getSports,
      getCrazy,
      getInternship,
      getWeather,
    };

    const firstUserIndex = (messages ?? []).findIndex(
      (message: { role: string }) => message.role === 'user'
    );
    const cleanedMessages =
      firstUserIndex === -1 ? [] : messages.slice(firstUserIndex);

    const result = streamText({
      model: openrouter.chat(
        process.env.OPENROUTER_MODEL ?? 'openai/gpt-4.1-mini'
      ),
      system: SYSTEM_PROMPT.content,
      messages: convertToModelMessages(cleanedMessages, { tools }),
      tools,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}
