import { Hono } from "hono";
import { MessagesService } from "../services/messagesService";
import { RouterAgentService } from "../services/routerAgentService";
import { AgentsMap } from "../services/agentMap";

export const chatController = new Hono();

chatController.post("/messages", async (c) => {
  const body = await c.req.json();
  const conversationId = Number(body.conversationId);
  const message: string = body.message;

  if (!conversationId || !message) {
    return c.json({ error: "conversationId and message required" }, 400);
  }

  // 1. Save user message
  await MessagesService.addMessage(conversationId, "user", message);

  // 2. Fetch full conversation history (context for agents)
  const history = await MessagesService.getConversationMessages(conversationId);

  // 3. Classify intent using Router Agent (LLM)
  const intent = await RouterAgentService.classifyIntent(message);

  // 4. Pick the appropriate sub-agent
  const agent = AgentsMap[intent];

  // 5. For now: placeholder agent response (real agents in Step 8)
  const aiReply = `[${agent.name}] received: ${message}`;

  // 6. Save assistant response
  await MessagesService.addMessage(conversationId, "assistant", aiReply);

  // 7. Return structured response
  return c.json({
    intent,
    agent: agent.name,
    reply: aiReply,
    history,
  });
});
