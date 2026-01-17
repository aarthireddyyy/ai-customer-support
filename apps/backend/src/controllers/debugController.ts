import { Hono } from "hono";
import { db } from "../db/client";
import { orders } from "../db/schema";

export const debugController = new Hono();

debugController.get("/orders", async (c) => {
  const rows = await db.select().from(orders);
  return c.json(rows);
});
