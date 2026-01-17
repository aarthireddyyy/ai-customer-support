import { ConversationTool } from "./tools/conversationTool";

export const SupportAgent = {
  async respond(message: string, conversationId: number) {
    const history = await ConversationTool.getHistory(conversationId);

    return `
I’m your support assistant.
You asked: "${message}"

Here is what I know from your conversation history:
${history.map(h => `- ${h.role}: ${h.content}`).join("\n")}
`;
  },
};
