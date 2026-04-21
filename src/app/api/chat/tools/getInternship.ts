import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Gives a summary of what kind of internship I'm looking for, plus my contact info and how to reach me. Use this tool when the user asks about my internship search or how to contact me for opportunities.",
  inputSchema: z.object({}),
  execute: async () => {
    return `Here’s what I’m looking for 👇

- 📅 **Availability**: Open to internship and applied AI opportunities
- 🌍 **Location**: Based in **New Brunswick, NJ**, open to remote or hybrid
- 🧑‍💻 **Focus**: Machine learning engineering, computer vision, agentic systems, product-facing AI
- 🛠️ **Stack**: Python, PyTorch, FastAPI, React, TypeScript, OpenCV, SQLite, Swift
- ✅ **What I bring**: Proven modeling work, plus the ability to ship end-to-end systems that include interfaces, workflows, and delivery constraints
- 🔥 I like hard problems, fast iteration, and product-minded execution

📬 **Contact me** via:
- Email: workmailvaresh@gmail.com
- LinkedIn: [linkedin.com/in/vareshpatel](https://www.linkedin.com/in/vareshpatel/?skipRedirect=true)
- GitHub: [github.com/Haadesx](https://github.com/Haadesx)

Let’s build something serious together.
    `;
  },
});
