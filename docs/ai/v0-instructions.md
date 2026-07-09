# v0 Instructions

Use this file as the main entrypoint for v0 project context. Add it as a
custom v0 Instruction and keep the linked files available as project context
whenever v0 generates code for this repository.

## Read Order

1. `docs/ai/v0-instructions.md`
2. `docs/ai/project-scope.md`
3. `docs/ai/design-system.md`
4. `docs/ai/api-client.md`
5. `docs/ai/mock-runtime.md`
6. `docs/ai/jira-handoff.md`
7. `docs/agents/issue-tracker.md`
8. `docs/ai/context-maintenance.md`

## Product Target

- Product name: Rapid Prototyping BO.
- Jira workstream/project: Blue Ecomm - Rapid Prototyping.
- Jira site: `https://bluereplyexp.atlassian.net`.
- Jira project key: `RAP`.
- Jira board ID: `2028`.
- Jira board URL: `https://bluereplyexp.atlassian.net/jira/software/projects/RAP/boards/2028`.
- Real frontend app: `apps/rapid-prototyping-bo`.
- Design-system package: `packages/design-system`.
- API contract package: `packages/api-client`.
- Baseline surface: read-only Order History dashboard at `/dashboard`.

## Non-Negotiable Rules

- Modify the real `Rapid Prototyping BO` frontend in this monorepo.
- Do not create detached demo apps, throwaway marketing pages, or separate Vite/Next projects.
- Keep Vercel previews mock-only: no production secrets, customer data, VPN requirements, live backend credentials, or live backend dependencies.
- Use approved design-system exports from `@rapid-prototyping-bo/design-system` whenever a matching primitive exists.
- Keep generated UI suitable for operational backoffice use: clear hierarchy, compact spacing, restrained styling, predictable navigation, and scan-friendly data.
- Treat the existing Order History dashboard as the baseline BO surface, not as
  a permanent product boundary. New routes, sections, and supporting components
  are allowed when requested and must follow the same package, design-system,
  mock-runtime, and API-contract rules.
- Keep the BO domain generic and privacy-safe. Do not introduce real customer
  data, production credentials, or operational order mutations unless the
  requirement explicitly changes that boundary and the context/contracts are
  updated in the same change.
- Treat UI data needs as API contract questions. Update `packages/api-client` schemas, types, and fixtures when the UI requires new backend fields.
- Validate mock payloads through Zod parsers before rendering them.
- Prefer existing packages and patterns before creating new abstractions.
- Treat generated PRs as handoff PRs for review and delivery planning, not automatically mergeable production changes.
- Do not perform Jira writes from v0. Prepare Jira-ready content only; Codex may
  publish through authenticated MCP after human approval.
- If the Jira/Atlassian MCP is unavailable, blocked, unauthenticated, or not
  explicitly approved in the current chat, do not skip delivery planning.
  Produce a Jira Draft Handoff that follows `docs/ai/jira-handoff.md` and can be
  reviewed, copied, or published later by a human-approved MCP flow.
- Update context docs when project conventions, API contracts, component APIs, or domain language change.

## Before Opening A Handoff PR

- Confirm changed code lives in the real workspace paths listed above.
- Confirm preview behavior is still deterministic and mock-only.
- Confirm new UI uses existing design-system primitives or documents why a new primitive was needed.
- Confirm contract changes are visible in `packages/api-client` and mock fixtures.
- Confirm the PR summary names the Vercel preview URL, changed contracts, mock payloads, Jira delivery impact, and context docs touched.
