# Introduce typed dashboard contracts and deterministic mock runtime

Local ID: RPBO-002

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 1, 7, 8

## What to build

Add the first TypeScript/Zod-first API contract package and use it to define the data shape needed by the initial dashboard. Back the dashboard with deterministic mock payloads that are safe for Vercel previews and local development, making any frontend-backend contract expectations explicit instead of hiding them inside ad hoc fixture data.

## Acceptance criteria

- [ ] A workspace package owns the initial dashboard API contract using TypeScript and Zod.
- [ ] The dashboard contract defines explicit response shapes for the data rendered by the first dashboard.
- [ ] Deterministic mock payloads are provided for the dashboard happy path.
- [ ] Empty, error, and large-data fixture coverage is added where relevant to the first dashboard behavior.
- [ ] Mock payloads are validated against the typed contract.
- [ ] The application can consume dashboard data through a mock-only path suitable for Vercel previews.
- [ ] If the dashboard needs backend fields that do not exist yet, those fields are visible as contract changes rather than only fixture changes.

## Blocked by

- RPBO-001 - Bootstrap the mock-only Rapid Prototyping BO app shell
