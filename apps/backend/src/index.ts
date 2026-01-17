import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import { chatController } from "./controllers/chatController";
import { conversationsController } from "./controllers/conversationsController";

const app = new Hono();

// CORS FIX
app.use("*", cors({
  origin: "http://localhost:5173",
  allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

app.route("/api/chat", chatController);
app.route("/api/conversations", conversationsController);

serve({
  fetch: app.fetch,
  port: 8787,
});
