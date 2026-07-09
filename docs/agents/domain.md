# Domain Docs

This repository uses a single-context documentation layout.

## Required Reading

Agents working in this repo should read these files before planning or changing
work that touches product behavior, delivery flow, or architecture:

- `CONTEXT.md`: domain language and shared glossary.
- `docs/prd/rapid-prototyping-bo.md`: product goals and PoC scope.
- `docs/ai/v0-instructions.md`: v0 operating rules and read order.
- `docs/ai/project-scope.md`: workspace boundaries and delivery boundaries.
- `docs/ai/jira-handoff.md`: Jira delivery runbook.
- `docs/agents/issue-tracker.md`: canonical tracker and MCP boundaries.
- `docs/agents/triage-labels.md`: triage vocabulary.

For work that touches the future portal or the BO-to-portal integration, also
read the portal-owned architecture PRD in the sibling repository:
`../rapid-prototyping-portal/docs/prd/rapid-prototyping-portal-architecture.md`.

## ADRs

There is no `docs/adr/` directory yet. Add ADRs only for durable architecture
decisions that are difficult to reverse, surprising without context, and based
on a real trade-off.

## Context Update Rule

When agent work changes domain terminology, Jira workflow rules, issue shapes,
v0 operating rules, mock runtime behavior, API contract ownership, or design
system conventions, update the matching context document in the same change.
