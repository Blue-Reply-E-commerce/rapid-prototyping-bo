# Issue Tracker

## Canonical Tracker

Delivery work for this repository is tracked in Jira:

- Jira site: `https://bluereplyexp.atlassian.net`
- Jira project key: `RAP`
- Jira board ID: `2028`
- Jira board URL: `https://bluereplyexp.atlassian.net/jira/software/projects/RAP/boards/2028`
- GitHub repository: `https://github.com/alefari96/rapid-prototyping`

Jira is the delivery source of truth once an issue has been created there.
Files under `docs/issues/rapid-prototyping-bo/` are local planning drafts until
they are published to Jira and mapped to real `RAP-*` issue keys.

## MCP Access

Agents may read from and write to Jira only through an authenticated Atlassian
MCP connection. Credentials, OAuth tokens, API tokens, and local MCP session
state must never be committed to this repository.

Before the first Jira write in a new environment, verify that the Atlassian MCP
connection can:

- Read Jira site `https://bluereplyexp.atlassian.net`.
- Read project `RAP`.
- Read board `2028`.
- List available issue types for project `RAP`.
- List required fields, statuses, components, labels, and workflow transitions.
- Create or update a small smoke-test issue only after human approval.

## Write Boundaries

Agents may create Jira issues in `RAP` when a human asks to decompose approved
work, publish the local backlog, or prepare delivery tickets.

Agents must not:

- Move issues to Done without explicit human instruction.
- Add issues to a sprint or change sprint commitments without explicit human
  instruction.
- Assign issues to a person unless the assignee rule has been confirmed.
- Batch multiple Jira writes when the individual issue contents would be hidden
  from the human approver.
- Store Jira credentials, tokens, cookies, or MCP auth state in the repo.

## Local Draft Mapping

When a local draft is published to Jira, update the draft with:

- The created Jira key, for example `RAP-123`.
- A note that Jira is the status source of truth.
- Any local draft ID mapping that future agents need for blockers or links.

After publication, do not manually maintain issue status in markdown. Read live
status from Jira through MCP.
