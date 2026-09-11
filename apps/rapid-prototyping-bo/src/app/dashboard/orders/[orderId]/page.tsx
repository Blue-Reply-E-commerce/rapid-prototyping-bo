import Link from "next/link";
import { getDashboardData } from "@/lib/dashboard-data";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
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
    year: "numeric"
  }).format(new Date(value));
}

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed"
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  const dashboard = await getDashboardData();
  const order = dashboard.orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <main className="min-h-screen bg-canvas px-5 py-8 text-ink sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-md border border-line bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Order not found
          </p>
          <h1 className="mt-3 text-3xl font-semibold">We could not find that order.</h1>
          <p className="mt-3 text-muted">Check the order reference and try again.</p>
          <Link className="mt-6 inline-flex font-semibold underline decoration-accent underline-offset-4" href="/dashboard">
            Back to order history
          </Link>
        </div>
      </main>
    );
  }

  const total = formatCurrency(order.totalAmount.amountMinor, order.totalAmount.currency);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:px-10">
        <Link className="text-sm font-semibold text-muted underline decoration-accent underline-offset-4 hover:text-ink" href="/dashboard">
          ← Back to order history
        </Link>

        <header className="mt-8 flex flex-col gap-5 border-b border-line pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Order detail</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{order.title}</h1>
            <p className="mt-2 text-sm text-muted">{order.id} · {order.description}</p>
          </div>
          <span className="w-fit rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
            {statusLabels[order.status] ?? order.status}
          </span>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="rounded-md border border-line bg-white">
            <div className="border-b border-line px-5 py-4">
              <h2 className="text-lg font-semibold">Order items</h2>
              <p className="mt-1 text-sm text-muted">Items included in this order.</p>
            </div>
            <div className="divide-y divide-line">
              <div className="flex items-center justify-between gap-4 px-5 py-5">
                <div>
                  <p className="font-semibold">{order.title}</p>
                  <p className="mt-1 text-sm text-muted">{order.description}</p>
                </div>
                <p className="font-semibold">{total}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-line bg-canvas px-5 py-4">
              <span className="font-semibold">Order total</span>
              <span className="text-lg font-semibold">{total}</span>
            </div>
          </div>

          <aside className="rounded-md border border-line bg-white">
            <div className="border-b border-line px-5 py-4">
              <h2 className="text-lg font-semibold">Order information</h2>
            </div>
            <dl className="grid gap-4 px-5 py-5 text-sm">
              <div><dt className="text-muted">Submitted</dt><dd className="mt-1 font-medium">{formatDate(order.submittedAt)}</dd></div>
              <div><dt className="text-muted">Last updated</dt><dd className="mt-1 font-medium">{formatDate(order.updatedAt)}</dd></div>
              <div><dt className="text-muted">Reference</dt><dd className="mt-1 font-medium">{order.id}</dd></div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
