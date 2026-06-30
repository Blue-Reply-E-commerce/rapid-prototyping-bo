# Triage Labels

Use these role names as the default vocabulary for local drafts and Jira labels
or equivalent fields. If project `RAP` uses a different configured field or
label set, record the real mapping here before creating or updating Jira issues.

| Role | Default value | Meaning |
| --- | --- | --- |
| Needs triage | `needs-triage` | Maintainer needs to evaluate the issue. |
| Needs info | `needs-info` | Waiting on reporter or product input. |
| Ready for agent | `ready-for-agent` | Fully specified and suitable for autonomous agent work. |
| Ready for human | `ready-for-human` | Requires human review, access, decision, or implementation. |
| Won't fix | `wontfix` | Will not be actioned. |

For the Rapid Prototyping BO workflow, also preserve the local distinction used
in backlog drafts:

- `AFK`: suitable for autonomous implementation once dependencies are satisfied.
- `HITL`: human-in-the-loop work, usually because it needs approval, credentials,
  project configuration, or live Jira validation.

Do not create new Jira labels automatically unless the project configuration has
been checked and the human approves the label creation.
