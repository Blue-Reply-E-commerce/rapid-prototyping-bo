# PRD: Atomic shadcn-compatible Design System

Suggested triage label: `ready-for-agent`

## Problem Statement

The Rapid Prototyping BO has a small project-owned design system, but its
current shape is too flat for sustained v0-generated work. Components are not
organized by atomic design level, design tokens are still effectively owned by
the consuming app, and the approved component surface is not precise enough to
guide future generated changes.

The team needs the design system to become the canonical UI foundation for the
backoffice while staying small, testable, and easy for v0 to understand. The
first iteration must prove the pattern with one atom, one molecule, and one
organism only.

## Solution

Restructure the design system around atomic design and make its conventions
explicit for both engineers and AI-generated changes. The package will expose a
minimal public component surface for the first proof: a Button atom, an
OrderSummaryCard molecule, and an OrderHistoryPanel organism.

Components will use shadcn/ui-compatible implementation patterns rather than a
loose visual approximation. Design tokens will move into the design system as
the canonical CSS-first source, and the consuming backoffice app will import and
apply those tokens instead of owning them locally.

The design-system components will remain presentational. Application state,
fetching, filtering, formatting, API shape adaptation, routing, and store usage
will stay in the consuming app or other non-design-system packages. Organisms
may compose atoms and molecules into richer UI sections, but they receive
view-ready props and callbacks from the app.

## User Stories

1. As a frontend engineer, I want the design system organized by atomic design level, so that component ownership and composition boundaries are clear.
2. As a frontend engineer, I want a Button atom implemented with shadcn/ui-compatible patterns, so that the most basic action primitive is familiar to v0 and engineers.
3. As a frontend engineer, I want an OrderSummaryCard molecule, so that lightweight order KPIs are rendered through a reusable design-system component.
4. As a frontend engineer, I want an OrderHistoryPanel organism, so that the first read-only Order History surface has a reusable presentational shell.
5. As a frontend engineer, I want design-system components to be controlled through props, so that app state does not leak into shared UI components.
6. As a frontend engineer, I want the OrderHistoryPanel to receive view-ready rows and controls, so that filtering and formatting remain outside the design system.
7. As a frontend engineer, I want the design-system package to expose a root barrel import, so that app code remains ergonomic.
8. As a frontend engineer, I want stable component subpath exports, so that direct imports remain possible without exposing atomic folders as public API.
9. As a frontend engineer, I want JavaScript component modules to stay side-effect free and CSS token imports preserved, so that unused component exports can be tree-shaken without dropping required tokens.
10. As a frontend engineer, I want design tokens centralized in the design system, so that the app and components use the same canonical values.
11. As a frontend engineer, I want tokens to be CSS-first and Tailwind v4-compatible, so that class names such as canvas, ink, muted, line, accent, warning, and danger resolve consistently.
12. As a frontend engineer, I want the consuming app to import design-system tokens, so that token values are not duplicated across app-level Tailwind and global CSS setup.
13. As a v0 user, I want AI instructions to name the approved atomic component surface, so that generated UI does not invent unapproved primitives.
14. As a v0 user, I want AI instructions to forbid application logic inside design-system components, so that generated changes keep the design system presentational.
15. As a v0 user, I want AI instructions to describe the token source of truth, so that generated styles use approved tokens instead of hard-coded palettes.
16. As a reviewer, I want the first slice limited to one atom, one molecule, and one organism, so that the pattern can be reviewed before the library grows.
17. As a reviewer, I want Card removed from the public first-slice API, so that v0 is guided toward approved molecules and organisms instead of composing raw containers everywhere.
18. As a maintainer, I want the dashboard to keep its current read-only Order History behavior, so that the design-system refactor does not expand product scope.
19. As a maintainer, I want tests at package and app seams, so that the external behavior is protected without locking down implementation details.
20. As a design-system maintainer, I want every public component to have a Storybook story, so that visual states and supported usage stay discoverable as the library grows.
21. As a delivery lead, I want this PRD to remain a local planning artifact until explicitly published, so that Jira is not changed without human approval.

## Implementation Decisions

- The design system will use atomic design as its internal source organization: atoms, molecules, and organisms.
- Within each atomic level, public components should live in dedicated
  component folders that co-locate implementation, Storybook story, component
  examples, component test, and local `index.ts`.
- Atomic folder names are not the preferred public API. Components may move between atomic levels without forcing app import rewrites.
- Consumers should normally import from the design-system root barrel.
- Stable component subpath exports may be provided for direct component imports.
- The design-system package should remain ESM-friendly. JavaScript component
  modules should be side-effect free, while CSS token files should be preserved
  as explicit CSS side effects.
