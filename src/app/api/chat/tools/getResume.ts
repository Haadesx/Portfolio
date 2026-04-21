import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'This tool show my resume.',
  inputSchema: z.object({}),
  execute: async () => {
    const baseUrl = process.env.APP_URL?.replace(/\/$/, '');
    const resumeUrl = baseUrl
      ? `${baseUrl}/Varesh_Resume_ML.pdf`
      : '/Varesh_Resume_ML.pdf';

    return `You can download my resume here: [Varesh Patel - Resume (PDF)](${resumeUrl})`;
  },
});
