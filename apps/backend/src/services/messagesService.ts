import { db } from "../db/client";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm";

export const MessagesService = {
  async addMessage(conversationId: number, role: string, content: string) {
    const [msg] = await db
      .insert(messages)
      .values({ conversationId, role, content })
      .returning();

    return msg;
  },

  async getConversationMessages(conversationId: number) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.id);
  }
};
