import { OrderTool } from "./tools/orderTool";

export const OrderAgent = {
  async respond(message: string) {
    const idMatch = message.match(/\d+/);
    if (!idMatch) return "I couldn't find an order ID in your message.";

    const orderId = Number(idMatch[0]);
    
    const order = await OrderTool.findOrderById(orderId);
    if (!order) return `Order #${orderId} not found.`;

    return `Order #${orderId} is currently: ${order.status}`;
  },
};
