# Context Maintenance

Context files must evolve with the project.

## Context Map

- `CONTEXT.md`: domain language and shared glossary.
- `docs/ai/v0-instructions.md`: entrypoint and non-negotiable v0 rules.
- `docs/ai/project-scope.md`: workspace boundaries and in/out of scope.
- `docs/ai/design-system.md`: component, token, and UI composition guidance.
- `docs/ai/api-client.md`: contract rules and typed payload conventions.
- `docs/ai/mock-runtime.md`: preview and fixture runtime rules.
- `docs/ai/jira-handoff.md`: post-approval Jira delivery flow.
- `docs/agents/issue-tracker.md`: canonical Jira tracker and MCP boundaries.
- `docs/agents/triage-labels.md`: local and Jira triage vocabulary.
- `docs/agents/domain.md`: agent documentation layout.

The Rapid Prototyping Portal owns its architecture documentation in the sibling
repository at
`../rapid-prototyping-portal/docs/prd/rapid-prototyping-portal-architecture.md`.
Update that file when portal orchestration, connector, artifact, approval, or
repository-boundary rules change.

## Update Rules

- Update `CONTEXT.md` when domain terminology changes.
- Update `docs/ai/*` when v0 operating rules change.
- Update API guidance when contract conventions change.
- Update design-system guidance when component APIs, variants, tokens, or usage examples change.
- Update mock-runtime guidance when preview behavior, fixture strategy, or mock endpoints change.
- Update Jira handoff guidance when issue shape, required links, or approval rules change.
- Update agent tracker guidance when the Jira site, project key, board, MCP
  permissions, or autonomy boundary changes.
- Add an ADR only for stable architecture decisions that are hard to reverse, surprising without context, and based on a real trade-off.
- Update the PR description when mock payloads, contract changes, or Jira handoff details change.

## PR Expectation

Every handoff PR should state which context files were updated or why no context update was needed.

## v0 Maintenance Prompt

Before finishing generated work, v0 should ask:

- Did this change introduce or rename domain language?
- Did this change add API fields, response states, or contract ownership rules?
- Did this change add or modify design-system components, variants, tokens, or composition rules?
- Did this change alter the mock-only preview runtime?
- Did this change alter Jira handoff expectations?

If the answer is yes, update the matching context file in the same handoff PR.
