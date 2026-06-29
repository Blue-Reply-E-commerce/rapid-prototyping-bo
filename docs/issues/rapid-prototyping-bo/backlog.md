# Rapid Prototyping BO Local Backlog

Source PRD: `docs/prd/rapid-prototyping-bo.md`

Jira connection is out of scope for now. Use this backlog as the working issue index until the drafts are published.

| Local ID | Title | Type | Suggested label | Blocked by | User stories |
| --- | --- | --- | --- | --- | --- |
| RPBO-001 | Bootstrap the mock-only Rapid Prototyping BO app shell | AFK | `ready-for-agent` | None | 1, 5 |
| RPBO-002 | Introduce typed dashboard contracts and deterministic mock runtime | AFK | `ready-for-agent` | RPBO-001 | 1, 7, 8 |
| RPBO-003 | Build the first dashboard with shared design-system primitives | AFK | `ready-for-agent` | RPBO-001, RPBO-002 | 3, 4, 5 |
| RPBO-004 | Add scoped Zustand client UI state to the dashboard | AFK | `ready-for-agent` | RPBO-002, RPBO-003 | 6 |
| RPBO-005 | Add v0 project context and design-system guardrails | AFK | `ready-for-agent` | RPBO-003 | 2, 3, 11, 12 |
| RPBO-006 | Wire handoff PR expectations for prototype review | AFK | `ready-for-agent` | RPBO-002, RPBO-005 | 8, 9, 12 |
| RPBO-007 | Define Jira delivery handoff with conditional BE sub-task creation | HITL | `ready-for-human` | RPBO-006 | 8, 10 |

## Dependency Order

1. RPBO-001
2. RPBO-002
3. RPBO-003
4. RPBO-004 and RPBO-005 can proceed after their blockers are complete.
5. RPBO-006
6. RPBO-007

## Deferred Jira Publication

When Jira access is available, publish in dependency order and replace local IDs in the `Blocked by` sections with real Jira issue keys.
