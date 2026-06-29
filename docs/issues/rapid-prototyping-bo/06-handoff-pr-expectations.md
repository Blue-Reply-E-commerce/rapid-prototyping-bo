# Wire handoff PR expectations for prototype review

Local ID: RPBO-006

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 8, 9, 12

## What to build

Add the GitHub handoff PR expectations for approved v0 output. A handoff PR should make the prototype preview reviewable and delivery-ready without implying automatic production merge readiness.

## Acceptance criteria

- [x] The repository contains a handoff PR template or checklist for generated v0 work.
- [x] The checklist asks for the Vercel preview URL.
- [x] The checklist asks for a summary of API contract changes or an explicit statement that no contract changes are required.
- [x] The checklist asks for mock payloads or fixtures used by the preview.
- [x] The checklist asks which context files were updated, or why no context update was needed.
- [x] The checklist makes clear that v0 handoff PRs are review artifacts, not automatically mergeable production PRs.
- [x] Review guidance supports backend impact discovery when frontend changes require contract changes.

## Blocked by

- RPBO-002 - Introduce typed dashboard contracts and deterministic mock runtime
- RPBO-005 - Add v0 project context and design-system guardrails
