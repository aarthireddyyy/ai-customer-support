import { db } from "../db/client";
import { conversations, messages } from "../db/schema";
import { eq } from "drizzle-orm";

export const ConversationsService = {
  async list() {
    return db.select().from(conversations).orderBy(conversations.id);
  },

  async create(userId: string) {
    const [inserted] = await db
      .insert(conversations)
      .values({ userId })
      .returning();

    return inserted;
  },

  async getMessages(conversationId: number) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.id);
  },

  async delete(conversationId: number) {
    // delete messages first
    await db.delete(messages).where(eq(messages.conversationId, conversationId));

    // delete conversation
    await db.delete(conversations).where(eq(conversations.id, conversationId));
  },
};
