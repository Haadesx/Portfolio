import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Varesh Patel. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  inputSchema: z.object({}),
  execute: async () => {
    return {
      presentation:
        "Here is a little bit about me, you can see it above!",
      //"I'm Yash Parmar, a 22-year-old AI/ML software engineer from Ahmedabad, passionate about LLM applications, agentic AI systems, and workflow automation. I love tackling new challenges, learning, and building innovative solutions. Beyond tech, I enjoy cycling and photography.",
    };
  },
});
