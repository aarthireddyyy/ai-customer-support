# AI Customer Support System (Multi-Agent)

## Overview
AI-powered customer support system using a router agent that delegates
queries to specialized agents (Support, Order, Billing).

## Architecture
- Controller–Service pattern
- Router Agent for intent classification
- Sub-agents with tool access
- PostgreSQL + Drizzle ORM
- Conversation persistence

## Agents
- SupportAgent – FAQs & troubleshooting
- OrderAgent – order tracking & status
- BillingAgent – invoices & refunds

## API Routes
- POST /api/chat/messages
- GET /api/chat/conversations
- GET /api/chat/conversations/:id
- DELETE /api/chat/conversations/:id
- GET /api/agents
- GET /api/agents/:type/capabilities

## Setup
```bash
npm install
npm db:push
npm db:seed
npm run dev
