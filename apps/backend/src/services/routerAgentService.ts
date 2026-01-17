import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { AgentIntent } from "./agentMap";

export const RouterAgentService = {
  async classifyIntent(message: string): Promise<AgentIntent> {
    try {
      const result = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: `
          Classify the intent of this message:

          "${message}"

          Respond with ONLY ONE WORD:
          support | order | billing
        `
      });

      const output = result.text.toLowerCase().trim();

      if (["order", "billing", "support"].includes(output)) {
        return output as AgentIntent;
      }

      return "fallback"; 
    } catch (err) {
      console.error("❌ RouterAgent ERROR:", err);
      return "fallback";
    }
  }
};
