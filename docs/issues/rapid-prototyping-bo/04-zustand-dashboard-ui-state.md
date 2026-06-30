# Add scoped Zustand client UI state to the dashboard

Local ID: RPBO-004

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 6

## What to build

Use Zustand for small client-only dashboard UI state, such as table density, status filter selection, and text search. The implementation should demonstrate the intended state-management boundary: Zustand is allowed for lightweight UI state, but backend-derived order history data remains owned by contracts and mock/API responses.

## Acceptance criteria

- [ ] Zustand is installed and wired only where client-side UI state is needed.
- [ ] The dashboard includes small user-visible order history interactions backed by Zustand state.
- [ ] Backend-derived order history data is not duplicated into Zustand as a source of truth.
- [ ] The UI state can be reset or initialized deterministically for tests.
- [ ] Tests verify the interaction and guard against using Zustand for API response ownership.

## Blocked by

- RPBO-002 - Introduce typed dashboard contracts and deterministic mock runtime
- RPBO-003 - Build the first dashboard with shared design-system primitives
