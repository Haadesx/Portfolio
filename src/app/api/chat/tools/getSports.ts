import { tool } from "ai";
import { z } from "zod";
import { varesh } from "@/data/varesh";

export const getSports = tool({
  description:
    "This tool shows what Varesh tends to build or explore outside direct work history.",
  inputSchema: z.object({}),
  execute: async () => {
    return `Outside direct work and coursework, I spend time on:\n\n${varesh.hobbies.map((hobby) => `- ${hobby}`).join('\n')}`;
  },
});
