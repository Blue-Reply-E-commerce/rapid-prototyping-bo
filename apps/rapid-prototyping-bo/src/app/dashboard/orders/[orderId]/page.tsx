import { notFound } from "next/navigation";
import type { DashboardOrder } from "@rapid-prototyping-bo/api-client";
import { getDashboardData } from "@/lib/dashboard-data";

const statusLabels: Record<DashboardOrder["status"], string> = {
  submitted: "Submitted",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed"
};

const statusClasses: Record<DashboardOrder["status"], string> = {
  submitted: "border-line bg-white text-ink",
  processing: "border-warning/40 bg-warning/10 text-warning",
  completed: "border-accent/40 bg-accent/10 text-accent",
  cancelled: "border-line bg-canvas text-muted",
  failed: "border-danger/40 bg-danger/10 text-danger"
};

function formatCurrency(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", { currency, style: "currency" }).format(
    amountMinor / 100
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function getOrderItems(order: DashboardOrder) {
  return [
    { name: order.title, description: order.description, quantity: 1, amount: order.totalAmount.amountMinor }
  ];
}

export default async function OrderDetailsPage({
  params
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const dashboard = await getDashboardData();
  const order = dashboard.orders.find((item) => item.id === orderId);

  if (!order) notFound();

  const items = getOrderItems(order);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-line bg-white px-5 py-4 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Backoffice</p>
          <h1 className="mt-1 text-xl font-semibold">Rapid Prototyping BO</h1>
          <nav aria-label="Primary" className="mt-6 flex gap-2 lg:flex-col">
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-canvas" href="/dashboard">Dashboard</a>
            <a className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white" href="/dashboard">Orders</a>
          </nav>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <a className="text-sm font-medium text-accent hover:underline" href="/dashboard">← Back to order history</a>
          <header className="mt-5 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Order details</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight">{order.id}</h2>
              <p className="mt-2 text-muted">{order.title}</p>
            </div>
            <span className={`w-fit rounded-full border px-3 py-1 text-sm font-medium ${statusClasses[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </header>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <section className="overflow-hidden rounded-md border border-line bg-white">
              <div className="border-b border-line px-4 py-3">
                <h3 className="font-semibold">Order items</h3>
                <p className="mt-1 text-sm text-muted">Items included in this order</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
                    <tr><th className="px-4 py-3">Item</th><th className="px-4 py-3">Quantity</th><th className="px-4 py-3 text-right">Amount</th></tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr className="border-t border-line" key={item.name}>
                        <td className="px-4 py-4"><p className="font-medium">{item.name}</p><p className="mt-1 text-xs text-muted">{item.description}</p></td>
                        <td className="px-4 py-4 text-muted">{item.quantity}</td>
                        <td className="px-4 py-4 text-right font-medium">{formatCurrency(item.amount, order.totalAmount.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="rounded-md border border-line bg-white">
              <div className="border-b border-line px-4 py-3"><h3 className="font-semibold">Order summary</h3></div>
              <dl className="flex flex-col gap-4 p-4 text-sm">
                <div><dt className="text-muted">Submitted</dt><dd className="mt-1 font-medium">{formatDate(order.submittedAt)}</dd></div>
                <div><dt className="text-muted">Last updated</dt><dd className="mt-1 font-medium">{formatDate(order.updatedAt)}</dd></div>
                <div className="border-t border-line pt-4"><dt className="text-muted">Total</dt><dd className="mt-1 text-xl font-semibold">{formatCurrency(order.totalAmount.amountMinor, order.totalAmount.currency)}</dd></div>
              </dl>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
