import { Hono } from "hono";
import { MessagesService } from "../services/messagesService";
import { ConversationsService } from "../services/conversationsService";

export const chatController = new Hono();

chatController.post("/messages", async (c) => {
  const body = await c.req.json();
  const conversationId = Number(body.conversationId);
  const message = body.message;

  if (!conversationId || !message) {
    return c.json({ error: "conversationId and message required" }, 400);
  }

  // 1. Save user message
  await MessagesService.addMessage(conversationId, "user", message);

  // 2. Load context (all messages so far)
  const history = await MessagesService.getConversationMessages(conversationId);

  // 3. Dummy AI response for now (LLM placeholder)
  const aiReply = `Echo: ${message}`;

  // 4. Save assistant message
  await MessagesService.addMessage(conversationId, "assistant", aiReply);

  // 5. Return response
  return c.json({
    reply: aiReply,
    history,
  });
});
