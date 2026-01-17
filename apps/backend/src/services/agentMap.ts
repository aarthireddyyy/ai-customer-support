import { SupportAgent } from "./supportAgent";
import { OrderAgent } from "./orderAgent";
import { BillingAgent } from "./billingAgent";

export const AgentsMap = {
  support: SupportAgent,
  order: OrderAgent,
  billing: BillingAgent,
  fallback: SupportAgent,
};
