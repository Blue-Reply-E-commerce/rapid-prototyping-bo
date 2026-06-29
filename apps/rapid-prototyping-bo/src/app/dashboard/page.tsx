import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@rapid-prototyping-bo/design-system";
import { getDashboardData } from "@/lib/dashboard-data";
import { DashboardQueuePanel } from "./dashboard-queue-panel";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-line bg-white px-5 py-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Backoffice
              </p>
              <h1 className="mt-1 text-xl font-semibold">Rapid Prototyping BO</h1>
            </div>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
              PoC
            </span>
          </div>

          <nav aria-label="Primary" className="mt-6 flex gap-2 lg:flex-col">
            <a
              aria-current="page"
              className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white"
              href="/dashboard"
            >
              Dashboard
            </a>
            <span className="rounded-md px-3 py-2 text-sm font-medium text-muted">
              Contracts
            </span>
            <span className="rounded-md px-3 py-2 text-sm font-medium text-muted">
              Handoffs
            </span>
          </nav>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Dashboard</p>
              <h2 className="mt-1 text-2xl font-semibold">Prototype operations</h2>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Card className="w-full md:w-[420px]">
                <CardContent className="px-4 py-3">
                  <p className="text-sm font-semibold text-accent">
                    {dashboard.preview.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {dashboard.preview.description}
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="secondary">
                  Review queue
                </Button>
                <Button size="sm">Create handoff</Button>
              </div>
            </div>
          </header>

          <section
            aria-label="Summary"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {dashboard.summaryCards.map((card) => (
              <Card key={card.id}>
                <CardContent>
                  <p className="text-sm font-medium text-muted">{card.label}</p>
                  <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                  <p className="mt-2 text-sm text-muted">{card.detail}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <DashboardQueuePanel workQueue={dashboard.workQueue} />

            <Card as="aside">
              <CardHeader>
                <CardTitle>Preview guarantees</CardTitle>
                <CardDescription>Local preview safety checks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted">
                  {dashboard.previewGuarantees.map((guarantee) => (
                    <li key={guarantee.id}>{guarantee.label}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </main>
  );
}
