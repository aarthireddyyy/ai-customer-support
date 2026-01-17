import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { messages } from "../../db/schema";

export const ConversationTool = {
  async getHistory(conversationId: number) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId));
  },
};