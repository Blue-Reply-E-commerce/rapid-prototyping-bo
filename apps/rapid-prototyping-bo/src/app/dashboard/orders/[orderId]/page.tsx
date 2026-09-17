import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/dashboard-data";

const statusLabels = {
  submitted: "Submitted",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed"
} as const;

const statusClasses = {
  submitted: "border-line bg-white text-ink",
  processing: "border-warning/40 bg-warning/10 text-warning",
  completed: "border-accent/40 bg-accent/10 text-accent",
  cancelled: "border-line bg-canvas text-muted",
  failed: "border-danger/40 bg-danger/10 text-danger"
} as const;

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

function getOrderItems(orderId: string) {
  const itemSets: Record<string, Array<{ name: string; detail: string; quantity: number; unitMinor: number }>> = {
    "ORD-10042": [
      { name: "Device protection plan", detail: "Workspace equipment renewal", quantity: 3, unitMinor: 28000 },
      { name: "Replacement workstation", detail: "Standard configuration", quantity: 2, unitMinor: 20025 }
    ],
    "ORD-10043": [
      { name: "Editorial review", detail: "Regional launch package", quantity: 1, unitMinor: 54500 },
      { name: "Content QA pass", detail: "Final delivery review", quantity: 2, unitMinor: 15000 }
    ]
  };

  return itemSets[orderId] ?? [
    { name: "Operational service", detail: "Order fulfillment item", quantity: 1, unitMinor: 80000 },
    { name: "Delivery coordination", detail: "Standard handling", quantity: 1, unitMinor: 40000 }
  ];
}

export default async function OrderDetailsPage({
  params
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = getOrderById(orderId);

  if (!order) notFound();

  const items = getOrderItems(order.id);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitMinor, 0);
  const currency = order.totalAmount.currency;

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-line bg-white px-5 py-4 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Backoffice</p>
          <h1 className="mt-1 text-xl font-semibold">Rapid Prototyping BO</h1>
          <nav aria-label="Primary" className="mt-6 flex gap-2 lg:flex-col">
            <Link className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-canvas" href="/dashboard">Dashboard</Link>
            <Link aria-current="page" className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white" href="/dashboard">Orders</Link>
            <span className="rounded-md px-3 py-2 text-sm font-medium text-muted">Settings</span>
          </nav>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <Link className="text-sm font-medium text-accent hover:underline" href="/dashboard">← Back to order history</Link>
          <header className="mt-5 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Order details</p>
              <h2 className="mt-1 text-2xl font-semibold">{order.title}</h2>
              <p className="mt-2 text-sm text-muted">{order.id} · {order.description}</p>
            </div>
            <span className={`w-fit rounded-full border px-3 py-1 text-sm font-medium ${statusClasses[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </header>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <section className="overflow-hidden rounded-md border border-line bg-white">
              <div className="border-b border-line px-4 py-3">
                <h3 className="text-base font-semibold">Order items</h3>
                <p className="mt-1 text-sm text-muted">{items.length} line items included in this order</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
                    <tr><th className="px-4 py-3 font-semibold">Item</th><th className="px-4 py-3 font-semibold">Quantity</th><th className="px-4 py-3 text-right font-semibold">Unit price</th><th className="px-4 py-3 text-right font-semibold">Total</th></tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr className="border-t border-line" key={item.name}>
                        <td className="px-4 py-4"><div className="font-medium">{item.name}</div><div className="mt-1 text-xs text-muted">{item.detail}</div></td>
                        <td className="px-4 py-4 text-muted">{item.quantity}</td>
                        <td className="px-4 py-4 text-right text-muted">{formatCurrency(item.unitMinor, currency)}</td>
                        <td className="px-4 py-4 text-right font-medium">{formatCurrency(item.quantity * item.unitMinor, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end border-t border-line px-4 py-4"><div className="flex w-full max-w-xs justify-between text-sm font-semibold"><span>Order total</span><span>{formatCurrency(order.totalAmount.amountMinor || subtotal, currency)}</span></div></div>
            </section>

            <aside className="h-fit rounded-md border border-line bg-white">
              <div className="border-b border-line px-4 py-3"><h3 className="text-base font-semibold">Order timeline</h3></div>
              <dl className="flex flex-col gap-4 p-4 text-sm">
                <div><dt className="text-muted">Submitted</dt><dd className="mt-1 font-medium">{formatDate(order.submittedAt)}</dd></div>
                <div><dt className="text-muted">Last updated</dt><dd className="mt-1 font-medium">{formatDate(order.updatedAt)}</dd></div>
                <div><dt className="text-muted">Description</dt><dd className="mt-1 leading-6">{order.description}</dd></div>
              </dl>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = getOrderById(orderId);
  return { title: order ? `${order.id} · Order details` : "Order not found" };
}

export const dynamicParams = false;
export function generateStaticParams() {
  return ["ORD-10042", "ORD-10043", "ORD-10044", "ORD-10045", "ORD-10046", "ORD-10047"].map((orderId) => ({ orderId }));
}
