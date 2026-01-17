export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  intent: string;
  agent: string;
  reply: string;
  history: Message[];
};

export type Conversation = {
  id: number;
  userId: string;
  createdAt: string;
};
