import { Hono } from "hono";
import { db } from "../db/client";
import { orders } from "../db/schema";

export const debugController = new Hono();

/**
 * DEBUG: list seeded orders
 */
debugController.get("/orders", async (c) => {
  const rows = await db.select().from(orders);
  return c.json(rows);
});

/**
 * GET /api/agents
 * List all available agents
 */
debugController.get("/agents", (c) => {
  return c.json([
    { type: "support", name: "SupportAgent" },
    { type: "order", name: "OrderAgent" },
    { type: "billing", name: "BillingAgent" },
  ]);
});

/**
 * GET /api/agents/:type/capabilities
 */
debugController.get("/agents/:type/capabilities", (c) => {
  const type = c.req.param("type");

  const capabilities: Record<string, string[]> = {
    support: [
      "FAQs",
      "Troubleshooting",
      "Conversation history access",
    ],
    order: [
      "Order tracking",
      "Order status lookup",
      "Cancellations",
    ],
    billing: [
      "Invoice lookup",
      "Refund status",
      "Payment issues",
    ],
  };

  return c.json({
    agent: type,
    capabilities: capabilities[type] ?? [],
  });
});
