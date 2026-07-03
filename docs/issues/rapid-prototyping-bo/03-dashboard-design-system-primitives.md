# Build the first dashboard with atomic design-system components

Local ID: RPBO-003

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 3, 4, 5

## What to build

Create the initial project-owned design-system package and use it to assemble the first read-only Order History dashboard from a shadcn/ui-compatible atomic design slice: Button atom, OrderSummaryCard molecule, and OrderHistoryPanel organism. The result should feel like an operational backoffice surface: clear hierarchy, restrained styling, predictable spacing, and no marketing-style hero layout.

## Acceptance criteria

- [ ] A design-system package exists in the workspace and is consumable by the backoffice app.
- [ ] Button, OrderSummaryCard, and OrderHistoryPanel are implemented using a shadcn/ui-compatible approach appropriate for the project.
- [ ] Public design-system components are organized in component folders that co-locate implementation, Storybook story, component examples, component test, and local exports.
- [ ] The dashboard imports approved public components from the design-system package rather than defining one-off local copies for matching UI.
- [ ] Design-system components stay presentational and receive data, selected values, and callbacks through props.
- [ ] Design tokens are centralized in the design-system package and consumed by the app.
- [ ] Tailwind styling remains consistent across the app and design-system package.
- [ ] The dashboard uses compact, scannable backoffice composition for lightweight KPIs, simple filters, and an order history table rather than decorative or marketing-oriented layout patterns.
- [ ] Storybook is available for the design-system package, and every public component in this slice has a maintained story.
- [ ] The Storybook production build succeeds; screenshot or visual regression tests are not required for this slice.
- [ ] Vitest-based co-located component tests verify that Button, OrderSummaryCard, and OrderHistoryPanel render consistently and preserve their public behavior.

## Blocked by

- RPBO-001 - Bootstrap the mock-only Rapid Prototyping BO app shell
- RPBO-002 - Introduce typed dashboard contracts and deterministic mock runtime
