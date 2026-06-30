# Introduce typed dashboard contracts and deterministic mock runtime

Local ID: RPBO-002

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 1, 7, 8

## What to build

Add the first TypeScript/Zod-first API contract package and use it to define the data shape needed by the initial read-only Order History dashboard. Back the dashboard with deterministic mock payloads that are safe for Vercel previews and local development, making any frontend-backend contract expectations explicit instead of hiding them inside ad hoc fixture data.

## Acceptance criteria

- [ ] A workspace package owns the initial dashboard API contract using TypeScript and Zod.
- [ ] The dashboard contract defines explicit response shapes for lightweight order KPIs, simple order filters, and read-only order history rows.
- [ ] The order row shape includes `id`, `title`, `description`, `status`, `totalAmount`, `submittedAt`, and `updatedAt`.
- [ ] Order totals use minor currency units plus currency code rather than floating-point prices.
- [ ] Customer identity, line items, order actions, and order detail data remain outside the first contract scope.
- [ ] Deterministic mock payloads are provided for the dashboard happy path.
- [ ] Empty, error, and large-data fixture coverage is added where relevant to the first dashboard behavior.
- [ ] Mock payloads are validated against the typed contract.
- [ ] The application can consume dashboard data through a mock-only path suitable for Vercel previews.
- [ ] If the dashboard needs backend fields that do not exist yet, those fields are visible as contract changes rather than only fixture changes.

## Blocked by

- RPBO-001 - Bootstrap the mock-only Rapid Prototyping BO app shell
