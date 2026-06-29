# Design System Guidance

The backoffice must use a project-owned design system that v0 can learn through
a v0 Design System Skill. The skill should be grounded in real source files,
the consuming app, and these conventions.

## Sources For v0

- Design-system source: `packages/design-system/src`.
- Package manifest: `packages/design-system/package.json`.
- Consumer app: `apps/rapid-prototyping-bo`.
- Tailwind tokens: `apps/rapid-prototyping-bo/tailwind.config.ts` and `apps/rapid-prototyping-bo/src/app/globals.css`.
- Usage example: `apps/rapid-prototyping-bo/src/app/dashboard/page.tsx`.
- Component check: `packages/design-system/src/__checks__/render.test.tsx`.

## Approved PoC Components

- `Button` from `@rapid-prototyping-bo/design-system`
  - Variants: `primary`, `secondary`, `ghost`.
  - Sizes: `sm`, `md`.
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` from `@rapid-prototyping-bo/design-system`.

Use shadcn/ui-style primitives as the implementation model: typed props,
variant maps, `data-slot` attributes, Tailwind utility classes, and small
composable exports.

## Token Rules

- Use project Tailwind tokens before hard-coded values.
- Current color tokens: `canvas`, `ink`, `muted`, `line`, `accent`, `warning`, `danger`.
- Keep shared token definitions aligned between `tailwind.config.ts` and `globals.css`.
- Do not introduce a second theme system, unrelated color palette, CSS-in-JS runtime, or local component token file without updating this context.

## Composition Rules

- Build operational backoffice screens, not marketing pages.
- Prefer clear hierarchy, compact spacing, and predictable navigation.
- Avoid decorative hero layouts.
- Use cards for repeated dashboard items, panels, and genuinely framed tools.
- Avoid page sections styled as nested floating cards.
- Keep components reusable, restrained, and boring in the best sense.
- Use Tailwind tokens and shared component variants instead of one-off styling.
- Keep text sizes appropriate for dense operational screens.
- Preserve accessible button defaults, semantic headings, and labelled regions.

## Adding Or Changing Components

When a generated UI need cannot be met with the approved components:

1. Add or update the primitive in `packages/design-system/src`.
2. Export it from `packages/design-system/src/index.ts`.
3. Add or update a package-boundary render check under `packages/design-system/src/__checks__`.
4. Replace one-off app markup with the shared primitive where it applies.
5. Update this file with the new component API, variants, tokens, and usage guidance.

## v0 Design System Skill Notes

This file is suitable as the notes input for a v0 Design System Skill. Include
the sources above when importing the skill so v0 can verify components, props,
tokens, global setup, and real consumer usage. If a component, prop, or token
cannot be verified from these sources, v0 should not use it.
