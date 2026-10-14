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
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              Backoffice
            </p>
            <h1 className="mt-1 text-xl font-semibold">Rapid Prototyping BO</h1>
          </div>

          <nav aria-label="Primary" className="mt-6 flex gap-2 lg:flex-col">
            <a
              aria-current="page"
              className="rounded-md bg-ink px-3 py-2 text-sm font-medium !text-white"
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
              <h2 className="mt-1 text-2xl font-semibold">Order history Test</h2>
            </div>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
              Read-only
            </span>
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

          <section aria-labelledby="editorial-heading" className="mt-8 border-y border-line py-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  From the studio
                </p>
                <h3 id="editorial-heading" className="mt-2 text-2xl font-semibold tracking-tight">
                  The week in operations
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">
                A closer look at the signals, habits, and small decisions shaping a calmer backoffice.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  category: "Field notes",
                  title: "Make every exception easier to see",
                  detail: "Three practical ways to turn noisy order queues into useful next steps.",
                  image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
                },
                {
                  category: "Dispatch",
                  title: "A more thoughtful daily handoff",
                  detail: "The rituals that keep teams aligned when the pace picks up.",
                  image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
                },
                {
                  category: "Perspective",
                  title: "Small systems, better work",
                  detail: "Why a clear source of truth creates room for better judgment.",
                  image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                }
              ].map((story) => (
                <article key={story.title} className="group overflow-hidden rounded-lg border border-line bg-white">
                  <div
                    aria-hidden="true"
                    className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${story.image})` }}
                  />
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                      {story.category}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold leading-6">{story.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">{story.detail}</p>
                    <button className="mt-4 text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent">
                      Read story
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
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
