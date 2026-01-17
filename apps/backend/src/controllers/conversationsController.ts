import { Hono } from "hono";
import { ConversationsService } from "../services/conversationsService";

export const conversationsController = new Hono();

// GET /api/conversations
conversationsController.get("/", async (c) => {
  const data = await ConversationsService.list();
  return c.json(data);
});

// POST /api/conversations
conversationsController.post("/", async (c) => {
  const body = await c.req.json();
  const userId = body.userId || "user_1"; // default for demo

  const convo = await ConversationsService.create(userId);
  return c.json(convo);
});

// GET /api/conversations/:id
conversationsController.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const data = await ConversationsService.getMessages(id);
  return c.json(data);
});

// DELETE /api/conversations/:id
conversationsController.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await ConversationsService.delete(id);
  return c.json({ deleted: true });
});
