import { OrderTool } from "./tools/orderTool";

export class OrderAgent {
  async respond(message: string, conversationId: number): Promise<string> {
    // Extract ID
    const match = message.match(/(\d+)/);
    if (!match) return "Please specify an order number.";

    const id = Number(match[1]);
    const order = await OrderTool.findOrderById(id);

    if (!order) return `Order #${id} not found.`;

    return `Order #${id} is currently ${order.status}.`;
  }
}
