# Add v0 project context and design-system guardrails

Local ID: RPBO-005

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 2, 3, 11, 12

## What to build

Add modular AI context files that v0 can use as the entrypoint for future generated changes. The context should keep generated work scoped to the real backoffice app, mock-only previews, approved design-system primitives, typed contracts, deterministic mock payloads, and handoff PR expectations.

## Acceptance criteria

- [x] The repository contains a clear v0 entrypoint for project instructions.
- [x] The context references project scope, design-system rules, API client rules, mock runtime rules, Jira handoff rules, and context-maintenance rules.
- [x] The instructions tell v0 to modify the real `Rapid Prototyping BO` frontend rather than creating detached demo apps.
- [x] The instructions require Vercel previews to remain mock-only.
- [x] The instructions direct generated UI to use approved design-system components when they exist.
- [x] The instructions require context docs to be updated when project conventions, contracts, or domain language change.
- [x] The design-system context is suitable to become or support a v0 Design System Skill.

## Blocked by

- RPBO-003 - Build the first dashboard with shared design-system primitives
