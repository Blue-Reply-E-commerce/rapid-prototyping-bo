# API Client Guidance

The API client package owns frontend-backend contracts for the PoC.

## Package Boundary

- Package path: `packages/api-client`.
- Public import: `@rapid-prototyping-bo/api-client`.
- Mock fixture import: `@rapid-prototyping-bo/api-client/mocks/dashboard`.
- Current dashboard contract: `packages/api-client/src/dashboard.ts`.
- Current dashboard fixtures: `packages/api-client/src/mocks/dashboard.ts`.

## Contract Style

- Use TypeScript/Zod-first contracts for the PoC.
- Keep OpenAPI/Swagger generation out of scope until a reliable backend source is available.
- Define request and response shapes explicitly.
- Treat new fields required by UI as contract changes.
- Keep parsers close to schemas and export typed parser functions for app usage.
- Avoid untyped response objects, implicit `any`, and UI-only fields that are not represented in schemas.

## Current Dashboard Contract

- The initial dashboard contract is exported from `@rapid-prototyping-bo/api-client`.
- Dashboard mock fixtures are exported from `@rapid-prototyping-bo/api-client/mocks/dashboard`.
- Mock fixtures must be parsed with the Zod response schemas before the app renders them.
- `getDashboardData` in the app should consume validated dashboard payloads, not raw fixture objects.

## Contract Change Rule

When v0 introduces a UI need that requires new backend data, it must update the contract and make the backend impact visible in the handoff PR.

Examples:

- New field in a dashboard card response.
- New filter input required by a list page.
- New status enum shown in the UI.

Contract changes should trigger a BE Jira sub-task unless the backend already supports the required shape.

## Contract Change Checklist

- Update the Zod schema and exported TypeScript type.
- Update deterministic fixtures for happy path and any affected empty, error, or large-data state.
- Keep fixture parsing in place so invalid mock payloads fail early.
- Update UI code to consume the typed contract rather than local ad hoc shapes.
- Note whether the backend already supports the shape or whether a BE Jira sub-task is required.
- Update `docs/ai/api-client.md` or `CONTEXT.md` when the contract convention or domain language changes.

## Preview Boundary

Vercel previews must not call real production APIs. If HTTP-like behavior is
needed for review, use mock Route Handlers under the app and keep payloads
deterministic and schema-validated.
