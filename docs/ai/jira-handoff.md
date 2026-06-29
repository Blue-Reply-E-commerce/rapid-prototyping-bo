# Jira Handoff Guidance

Jira tracks approved prototype work after the reviewer accepts a mock-only
prototype preview. This runbook defines the constrained handoff flow for the
`Blue Ecomm - Rapid Prototyping` workstream.

## Target Project

- Jira workstream/project: `Blue Ecomm - Rapid Prototyping`.
- Parent issue type: Story.
- Child issue type: sub-task.
- Jira project key, required fields, components, labels, and assignee rules must
  be confirmed by a human in the real Jira project before the first write.

## Trigger And Preconditions

Create Jira delivery issues only when all of the following are true:

- The prototype preview has been approved by the reviewer.
- The handoff PR exists and uses `.github/pull_request_template.md`.
- The Vercel preview URL is present and the preview remains mock-only.
- The handoff PR names API contract changes, or explicitly states that none are
  required.
- Mock payloads or fixtures used by the preview are named.
- Acceptance criteria for the approved prototype are available.
- Jira writes will be executed through the MCP flow with human approval.

v0 handoff PRs may prepare Jira draft content, but they must not perform Jira
write actions automatically.

## Required Inputs

Before creating Jira issues, collect these values from the approved handoff PR:

- Vercel preview URL.
- GitHub handoff PR URL.
- User-facing change summary.
- Primary workspace paths changed.
- API contract changes, or the explicit no-contract-change statement.
- Mock payloads or fixtures used by the preview, including paths when available.
- Acceptance criteria based on the approved preview.
- Context files changed, or why no context update was needed.
- Reviewer decision on whether backend delivery is required.

## BE Sub-Task Decision

A BE sub-task is required only when the approved prototype needs backend
behavior, fields, response states, validation, persistence, or endpoint semantics
that are not already supported by the current API contract.

Use this decision table during review:

| Review observation | BE sub-task required? | Jira note |
| --- | --- | --- |
| UI-only layout, copy, styling, or client-only state changes | No | State that delivery is frontend-only. |
| UI consumes existing contract fields without changing shape or meaning | No | Name the existing contract or endpoint that already supports the behavior. |
| Mock payload adds, renames, removes, or changes the meaning of response fields | Yes | Describe the contract delta and affected schema or fixture path. |
| Prototype requires new filters, sorting, validation, persistence, status values, or error states from a backend | Yes | Describe the required backend behavior and acceptance criteria. |
| Existing backend support is uncertain | Do not create BE yet | Mark backend impact as needing reviewer confirmation before Jira write approval. |

When the BE sub-task is not created, the parent Story or FE sub-task must still
record the reviewer decision and the evidence used.

## Jira Creation Sequence

1. Prepare one parent delivery Story draft for the approved prototype.
2. Ask the MCP Jira flow to create the parent Story in
   `Blue Ecomm - Rapid Prototyping`.
3. Wait for human approval before the parent Story write is performed.
4. Prepare one FE sub-task draft linked to the parent Story.
5. Ask the MCP Jira flow to create the FE sub-task.
6. Wait for human approval before the FE sub-task write is performed.
7. If the BE decision requires backend work, prepare one BE sub-task draft linked
   to the parent Story.
8. Ask the MCP Jira flow to create the BE sub-task.
9. Wait for human approval before the BE sub-task write is performed.
10. If the BE decision does not require backend work, record that decision in the
    parent Story or FE sub-task instead of creating a BE sub-task.

Do not batch Jira writes in a way that hides individual issue content from the
human approver.

## Parent Story Template

Use this shape for the parent delivery Story:

- Summary: deliver approved prototype for `<feature or screen name>`.
- Description:
  - Approved prototype: `<Vercel preview URL>`.
  - Handoff PR: `<GitHub PR URL>`.
  - Scope: user-facing summary from the handoff PR.
  - Changed paths: primary workspace paths from the handoff PR.
  - API contract impact: contract delta or explicit no-contract-change statement.
  - Mock payloads and fixtures: names and paths used by the preview.
  - Acceptance criteria: reviewer-approved behavior.
  - Context updates: changed context files, or why none were needed.
  - Delivery shape: FE sub-task plus conditional BE sub-task decision.
- Links: Vercel preview and GitHub handoff PR.

## FE Sub-Task Template

Create one FE sub-task for every approved prototype:

- Summary: implement frontend delivery for `<feature or screen name>`.
- Description:
  - Parent approved prototype: `<Vercel preview URL>`.
  - Handoff PR: `<GitHub PR URL>`.
  - Frontend scope: UI, design-system, state, routing, and mock-runtime changes to
    deliver.
  - API contract impact: no change, existing contract usage, or linked BE
    sub-task for required contract work.
  - Mock payloads and fixtures: names and paths used by the preview.
  - Acceptance criteria: frontend-specific checks.
  - Notes: production readiness items not proven by the prototype preview.

## Conditional BE Sub-Task Template

Create one BE sub-task only when the decision table requires backend delivery:

- Summary: support backend contract for `<feature or screen name>`.
- Description:
  - Parent approved prototype: `<Vercel preview URL>`.
  - Handoff PR: `<GitHub PR URL>`.
  - Contract delta: fields, response states, request parameters, validation, or
    endpoint behavior required by the approved prototype.
  - Affected contract files: paths in `packages/api-client` when available.
  - Mock payloads and fixtures: names and paths that demonstrate the required
    shape.
  - Acceptance criteria: backend-observable behavior needed by FE delivery.
  - Open questions: unresolved API ownership, naming, or compatibility concerns.

## Manual Approval Boundary

Jira write actions require human approval through the MCP flow. Agents and v0
may draft issue content, compare it to this runbook, and ask the MCP flow to
prepare writes, but a human must approve each Jira create or update action before
it is executed.

## Validation Checklist

Before approving Jira writes, reviewers should confirm:

- The target workstream/project is `Blue Ecomm - Rapid Prototyping`.
- The parent issue is a Story for the approved prototype work.
- Exactly one FE sub-task is linked to the parent Story.
- A BE sub-task is created only when the decision table requires backend
  delivery.
- The issue content references the Vercel preview URL, GitHub handoff PR, API
  contract impact, mock payloads or fixtures, and acceptance criteria.
- Jira-required fields in the real project have been reviewed by a human.
- Each Jira write action is visible in the MCP approval prompt before execution.

## Handoff PR Expectations

Use `.github/pull_request_template.md` for v0 handoff PRs. The PR body should
make the prototype reviewable before Jira delivery work is created.

Handoff PRs are review and planning artifacts. They do not imply production
merge readiness until the reviewer accepts the prototype, delivery work is
planned, and any required FE or BE tasks are created.
