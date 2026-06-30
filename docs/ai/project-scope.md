# Project Scope

This repository is a pnpm/Turborepo workspace for the Rapid Prototyping BO
proof of concept. v0 should work inside this workspace and preserve its package
boundaries.

## In Scope

- Next.js 16 App Router backoffice frontend in `apps/rapid-prototyping-bo`.
- Turborepo monorepo structure.
- pnpm workspace management.
- Tailwind CSS styling.
- Zustand for lightweight client-side UI state.
- Minimal design-system package in `packages/design-system`.
- shadcn/ui-style Button and Card primitives.
- TypeScript/Zod-first API contracts in `packages/api-client`.
- Deterministic mock payloads.
- Vercel preview builds.
- v0 handoff PR workflow.
- Jira `RAP` parent story plus FE/BE sub-task creation after approval through an
  authenticated, human-approved Atlassian MCP flow.

## Working Paths

- App routes and UI composition: `apps/rapid-prototyping-bo/src/app`.
- App data loading and mock helpers: `apps/rapid-prototyping-bo/src/lib`.
- Client-side UI state: `apps/rapid-prototyping-bo/src/stores`.
- Shared components: `packages/design-system/src`.
- API schemas, types, parsers, and fixtures: `packages/api-client/src`.
- v0 and handoff context: `docs/ai`.
- Agent tracker context: `docs/agents`.
- Domain language: `CONTEXT.md`.
- Local issue drafts before Jira publication:
  `docs/issues/rapid-prototyping-bo`.

## Detached App Rule

Generated work must extend the real backoffice app. Do not scaffold a separate
demo application, duplicate the design system locally inside the app, or bypass
workspace packages with one-off files that cannot become delivery code.

## Out of Scope For The PoC

- Backend implementation.
- Real production API calls in preview.
- Production auth.
- Real production secrets.
- OpenAPI/Swagger generation.
- Custom v0 Platform API portal.
- Bitbucket integration.
- Automatic production merge.
- Branch/commit normalization based on Jira ticket keys.
- Committing Jira credentials, OAuth tokens, API tokens, cookies, or MCP session
  state.

## Delivery Boundary

v0 output may be used to validate product direction and create reviewable
handoff PRs. Delivery hardening, real backend integration, production auth, and
Jira writes remain human-reviewed follow-up work through the authenticated MCP
connection unless a later approved slice changes that boundary. Once an issue is
published to Jira project `RAP`, Jira is the source of truth for status.
