export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <a className="text-sm font-medium text-accent hover:underline" href="/dashboard">← Back to dashboard</a>
        <header className="mt-8 border-b border-line pb-6"><p className="text-sm font-medium text-muted">Workspace</p><h1 className="mt-1 text-3xl font-semibold">Settings</h1><p className="mt-2 text-sm text-muted">Manage how this backoffice workspace behaves.</p></header>
        <div className="mt-6 space-y-6">
          <section className="rounded-md border border-line bg-white p-5"><h2 className="font-semibold">Workspace preferences</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium">Workspace name<input className="mt-2 h-10 w-full rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" defaultValue="Rapid Prototyping BO" /></label><label className="text-sm font-medium">Default currency<select className="mt-2 h-10 w-full rounded-md border border-line bg-white px-3 font-normal outline-none focus:border-accent" defaultValue="EUR"><option>EUR</option><option>GBP</option><option>USD</option></select></label></div></section>
          <section className="rounded-md border border-line bg-white p-5"><h2 className="font-semibold">Notifications</h2><label className="mt-5 flex items-start gap-3 text-sm"><input className="mt-1 accent-accent" type="checkbox" defaultChecked /><span><span className="font-medium">Order status updates</span><span className="mt-1 block text-muted">Receive alerts when an order changes status.</span></span></label></section>
          <div className="flex justify-end"><button className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white" type="button">Save changes</button></div>
        </div>
      </div>
    </main>
  );
}
