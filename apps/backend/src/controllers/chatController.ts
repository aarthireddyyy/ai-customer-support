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
    return c.json(
      { error: "conversationId and message are required" },
      400
    );
  }

  // 1. Save user message
  await MessagesService.addMessage(conversationId, "user", message);

  // 2. Load conversation history (context)
  const history = await MessagesService.getConversationMessages(conversationId);

  // 3. Classify intent using Router Agent
  const intent = await RouterAgentService.classifyIntent(message);

  // 4. Select the correct sub-agent
  const agent = AgentsMap[intent] ?? AgentsMap.fallback;

  // 5. Call the agent (real DB-powered logic)
  const reply = await agent.respond(message, conversationId);

  // 6. Save assistant reply
  await MessagesService.addMessage(conversationId, "assistant", reply);

  // 7. Return response
  return c.json({
    intent,
    agent: agent.constructor?.name ?? intent,
    reply,
    history,
  });
});
