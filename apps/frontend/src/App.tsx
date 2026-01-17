import { useEffect, useState } from "react";
import type { Message, ChatResponse, Conversation } from "./types";

const API = "http://localhost:8787/api";

export default function App() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Create conversation on first load
  useEffect(() => {
    async function init() {
      const res = await fetch(`${API}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_1" }),
      });
      const data = await res.json();
      setConversation(data);
    }
    init();
  }, []);

  async function sendMessage() {
    if (!input.trim() || !conversation) return;

    setLoading(true);

    const res = await fetch(`${API}/chat/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: conversation.id,
        message: input,
      }),
    });

    const data: ChatResponse = await res.json();
    setMessages(data.history);
    setInput("");
    setLoading(false);
  }

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto bg-white shadow">
      {/* Header */}
      <div className="p-4 border-b font-semibold">
        AI Customer Support
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg max-w-[80%] ${
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
            }`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">
            Agent is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Ask about orders, billing, or support..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
