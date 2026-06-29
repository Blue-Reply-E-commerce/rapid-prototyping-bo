# Rapid Prototyping BO App

This is the first Next.js App Router application in the Rapid Prototyping BO workspace.

The dashboard route at `/dashboard` is intentionally mock-only. It renders deterministic local content and does not depend on production secrets, VPN access, live backend credentials, or real customer data.

For this bootstrap slice, `pnpm test` uses `next build` as the smoke verification that the mock-only dashboard can compile for preview without live backend access.
