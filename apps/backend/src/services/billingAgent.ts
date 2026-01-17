import { BillingTool } from "./tools/billingTool";

export class BillingAgent {
  async respond(message: string): Promise<string> {
    const invoices = await BillingTool.listInvoicesForUser("user_1");
    const invoice = invoices[invoices.length - 1];

    if (!invoice) return "No billing records found.";

    return `Your last invoice amount is ₹${invoice.amount} and status is "${invoice.status}".`;
  }
}
