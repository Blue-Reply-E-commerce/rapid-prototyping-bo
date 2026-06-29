# Mock Runtime Guidance

Preview environments are mock-only for the PoC.

## Preview Invariant

- Vercel previews must not require backend access.
- Vercel previews must not require VPN access, production credentials, real customer data, or production secrets.
- Local development should be able to run against deterministic mock payloads.
- Mock data must be typed against API contracts.
- Do not add a runtime scenario switcher for the first PoC.
- Do not add environment variables that are required only to make a preview render.
- Do not silently fall back from failed production calls to mock data; previews should be mock-first by design.

## Mock Coverage

When useful for a feature, provide explicit fixtures for:

- happy path
- empty state
- error state
- large-data state

Fixtures should live in `packages/api-client/src/mocks` when they represent API
contract payloads.

## Implementation Direction

Use Next.js Route Handlers for mock API endpoints when HTTP-like behavior is needed inside the app.

Do not use Next.js proxy/middleware as the main mock implementation layer.

## Current Dashboard Runtime

- The dashboard consumes the validated happy-path fixture through `apps/rapid-prototyping-bo/src/lib/dashboard-data.ts`.
- The HTTP-like mock endpoint is `GET /api/mock/dashboard`.
- Keep the first PoC on the default deterministic payload; do not add a runtime scenario switcher yet.
- `apps/rapid-prototyping-bo/src/lib/mock-preview.ts` owns the preview-mode copy shown in the app.

## Handoff Notes

Every handoff PR should name which fixtures were used and whether the preview
still runs without backend access. If new scenarios are added, document them in
the PR and update this file when the runtime rule changes.
