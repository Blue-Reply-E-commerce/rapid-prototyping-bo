"use client";

import { useState } from "react";

const currencyOptions = ["EUR", "GBP", "USD"] as const;

export default function SettingsPage() {
  const [currency, setCurrency] = useState(() => {
    if (typeof document === "undefined") return "EUR";
    return document.cookie.match(/(?:^|; )dashboard_currency=([^;]+)/)?.[1] ?? "EUR";
  });
  const [saved, setSaved] = useState(false);

  function applySettings() {
    document.cookie = `dashboard_currency=${currency}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new CustomEvent("dashboard-currency-change", { detail: currency }));
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <a className="text-sm font-medium text-accent hover:underline" href="/dashboard">← Back to dashboard</a>
        <header className="mt-8 border-b border-line pb-6"><p className="text-sm font-medium text-muted">Workspace</p><h1 className="mt-1 text-3xl font-semibold">Settings</h1><p className="mt-2 text-sm text-muted">Manage how this backoffice workspace behaves.</p></header>
        <div className="mt-6 space-y-6">
          <section className="rounded-md border border-line bg-white p-5"><h2 className="font-semibold">Workspace preferences</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium">Workspace name<input className="mt-2 h-10 w-full rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" defaultValue="Rapid Prototyping BO" /></label><label className="text-sm font-medium">Default currency<select aria-label="Default currency" className="mt-2 h-10 w-full rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" value={currency} onChange={(event) => { setCurrency(event.target.value); setSaved(false); }}>{currencyOptions.map((option) => <option key={option}>{option}</option>)}</select></label></div></section>
          <section className="rounded-md border border-line bg-white p-5"><h2 className="font-semibold">Notifications</h2><label className="mt-5 flex items-start gap-3 text-sm"><input className="mt-1 accent-accent" type="checkbox" defaultChecked /><span><span className="font-medium">Order status updates</span><span className="mt-1 block text-muted">Receive alerts when an order changes status.</span></span></label></section>
          <div className="flex items-center justify-end gap-3"><span aria-live="polite" className="text-sm text-muted">{saved ? `Currency applied: ${currency}` : ""}</span><button className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white" onClick={applySettings} type="button">Apply changes</button></div>
        </div>
      </div>
    </main>
  );
}
