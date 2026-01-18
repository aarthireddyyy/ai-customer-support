import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import { chatController } from "./controllers/chatController";
import { conversationsController } from "./controllers/conversationsController";
import { debugController } from "./controllers/debugController";

const app = new Hono();

// CORS
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

// Chat messages endpoint
app.route("/api/chat", chatController);

// Conversation CRUD endpoints
app.route("/api/chat/conversations", conversationsController);

// Agents + debug endpoints
app.route("/api", debugController);

// Global error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

serve({
  fetch: app.fetch,
  port: 8787,
});
