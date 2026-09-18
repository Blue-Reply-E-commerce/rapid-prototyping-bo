import { notFound } from "next/navigation";
import { getDashboardData } from "@/lib/dashboard-data";

function currency(amountMinor: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(amountMinor / 100);
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dashboard = await getDashboardData();
  const order = dashboard.orders.find((candidate) => candidate.id === id);
  if (!order) notFound();

  const items = order.items ?? [{ id: `${order.id}-item`, name: order.title, quantity: 1, unitAmount: order.totalAmount }];
  const statusLabel = order.status.charAt(0).toUpperCase() + order.status.slice(1);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <a className="text-sm font-medium text-accent hover:underline" href="/dashboard">← Back to order history</a>
        <header className="mt-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-medium text-muted">Order details</p><h1 className="mt-1 text-3xl font-semibold">{order.title}</h1><p className="mt-2 text-sm text-muted">{order.id} · {order.description}</p></div>
          <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">{statusLabel}</span>
        </header>
        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="overflow-hidden rounded-md border border-line bg-white">
            <div className="border-b border-line px-5 py-4"><h2 className="font-semibold">Order items</h2><p className="mt-1 text-sm text-muted">Items associated with this order</p></div>
            <div className="divide-y divide-line">
              {items.map((item) => <div className="flex items-center justify-between gap-4 px-5 py-4" key={item.id}><div><p className="font-medium">{item.name}</p><p className="mt-1 text-sm text-muted">Quantity {item.quantity}</p></div><p className="font-medium">{currency(item.unitAmount.amountMinor * item.quantity, item.unitAmount.currency)}</p></div>)}
            </div>
          </div>
          <aside className="rounded-md border border-line bg-white p-5"><h2 className="font-semibold">Order summary</h2><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted">Submitted</dt><dd>{new Date(order.submittedAt).toLocaleDateString("en-GB")}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted">Last updated</dt><dd>{new Date(order.updatedAt).toLocaleDateString("en-GB")}</dd></div><div className="flex justify-between gap-4 border-t border-line pt-4 text-base font-semibold"><dt>Total</dt><dd>{currency(order.totalAmount.amountMinor, order.totalAmount.currency)}</dd></div></dl></aside>
        </section>
      </div>
    </main>
  );
}
