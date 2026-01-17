import { MessagesService } from "./messagesService";

export class SupportAgent {
  async respond(message: string, conversationId: number): Promise<string> {
    const history = await MessagesService.getConversationMessages(conversationId);

    return `
I'm your Support Agent.

You said: "${message}"

Conversation so far has ${history.length} messages.

How can I assist you further?
    `.trim();
  }
}
