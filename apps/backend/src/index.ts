import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { errorHandler } from "./middleware/error";
import { api } from "./routes/api";
import "dotenv/config";

const app = new Hono();

// global error handler
app.use("*", errorHandler);

// health route
app.get("/health", (c) => c.json({ status: "ok" }));

// mount API
app.route("/api", api);

const port = Number(process.env.PORT) || 8787;

console.log(`🚀 Backend running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