- The first public component surface is limited to Button, OrderSummaryCard, and OrderHistoryPanel.
- Button is the first atom.
- OrderSummaryCard is the first molecule and renders a compact KPI label, value, and supporting detail.
- OrderHistoryPanel is the first organism and renders the first read-only Order History panel shell.
- Card is not part of the public API for this first slice.
- Components will follow shadcn/ui-compatible patterns, including typed props, class variance definitions, slot-based composition where useful, data-slot attributes, and Tailwind utility classes.
- Design tokens are owned by the design system, not by the consuming app.
- Tokens are CSS-first and compatible with Tailwind v4 theme variables.
- The existing operational color tokens remain the initial token set: canvas, ink, muted, line, accent, warning, and danger.
- The consuming app will align its global CSS and Tailwind setup to the design-system token source.
- Design-system components must be presentational and controlled through props.
- The design system must not import application stores, API-client types, data fetching code, routing decisions, or backend orchestration.
- The consuming app is responsible for turning API-shaped data into view-ready props.
- The consuming app is responsible for filtering, sorting, currency formatting, date formatting, status label mapping, and status tone mapping.
- The OrderHistoryPanel should receive selected values and callbacks for search, status filter, and density controls.
- The dashboard should keep the existing read-only Order History scope: lightweight order KPIs, simple status/text filters, read-only rows, no order actions, no order detail route, no customer identity, and no line items.
- AI guidance must be updated so v0 treats the design-system package as the source for approved components and tokens.
- Storybook is part of the design-system definition of done: every public
  component addition or public component change must include the matching story
  update.
- Storybook stories are visual documentation in this slice, and the automatic
  quality gate is that the Storybook production build succeeds.
- Visual regression or screenshot testing is out of scope until there is a
  concrete review need that justifies the setup and maintenance cost.
- The design-system package should use the React Vite Storybook framework
  rather than the Next.js framework because it is a React component library, not
  an application.
- Vitest is the design-system test runner.
- Component tests should use React Testing Library with jsdom when DOM rendering,
  accessibility queries, or callback assertions are needed.
- Component-local examples should be used to share representative props between
  Storybook stories and tests. They should stay view-ready and must not import
  app stores, API-client types, mock API payloads, routes, or backend-shaped
  responses.
- No Jira publication is part of this local PRD unless a human explicitly asks for it later.

## Testing Decisions

- Tests should verify external behavior at the highest practical seam instead of implementation details.
- Design-system component tests should be co-located with their component
  folder.
- Vitest is the standard runner for design-system component tests.
- React Testing Library is the standard way to render React components in tests
  that need DOM behavior or user-facing assertions.
- Component examples should be co-located with their component when they are
  reused by stories and tests.
- Storybook stories document visual states and supported usage; automated render
  tests remain responsible for CI-friendly component regression checks.
- The Storybook build should be run as a compile-time guard for story validity.
- Screenshot and visual regression tests are not part of the first Storybook
  slice.
- The Button test should verify the public atom contract: slot marker, variant output, size output, accessible button rendering, and text rendering.
- The OrderSummaryCard test should verify the molecule contract: label, value, detail, and stable data-slot markers.
- The OrderHistoryPanel test should verify the organism contract through view-ready props: title, controls, rows, empty state, selected values, callbacks wired to interactive controls where practical, and stable slot markers.
- The consuming dashboard should be validated through the existing app build or highest available app-level render/build seam.
- Tests should not assert internal folder layout, class helper implementation, store selectors, or private component composition.
- Tests should not require live backend access, production secrets, customer data, or Jira access.
- The previous `src/__checks__/render.test.tsx` package-boundary check should
  be removed during the co-located test migration.
- Context documentation changes are validated by review rather than automation for this slice.

## Out of Scope

- Building a broad component library beyond Button, OrderSummaryCard, and OrderHistoryPanel.
- Publishing or updating Jira issues.
- Adding a custom v0 Platform API portal.
- Introducing production backend integration.
- Adding OpenAPI generation or changing API contracts unless the consuming app already requires it.
- Adding authentication, authorization, or real customer data.
- Introducing a second theme system, CSS-in-JS runtime, or token generation pipeline.
- Creating a generic DataTable, DataPanel, or generalized dashboard framework.
- Supporting dark mode or multi-brand theming in this first slice.
- Changing the business scope of the read-only Order History dashboard.

## Further Notes

- This PRD is a local planning artifact. Jira remains the delivery source of
  truth only after explicit human-approved publication.
- The design-system guidance has already started shifting toward these
  decisions and should stay aligned with the implementation.
- The next natural step after this PRD is to break the work into implementation
  issues or apply the changes directly, depending on the desired workflow.
