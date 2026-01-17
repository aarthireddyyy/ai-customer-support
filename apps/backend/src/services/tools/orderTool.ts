import { eq } from "drizzle-orm";
import { orders } from "../../db/schema";
import { db } from "../../db/client";

export const OrderTool = {
  async findOrderById(orderId: number) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    return result[0] ?? null;
  },
};
