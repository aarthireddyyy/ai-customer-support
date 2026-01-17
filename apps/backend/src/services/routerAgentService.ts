import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";

export const RouterAgentService = {
  async classifyIntent(message: string) {
    const prompt = `
You are an intent classifier for a customer support AI system.

Classify the user's message into one of these:
- support
- order
- billing
- fallback

User: "${message}"

Respond with ONLY the label.
`;

    const response = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    const intent = response.text.trim().toLowerCase();

    if (!["support", "order", "billing", "fallback"].includes(intent)) {
      return "fallback";
    }

    return intent;
  },
};
