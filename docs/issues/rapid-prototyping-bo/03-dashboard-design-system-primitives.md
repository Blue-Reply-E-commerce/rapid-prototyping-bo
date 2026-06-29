# Build the first dashboard with shared design-system primitives

Local ID: RPBO-003

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 3, 4, 5

## What to build

Create the initial project-owned design-system package and use it to assemble the first dashboard from shared Button and Card primitives. The result should feel like an operational backoffice surface: clear hierarchy, restrained styling, predictable spacing, and no marketing-style hero layout.

## Acceptance criteria

- [ ] A design-system package exists in the workspace and is consumable by the backoffice app.
- [ ] Button and Card primitives are implemented using a shadcn/ui-style approach appropriate for the project.
- [ ] The dashboard imports Button and Card from the design-system package rather than defining one-off local copies.
- [ ] Tailwind styling remains consistent across the app and design-system package.
- [ ] The dashboard uses compact, scannable backoffice composition rather than decorative or marketing-oriented layout patterns.
- [ ] Tests or component-level checks verify that Button and Card render consistently through the package boundary.

## Blocked by

- RPBO-001 - Bootstrap the mock-only Rapid Prototyping BO app shell
- RPBO-002 - Introduce typed dashboard contracts and deterministic mock runtime
