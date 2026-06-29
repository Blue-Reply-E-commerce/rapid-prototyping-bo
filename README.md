# Rapid Prototyping BO

Mock-only backoffice prototype workspace managed with pnpm and Turborepo.

## Scripts

- `pnpm dev` starts all local development tasks through Turbo.
- `pnpm build` builds the workspace.
- `pnpm lint` runs lint checks.
- `pnpm test` runs the mock-only preview build as the current smoke verification.
- `pnpm typecheck` runs TypeScript checks.

The first application lives in `apps/rapid-prototyping-bo` and renders a dashboard that does not require production secrets, VPN access, live backend credentials, or real customer data.
