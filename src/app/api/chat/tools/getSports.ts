import { tool } from 'ai';
import { z } from 'zod';
import { getSwimmingSummary } from '@/lib/portfolio-facts';

export const getSports = tool({
  description:
    "Returns Varesh Patel's real competitive-swimming record: started around age 3, competing since 2012, repeated district wins, state-level qualification 2014–2024, 2015 state 200m IM medal, CBSE West Zone 2015, and CVM University/GCET university representation 2023–24 (with evidence links and honesty labels). Use for swimming, athletics, sports, medals, or 'what do you do outside work'.",
  inputSchema: z.object({}),
  execute: async () => {
    return [
      "Varesh's sport is competitive swimming — here is the documented record.",
      '',
      getSwimmingSummary(),
      '',
      'Full story: /#swimming and /about#swimming.',
    ].join('\n');  },
});
