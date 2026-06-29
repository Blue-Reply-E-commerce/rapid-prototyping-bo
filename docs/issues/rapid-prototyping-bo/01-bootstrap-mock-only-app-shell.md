# Bootstrap the mock-only Rapid Prototyping BO app shell

Local ID: RPBO-001

Type: AFK

Suggested label: `ready-for-agent`

User stories covered: 1, 5

## What to build

Create the initial `Rapid Prototyping BO` frontend workspace as a minimal pnpm/Turborepo monorepo with a Next.js 16 App Router backoffice application. The app should expose the first dashboard route and prove that a Vercel prototype preview can load without backend access, production credentials, VPN access, secrets, or real customer data.

Keep the surface intentionally small, but structure it as the foundation for the later design-system, API contract, mock runtime, and v0 handoff slices.

## Acceptance criteria

- [ ] The workspace is managed by pnpm and Turborepo with clear scripts for local development, build, lint, and test execution.
- [ ] The first application is named and presented as `Rapid Prototyping BO`.
- [ ] The application uses Next.js 16 with the App Router.
- [ ] The dashboard route renders a minimal backoffice shell that can be opened without any live backend dependency.
- [ ] Tailwind CSS is configured for the application in a way that can be shared predictably with future workspace packages.
- [ ] The preview build path does not require production secrets, VPN access, real customer data, or live backend credentials.
- [ ] A smoke test or equivalent verification proves that the dashboard page renders in the mock-only preview path.

## Blocked by

None - can start immediately.
