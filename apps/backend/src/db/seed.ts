import { db } from "./client";
import { orders, invoices, conversations } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Orders
  await db.insert(orders).values([
    {
      userId: "user_1",
      status: "shipped",
    },
    {
      userId: "user_1",
      status: "delivered",
    },
    {
      userId: "user_2",
      status: "processing",
    },
  ]);

  // Invoices
  await db.insert(invoices).values([
    {
      userId: "user_1",
      amount: 499,
      status: "paid",
    },
    {
      userId: "user_1",
      amount: 1299,
      status: "refunded",
    },
  ]);

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
