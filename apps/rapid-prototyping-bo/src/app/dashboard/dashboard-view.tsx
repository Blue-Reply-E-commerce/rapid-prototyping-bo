"use client";

import { useState } from "react";
import {
  OrderSummaryCard,
  Button
} from "@rapid-prototyping-bo/design-system";
import type { DashboardSuccessResponse, DashboardOrder } from "@rapid-prototyping-bo/api-client";
import { OrderHistoryPanel } from "./order-history-panel";

type DashboardViewProps = {
  dashboard: DashboardSuccessResponse;
};

export function DashboardView({ dashboard }: DashboardViewProps) {
  const [orders, setOrders] = useState<DashboardOrder[]>(dashboard.orders);
  const [isCreating, setIsCreating] = useState(false);
  const [notice, setNotice] = useState("");
  const summaryCards = [
    {
      id: "total-orders",
      label: "Total orders",
      value: orders.length.toString(),
      detail: "Available in order history"
    },
    {
      id: "processing-orders",
      label: "Processing",
      value: orders.filter((order) => order.status === "processing").length.toString(),
      detail: "Currently in progress"
    },
    {
      id: "exception-orders",
      label: "Exceptions",
      value: orders.filter((order) => order.status === "cancelled" || order.status === "failed").length.toString(),
      detail: "Cancelled or failed"
    }
  ];

  function createOrder(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const total = Number(formData.get("total"));
    const currency = String(formData.get("currency") ?? "EUR");
    if (!title || !description || !Number.isFinite(total) || total <= 0) return;

    const timestamp = new Date().toISOString();
    const nextId = Math.max(
      10047,
      ...orders.map((order) => Number(order.id.replace("ORD-", "")) || 0)
    ) + 1;
    setOrders((current) => [
      {
        id: `ORD-${nextId}`,
        title,
        description,
        status: "submitted",
        totalAmount: { amountMinor: Math.round(total * 100), currency },
        submittedAt: timestamp,
        updatedAt: timestamp
      },
      ...current
    ]);
    setIsCreating(false);
    setNotice(`Order ORD-${nextId} created successfully.`);
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-line bg-white px-5 py-4 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Backoffice</p>
            <h1 className="mt-1 text-xl font-semibold">Rapid Prototyping BO</h1>
          </div>
          <nav aria-label="Primary" className="mt-6 flex gap-2 lg:flex-col">
            <a aria-current="page" className="rounded-md bg-ink px-3 py-2 text-sm font-medium !text-white" href="/dashboard">Dashboard</a>
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted" href="#order-history">Orders</a>
            <span className="rounded-md px-3 py-2 text-sm font-medium text-muted">Settings</span>
          </nav>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Dashboard</p>
              <h2 className="mt-1 text-2xl font-semibold">Order history</h2>
            </div>
            <Button onClick={() => { setIsCreating((open) => !open); setNotice(""); }}>
              {isCreating ? "Close form" : "Create order"}
            </Button>
          </header>

          <section aria-label="Summary" className="mt-6 grid gap-4 sm:grid-cols-3">
            {summaryCards.map((card) => (
              <OrderSummaryCard detail={card.detail} key={card.id} label={card.label} value={card.value} />
            ))}
          </section>

          {isCreating && (
            <section aria-labelledby="create-order-heading" className="mt-6 rounded-md border border-line bg-white p-5">
              <div className="mb-5">
                <h3 className="text-lg font-semibold" id="create-order-heading">Create a new order</h3>
                <p className="mt-1 text-sm text-muted">Add the order details to the history.</p>
              </div>
              <form action={createOrder} className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="order-title">
                  Order title
                  <input className="h-10 rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" id="order-title" maxLength={120} name="title" placeholder="e.g. Workspace equipment renewal" required />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="order-description">
                  Description
                  <input className="h-10 rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" id="order-description" maxLength={240} name="description" placeholder="What is this order for?" required />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="order-total">
                  Total
                  <input className="h-10 rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" id="order-total" min="0.01" name="total" placeholder="0.00" required step="0.01" type="number" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="order-currency">
                  Currency
                  <select className="h-10 rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" defaultValue="EUR" id="order-currency" name="currency">
                    <option value="EUR">EUR — Euro</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="GBP">GBP — British Pound</option>
                  </select>
                </label>
                <div className="flex items-center gap-3 md:col-span-2">
                  <Button type="submit">Create order</Button>
                  <Button onClick={() => setIsCreating(false)} variant="secondary">Cancel</Button>
                </div>
              </form>
            </section>
          )}
          {notice && <p aria-live="polite" className="mt-4 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-ink">{notice}</p>}
          <p className="mt-4 text-xs text-muted">Preview only: newly created orders are held in this page session and are not saved to a backend.</p>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <OrderHistoryPanel orderFilters={dashboard.orderFilters} orders={orders} />
            <aside className="rounded-md border border-line bg-white text-ink">
              <div className="border-b border-line px-4 py-3">
                <h3 className="text-base font-semibold leading-6">Preview guarantees</h3>
                <p className="mt-1 text-sm text-muted">Local preview safety checks</p>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm text-muted">
                  {dashboard.previewGuarantees.map((guarantee) => <li key={guarantee.id}>{guarantee.label}</li>)}
                </ul>
              </div>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}
