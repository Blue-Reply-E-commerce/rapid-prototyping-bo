import Link from "next/link";
import type { DashboardOrder } from "@rapid-prototyping-bo/api-client";

type OrderDetailViewProps = {
  order: DashboardOrder;
};

const statusCopy: Record<DashboardOrder["status"], string> = {
  submitted: "Submitted",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed"
};

const statusStyles: Record<DashboardOrder["status"], string> = {
  submitted: "border-line bg-white text-ink",
  processing: "border-warning/40 bg-warning/10 text-warning",
  completed: "border-accent/40 bg-accent/10 text-accent",
  cancelled: "border-line bg-canvas text-muted",
  failed: "border-danger/40 bg-danger/10 text-danger"
};

function formatCurrency(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    currency,
    style: "currency"
  }).format(amountMinor / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function OrderDetailView({ order }: OrderDetailViewProps) {
  const total = formatCurrency(order.totalAmount.amountMinor, order.totalAmount.currency);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:px-10">
        <Link className="text-sm font-medium text-sky-700 hover:underline" href="/dashboard">
          ← Back to order history
        </Link>

        <header className="mt-8 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Order detail</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{order.title}</h1>
            <p className="mt-2 text-sm text-muted">{order.id} · Submitted {formatDate(order.submittedAt)}</p>
          </div>
          <span className={`w-fit rounded-full border px-3 py-1 text-sm font-medium ${statusStyles[order.status]}`}>
            {statusCopy[order.status]}
          </span>
        </header>

        <section aria-label="Order progress" className="mt-6 rounded-md border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Order progress</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["Submitted", "Request received", true],
              ["Processing", "Being reviewed", order.status === "processing" || order.status === "completed"],
              ["Complete", "Ready to close", order.status === "completed"]
            ].map(([label, detail, active]) => (
              <div className="flex gap-3" key={label as string}>
                <span className={`mt-1 size-3 rounded-full ${active ? "bg-accent" : "bg-line"}`} />
                <div>
                  <p className="text-sm font-semibold">{label as string}</p>
                  <p className="mt-1 text-xs text-muted">{detail as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-md border border-line bg-white">
            <div className="border-b border-line px-5 py-4">
              <h2 className="font-semibold">Order summary</h2>
              <p className="mt-1 text-sm text-muted">Details from the mocked order payload.</p>
            </div>
            <dl className="grid gap-5 p-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Description</dt>
                <dd className="mt-1 text-sm">{order.description}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Last updated</dt>
                <dd className="mt-1 text-sm">{formatDate(order.updatedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Reference</dt>
                <dd className="mt-1 text-sm">{order.id}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Total</dt>
                <dd className="mt-1 text-lg font-semibold">{total}</dd>
              </div>
            </dl>
          </section>

          <aside className="rounded-md border border-line bg-white">
            <div className="border-b border-line px-5 py-4">
              <h2 className="font-semibold">Order total</h2>
            </div>
            <div className="flex items-center justify-between px-5 py-6">
              <span className="text-sm text-muted">Grand total</span>
              <span className="text-2xl font-semibold">{total}</span>
            </div>
            <p className="border-t border-line px-5 py-4 text-xs leading-5 text-muted">
              This is a read-only preview. Payment and fulfilment actions are not connected.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export function OrderNotFoundView() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-2xl rounded-md border border-line bg-white p-6">
        <p className="text-sm font-medium text-muted">Order detail</p>
        <h1 className="mt-2 text-2xl font-semibold">Order not found</h1>
        <p className="mt-2 text-sm text-muted">The requested order is not part of this mocked history.</p>
        <Link className="mt-6 inline-block text-sm font-medium text-sky-700 hover:underline" href="/dashboard">
          Back to order history
        </Link>
      </div>
    </main>
  );
}

export function getOrderStatusLabel(status: DashboardOrder["status"]) {
  return statusCopy[status];
}

export function getOrderStatusClassName(status: DashboardOrder["status"]) {
  return statusStyles[status];
}

export { formatCurrency, formatDate };

export default OrderDetailView;
