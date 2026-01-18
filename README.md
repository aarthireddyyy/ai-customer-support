AI Customer Support System — Multi-Agent Architecture

Built for the Applied AI Research Intern Assessment

🚀 Overview

This project implements an AI-powered customer support system using a router agent + three specialized agents, backed by PostgreSQL, Drizzle ORM, Hono, and a React (Vite) UI.

The system automatically routes queries to:

SupportAgent → FAQs, troubleshooting, general help

OrderAgent → order status, tracking, cancellations

BillingAgent → invoices, refunds, payments

All agents use domain-specific tools connected to a seeded database.
Conversation context is persisted across messages for multi-turn reasoning.

🧠 Architecture
Multi-Agent System

RouterAgent

Classifies user intent (keyword + context based)

Delegates to the correct sub-agent

Provides safe fallback to SupportAgent

SupportAgent, OrderAgent, BillingAgent

Each uses tool functions (orderTools, billingTools, etc.)

Tools query actual DB tables (conversations, orders, invoices)

Backend (Hono + TypeScript)

Controller–Service pattern

Clean routing

Error middleware

Drizzle ORM for DB access

Conversation + message persistence

Frontend (React + Vite)

Chat UI

Typing (“agent thinking…”) indicator

Auto-scrolling

Multi-turn message history

🗄 Database

PostgreSQL + Drizzle ORM

Seeded with:

Orders

Invoices

Conversations

Messages

🛠 API Endpoints
Chat
POST /api/chat/messages

Conversation Management
GET    /api/chat/conversations
POST   /api/chat/conversations
GET    /api/chat/conversations/:id
DELETE /api/chat/conversations/:id

Agents
GET /api/agents
GET /api/agents/:type/capabilities

🔎 API Demo (Open in Browser)

These links allow quick validation of every endpoint :

✔ List conversations

http://localhost:8787/api/chat/conversations

✔ Get messages of a conversation

http://localhost:8787/api/chat/conversations/1

✔ Agents list

http://localhost:8787/api/agents

✔ Agent capabilities

SupportAgent:
http://localhost:8787/api/agents/support/capabilities

OrderAgent:
http://localhost:8787/api/agents/order/capabilities

BillingAgent:
http://localhost:8787/api/agents/billing/capabilities

✔ Example chat POST (via frontend)

http://localhost:5173

⚡ Getting Started
Backend
pnpm install
pnpm db:push
pnpm db:seed
pnpm dev


Runs at:
http://localhost:8787

Frontend
pnpm install
pnpm dev


Runs at:
http://localhost:5173

🧹 Worker Task 

A scheduled worker runs every hour to clean up stale conversations:

Demonstrates async background task capability

Shows production-style maintenance operations
