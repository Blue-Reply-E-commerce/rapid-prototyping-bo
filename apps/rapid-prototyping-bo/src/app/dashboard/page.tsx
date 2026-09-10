import {
  OrderSummaryCard
} from "@rapid-prototyping-bo/design-system";
import { getDashboardData } from "@/lib/dashboard-data";
import { OrderHistoryPanel } from "./order-history-panel";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const summaryCards = [
    {
      id: "total-orders",
      label: "Total orders",
      value: dashboard.orderSummary.totalOrders.toString(),
      detail: "Available in order history"
    },
    {
      id: "processing-orders",
      label: "Processing",
      value: dashboard.orderSummary.processingOrders.toString(),
      detail: "Currently in progress"
    },
    {
      id: "exception-orders",
      label: "Exceptions",
      value: dashboard.orderSummary.exceptionOrders.toString(),
      detail: "Cancelled or failed"
    }
  ];

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
              Orders
            </span>
            <span className="rounded-md px-3 py-2 text-sm font-medium text-muted">
              Settings
            </span>
          </nav>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Dashboard</p>
              <h2 className="mt-1 text-2xl font-semibold">Order history</h2>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <div className="w-full rounded-md border border-line bg-white px-4 py-3 text-ink md:w-[420px]">
                <p className="text-sm font-semibold text-accent">
                  {dashboard.preview.label}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {dashboard.preview.description}
                </p>
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                Read-only
              </span>
            </div>
          </header>

          <section
            aria-label="Summary"
            className="mt-6 grid gap-4 sm:grid-cols-3"
          >
            {summaryCards.map((card) => (
              <OrderSummaryCard
                detail={card.detail}
                key={card.id}
                label={card.label}
                value={card.value}
              />
            ))}
          </section>

          <section
            aria-labelledby="editorial-heading"
            className="mt-6 overflow-hidden rounded-md border border-line bg-[#f3e6da]"
          >
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="border-b border-line px-5 py-6 lg:border-b-0 lg:border-r lg:px-7 lg:py-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  The operations brief
                </p>
                <h3
                  id="editorial-heading"
                  className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
                >
                  A calmer way to read the movement behind every order.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                  A weekly edit of the signals, patterns, and small decisions
                  shaping the backoffice experience.
                </p>
                <a
                  className="mt-6 inline-flex items-center text-sm font-semibold text-ink underline decoration-accent underline-offset-4"
                  href="#order-history"
                >
                  Read the latest note
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </a>
              </article>

              <div className="grid divide-y divide-line">
                <article className="px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Field note · 04 min read
                  </p>
                  <h4 className="mt-2 text-lg font-semibold leading-6">
                    When an exception is actually useful information
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Turn friction in the queue into a clearer next action.
                  </p>
                </article>
                <article className="px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Dispatch · 02 min read
                  </p>
                  <h4 className="mt-2 text-lg font-semibold leading-6">
                    The quiet signals worth checking before lunch
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Three gentle prompts for a more intentional daily review.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section id="order-history" className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <OrderHistoryPanel
              orderFilters={dashboard.orderFilters}
              orders={dashboard.orders}
            />

            <aside className="rounded-md border border-line bg-white text-ink">
              <div className="border-b border-line px-4 py-3">
                <h3 className="text-base font-semibold leading-6">
                  Preview guarantees
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Local preview safety checks
                </p>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm text-muted">
                  {dashboard.previewGuarantees.map((guarantee) => (
                    <li key={guarantee.id}>{guarantee.label}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}
