import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

/**
 * One chat session per user
 */
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Every message in a conversation
 */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  role: text("role").notNull(), // user | assistant | system
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Mock orders for Order Agent
 */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  status: text("status").notNull(), // shipped, delivered, cancelled
  trackingNumber: text("tracking_number"),
});

/**
 * Mock invoices for Billing Agent
 */
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull(), // paid, pending, refunded
});
