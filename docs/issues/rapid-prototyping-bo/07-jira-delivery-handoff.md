# Define Jira delivery handoff with conditional BE sub-task creation

Local ID: RPBO-007

Type: HITL

Suggested label: `ready-for-human`

User stories covered: 8, 10

## What to build

Define and validate the constrained Jira handoff flow for approved prototype work in the `Blue Ecomm - Rapid Prototyping` workstream. After a prototype preview is approved, the flow should create one parent Jira delivery Story, one FE sub-task, and a BE sub-task only when the approved prototype requires an API contract change.

Jira write actions should remain manual-approval actions through the MCP flow, so this slice requires human validation of the real Jira project, issue types, and required fields.

## Acceptance criteria

- [x] The handoff flow identifies the target Jira workstream/project as `Blue Ecomm - Rapid Prototyping`.
- [x] The flow creates one parent delivery Story for approved prototype work.
- [x] The flow creates one FE sub-task for frontend delivery work.
- [x] The flow creates a BE sub-task only when the approved prototype requires an API contract change.
- [x] Jira issue content references the Vercel preview URL, GitHub handoff PR, API contract changes, mock payloads or fixtures, and acceptance criteria.
- [x] Jira write actions require manual approval through the MCP flow.
- [x] The flow documents how reviewers determine whether a BE sub-task is required.

## Implementation

- `docs/ai/jira-handoff.md` defines the constrained Jira delivery runbook,
  issue templates, manual MCP approval boundary, and reviewer decision table for
  conditional BE sub-task creation.

## Blocked by

- RPBO-006 - Wire handoff PR expectations for prototype review
