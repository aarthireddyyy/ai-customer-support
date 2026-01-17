import { SupportAgent } from "./supportAgent";
import { OrderAgent } from "./orderAgent";
import { BillingAgent } from "./billingAgent";

export const AgentsMap = {
  support: new SupportAgent(),
  order: new OrderAgent(),
  billing: new BillingAgent(),
  fallback: new SupportAgent(),
};

export type AgentIntent = keyof typeof AgentsMap;  // "support" | "order" | "billing" | "fallback"
