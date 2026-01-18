import { Hono } from "hono";
import { conversationsController } from "../controllers/conversationsController";
import { chatController } from "../controllers/chatController";
export const api = new Hono();

api.get("/", (c) => c.json({ message: "API root working" }));

// mount conversations
api.route("/chat", chatController);
api.route("/chat/conversations", conversationsController);
