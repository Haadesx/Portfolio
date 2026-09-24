import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'This tool show my resume.',
  inputSchema: z.object({}),
  execute: async () => {
    return 'You can download my resume here: [Varesh Patel - Resume (PDF)](/Varesh_Resume_ML.pdf)';
  },
});
