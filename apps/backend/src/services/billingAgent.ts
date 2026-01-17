import { BillingTool } from "./tools/billingTool";

export const BillingAgent = {
  async respond(message: string) {
    const match = message.match(/(\d+)/);
    const invoiceId = match ? Number(match[1]) : null;

    if (!invoiceId) {
      return "Please provide an invoice ID (e.g., invoice 45).";
    }

    const invoice = await BillingTool.findInvoice(invoiceId);

    if (!invoice || invoice.length === 0) {
      return `Invoice #${invoiceId} not found.`;
    }

    const data = invoice[0];

    return `Invoice #${invoiceId} → Status: ${data.status}, Amount: ₹${data.amount}`;
  },
};
