import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { invoices } from "../../db/schema";

export const BillingTool = {
  async findInvoice(invoiceId: number) {
    return db
      .select()
      .from(invoices)
      .where(eq(invoices.id, invoiceId))   // ✅ fixed here
      .limit(1);
  },

  async listInvoicesForUser(userId: string) {
    return db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, userId)); // ✅ fixed here
  },
};