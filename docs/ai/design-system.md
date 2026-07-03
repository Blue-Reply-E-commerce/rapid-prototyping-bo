# Design System Guidance

The backoffice must use a project-owned design system that v0 can learn through
a v0 Design System Skill. The skill should be grounded in real source files,
the consuming app, and these conventions.

## Sources For v0

- Design-system source: `packages/design-system/src`.
- Package manifest: `packages/design-system/package.json`.
- Consumer app: `apps/rapid-prototyping-bo`.
- Design tokens: `packages/design-system/src/tokens`.
- Tailwind/global CSS integration: `apps/rapid-prototyping-bo/tailwind.config.ts`
  and `apps/rapid-prototyping-bo/src/app/globals.css`.
- Usage example: `apps/rapid-prototyping-bo/src/app/dashboard/page.tsx`.
- Component tests: `packages/design-system/src/**/*.test.tsx`.
- Storybook stories: `packages/design-system/src/**/*.stories.tsx` once
  Storybook is added to the package.

## Package Structure

- Organize source files by atomic design level: `src/atoms`, `src/molecules`,
  and `src/organisms`.
- Within each atomic level, keep each public component in its own folder with
  the component implementation, Storybook story, component test, and local
  `index.ts`.
- Preferred component folder shape:
  - `component-name.tsx`
  - `component-name.examples.ts`
  - `component-name.stories.tsx`
  - `component-name.test.tsx`
  - `index.ts`
- Keep the root package barrel as the normal app import path:
  `@rapid-prototyping-bo/design-system`.
- Expose stable component subpaths when direct imports are useful, such as
  `@rapid-prototyping-bo/design-system/button`.
- Do not expose atomic level folder names as the preferred public API. A
  component can move between atomic levels without forcing app import rewrites.
- Keep JavaScript component modules ESM-friendly and side-effect free so
  consumers can tree-shake unused exports. Preserve CSS token files as explicit
  CSS side effects so token imports are not dropped by bundlers.

## Approved PoC Components

- `Button` from `@rapid-prototyping-bo/design-system`
  - Variants: `primary`, `secondary`, `ghost`.
  - Sizes: `sm`, `md`.
- `OrderSummaryCard` from `@rapid-prototyping-bo/design-system`
  - A presentational molecule for rendering a compact KPI label, value, and
    supporting detail.
- `OrderHistoryPanel` from `@rapid-prototyping-bo/design-system`
  - A presentational organism for the first read-only Order History surface.
  - It receives view-ready rows, filter options, selected values, and callbacks
    from the consuming app.
  - It must not import app state, API-client types, or perform domain filtering
    and formatting internally.

Use shadcn/ui-compatible primitives as the implementation model: typed props,
`class-variance-authority` variant definitions, `@radix-ui/react-slot`
composition where polymorphic rendering is needed, `data-slot` attributes,
Tailwind utility classes, and small composable exports.

## Token Rules

- Treat `packages/design-system/src/tokens` as the canonical source for design
  tokens.
- Store canonical tokens CSS-first, using Tailwind v4-compatible `@theme`
  variables that the app imports into global CSS.
- Use design-system tokens before hard-coded values.
- Current color tokens: `canvas`, `ink`, `muted`, `line`, `accent`, `warning`, `danger`.
- Keep app Tailwind and global CSS setup aligned to the design-system token
  source.
- Do not add token generation, JSON-to-CSS build steps, or TypeScript-first token
  pipelines until there is a concrete need.
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

## Component Responsibility

- Design-system components must be presentational and controlled through props.
- Do not put application state, data fetching, API-client imports, Zustand stores,
  routing decisions, or backend orchestration inside design-system components.
- Organisms may compose atoms and molecules into richer UI sections, but they
  still receive data, selected values, and event callbacks from the consuming app.
- Pass view-ready props into the design system. Keep domain-specific filtering,
  sorting, currency/date formatting, status mapping, and API-shape adaptation in
  the consuming app or a package outside the design system.
- When v0 needs new behaviour, update app state and API contracts in the app or
  API package, then pass the resulting values into design-system components.

## Storybook Contract

- Storybook is part of the design-system definition of done.
- Every public design-system component must have a Storybook story.
- Adding a public component requires adding its story in the same change.
- Changing a public component API, variant, visual state, or supported usage
  requires updating its story in the same change.
- Prefer Storybook for visual examples and documented states. Keep automated
  Vitest component tests for behavior and regressions.
- Treat Storybook stories as visual documentation for the current slice.
- Run a Storybook production build as the automatic check that stories compile.
- Do not add visual regression or screenshot testing until there is a concrete
  review need and the maintenance cost is justified.
- Use the React Vite Storybook framework for the design-system package rather
  than the Next.js framework, because the package is a React component library
  consumed by the app, not a Next application.

## Test Contract

- Vitest is the design-system test runner.
- Use React Testing Library for component tests that need DOM rendering,
  accessibility queries, user-facing assertions, or event callbacks.
- Use jsdom as the component test environment.
- Keep tests co-located with the component they protect using
  `component-name.test.tsx`.
- Test public behavior: rendered text, accessible roles and labels, callback
  wiring, selected or disabled states, variant output, and stable `data-slot`
  markers when they are part of the component contract.
- Do not test private implementation details such as atomic folder placement,
  helper function internals, class merging mechanics, or private child
  composition.

## Component Examples

- Keep reusable component examples next to the component using
  `component-name.examples.ts`.
- Use component-local examples to share realistic props between Storybook
  stories and component tests.
- Prefer examples that describe supported public states, such as default,
  selected, empty, disabled, loading, compact, or error states when those states
  exist for the component.
- Do not create a global fixture directory for design-system component examples
  unless multiple components genuinely share the same domain-neutral data shape.
- Keep examples view-ready and design-system-owned. Do not import app stores,
  API-client types, mock API payloads, routes, or backend-shaped responses into
  design-system examples.

## Adding Or Changing Components

When a generated UI need cannot be met with the approved components:

1. Add or update the primitive in a component folder under the appropriate
   atomic level in `packages/design-system/src`.
2. Export it from `packages/design-system/src/index.ts`.
3. Add or update the component Storybook story.
4. Add or update component-local examples when the story and test need shared
   representative props.
5. Add or update the component test next to the component.
6. Replace one-off app markup with the shared primitive where it applies.
7. Update this file with the new component API, variants, tokens, and usage guidance.

## v0 Design System Skill Notes

This file is suitable as the notes input for a v0 Design System Skill. Include
the sources above when importing the skill so v0 can verify components, props,
tokens, global setup, and real consumer usage. If a component, prop, or token
cannot be verified from these sources, v0 should not use it.
