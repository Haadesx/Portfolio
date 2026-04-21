
import { tool } from "ai";
import { z } from "zod";


export const getCrazy = tool({
  description:
    "This tool will tell the craziest thing I've ever done. Use it when the user asks something like: 'What's the craziest thing you've ever done?'",
  inputSchema: z.object({}),
  execute: async () => {
    return "I tend to turn rough ideas into full working systems unusually fast. If the idea is strong enough, I would rather stress-test it by building the product than keep talking about it.";
  },
});
