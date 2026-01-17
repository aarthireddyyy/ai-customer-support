import { Hono } from "hono";
import { conversationsController } from "../controllers/conversationsController";

export const api = new Hono();

api.get("/", (c) => c.json({ message: "API root working" }));

// mount conversations
api.route("/conversations", conversationsController);
