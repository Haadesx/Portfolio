
import { tool } from "ai";
import { z } from "zod";


export const getSports = tool({
  description:
    "This tool shows what Varesh tends to build or explore outside direct work history.",
  inputSchema: z.object({}),
  execute: async () => {
    return "Here are some of the things I tend to build or explore outside direct work and coursework.";
  },
});
