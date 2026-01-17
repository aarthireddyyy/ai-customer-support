import { Hono } from "hono";
import { MessagesService } from "../services/messagesService";
import { RouterAgentService } from "../services/routerAgentService";
import { AgentsMap } from "../services/agentMap";
import type { AgentIntent } from "../services/agentMap";

export const chatController = new Hono();

chatController.post("/messages", async (c) => {
  const body = await c.req.json();
  const conversationId = Number(body.conversationId);
  const message: string = body.message;

  console.log("➡️ Incoming Body:", body);
  console.log("➡️ Conversation ID:", conversationId);
  console.log("➡️ User Message:", message);

  if (!conversationId || !message) {
    console.log("❌ Missing fields");
    return c.json({ error: "conversationId and message are required" }, 400);
  }

  // 1. Save user message
  await MessagesService.addMessage(conversationId, "user", message);
  console.log("✔️ Saved user message");

  // 2. Load conversation history
  const history = await MessagesService.getConversationMessages(conversationId);
  console.log("✔️ Loaded history:", history.length);

  // 3. Classify intent
  const intent: AgentIntent = await RouterAgentService.classifyIntent(message);
  console.log("🔍 Detected intent:", intent);

  // 4. Select agent
  const agent = AgentsMap[intent] ?? AgentsMap.fallback;
  console.log("🤖 Selected Agent:", agent.constructor.name);

  // 5. Make agent respond
  const reply = await agent.respond(message, conversationId);
  console.log("💬 Agent Reply:", reply);

  // 6. Save assistant reply
  await MessagesService.addMessage(conversationId, "assistant", reply);
  console.log("✔️ Assistant message saved");

  return c.json({
    intent,
    agent: agent.constructor.name,
    reply,
    history
  });
});
