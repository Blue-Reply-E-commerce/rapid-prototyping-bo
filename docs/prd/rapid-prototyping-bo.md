# PRD: Rapid Prototyping BO

## Problem Statement

We need a proof-of-concept backoffice that can be modified through v0 while keeping the generated work traceable, reviewable, and useful for real delivery. The current risk is that prototypes become detached from the real application, API contracts, mock data, and Jira delivery flow.

The team wants to validate a workflow where v0 can generate UI changes against a real but minimal backoffice frontend, Vercel can host preview builds, GitHub can store v0 branches and handoff pull requests, and Jira can track the approved work as delivery stories and sub-tasks.

## Solution

Build a minimal monorepo for `Rapid Prototyping BO` using Turborepo and pnpm. The first application is a small Next.js 16 backoffice with Tailwind CSS, Zustand for client state, and a minimal design system based on shadcn/ui-compatible atomic components.

The first product surface is a read-only Order History dashboard with lightweight KPIs, simple status/text filters, and generic order rows. The app should be intentionally small, but structured as if it will grow into a real backoffice: shared packages, design-system primitives, typed API contracts, deterministic mock payloads, and AI context documentation for v0.

v0 will operate on the GitHub repository directly during the PoC. Vercel previews must remain mock-only. Approved v0 output becomes a handoff PR. Jira integration will create a parent delivery story and FE/BE sub-tasks through a constrained MCP workflow.

## User Stories

1. As a stakeholder, I want to open a Vercel preview of the backoffice, so that I can validate generated UI without needing backend access.
2. As a product owner, I want v0 to modify the backoffice using project instructions, so that generated changes stay within the intended scope.
3. As a designer or frontend engineer, I want the app to use a small shared design system, so that future generated screens look coherent.
4. As a frontend engineer, I want a Button atom, OrderSummaryCard molecule, and OrderHistoryPanel organism available from the design-system package, so that the first dashboard can be assembled from reusable presentational components.
5. As a frontend engineer, I want Tailwind CSS configured consistently across the app and packages, so that styling remains predictable.
6. As a frontend engineer, I want Zustand available for client state, so that simple UI state can be handled without adding unnecessary infrastructure.
7. As a frontend engineer, I want typed API contracts in a package, so that UI and mock data changes are explicit.
8. As a backend engineer, I want contract changes to be visible in the handoff, so that backend impact is not hidden inside mock data.
9. As a reviewer, I want generated work to open as a handoff PR, so that it can be reviewed before production delivery.
10. As a delivery lead, I want Jira to receive a parent story and FE/BE sub-tasks after prototype approval, so that delivery work is tracked.
11. As a v0 user, I want modular AI context files in the repo, so that v0 can follow project rules over repeated iterations.
12. As a maintainer, I want context docs updated when conventions change, so that future generated work improves instead of drifting.

## Implementation Decisions

- Use a pnpm monorepo managed by Turborepo.
- Create one application: `Rapid Prototyping BO`.
- Use Next.js 16 with the App Router for the backoffice application.
- Use Tailwind CSS for styling.
- Use Zustand for lightweight client-side state management.
- Use a minimal design-system package with only the initial primitives required for the PoC.
- Start with a shadcn/ui-compatible atomic design slice: Button atom, OrderSummaryCard molecule, and OrderHistoryPanel organism.
- Keep design-system components presentational and controlled through props.
- Keep design tokens centralized in the design-system package.
- Create an API client package for TypeScript/Zod-first contracts.
- Keep OpenAPI/Swagger generation out of scope for the first PoC.
- Make Vercel previews mock-only.
- Use deterministic mock payloads that cover happy path, empty state, error state, and large-data cases when relevant.
- Use v0 as the generation engine and GitHub as the artifact store for the PoC.
- Treat v0 pull requests as handoff PRs, not automatically mergeable production PRs.
- Use Jira as the delivery backlog under `Blue Ecomm - Rapid Prototyping`,
  project key `RAP`, board `2028`.
- Create a parent Jira delivery story and sub-tasks for FE and BE after prototype approval.
- Create the BE sub-task only when the approved prototype requires an API contract change.
- Defer branch and commit normalization based on Jira keys to a later phase.
- Defer custom v0 Platform API portal work to a later phase.

## Testing Decisions

- Prefer tests at user-visible seams rather than implementation details.
- Validate that the Order History dashboard renders from deterministic mock data.
- Validate that Button, OrderSummaryCard, and OrderHistoryPanel render consistently through the design-system package.
- Validate that Zustand state is used only for client UI state, not backend-derived source-of-truth data.
- Validate that mock payloads conform to typed API contracts.
- Validate that preview builds do not require live backend access.
- For the PoC, PR checklist review is sufficient for context updates; CI enforcement can be added after rules stabilize.

## Out of Scope

- Production backend integration.
- OpenAPI/Swagger contract generation.
- Authentication against real identity providers.
- Production secrets or real customer data.
- Custom Vercel-hosted prototype portal around the v0 Platform API.
- Support for Bitbucket or other non-GitHub repository providers.
- Automatic merge to production.
- Automated branch and commit normalization using Jira ticket keys.
- Large component library coverage beyond Button, OrderSummaryCard, and OrderHistoryPanel.

## Further Notes

- The PoC should use native v0 workspace capabilities first.
- The design system should be represented as a v0 Design System Skill so v0 uses project-approved components and tokens.
- The app should remain small enough to inspect manually, but structured enough to prove the intended delivery workflow.
- The first feature surface is a read-only Order History dashboard.
