export default function SettingsPage() {
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
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-canvas hover:text-ink"
              href="/dashboard"
            >
              Dashboard
            </a>
            <span className="rounded-md px-3 py-2 text-sm font-medium text-muted">
              Orders
            </span>
            <a
              aria-current="page"
              className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white"
              href="/settings"
            >
              Settings
            </a>
          </nav>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <header className="border-b border-line pb-5">
            <p className="text-sm font-medium text-muted">Workspace</p>
            <h2 className="mt-1 text-2xl font-semibold">Settings</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Manage your workspace details and the preferences that shape your backoffice experience.
            </p>
          </header>

          <div className="mt-6 grid max-w-4xl gap-6">
            <section className="rounded-md border border-line bg-white">
              <div className="border-b border-line px-5 py-4">
                <h3 className="text-base font-semibold">Workspace profile</h3>
                <p className="mt-1 text-sm text-muted">The details your team sees across the backoffice.</p>
              </div>
              <form className="grid gap-5 px-5 py-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Workspace name
                  <input
                    className="rounded-md border border-line bg-canvas px-3 py-2.5 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    defaultValue="Rapid Prototyping BO"
                    type="text"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Workspace URL
                  <input
                    className="rounded-md border border-line bg-canvas px-3 py-2.5 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    defaultValue="rapid-prototyping"
                    type="text"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium sm:col-span-2">
                  Description
                  <textarea
                    className="min-h-24 resize-y rounded-md border border-line bg-canvas px-3 py-2.5 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    defaultValue="A read-only operations workspace for order history."
                  />
                </label>
                <div className="sm:col-span-2">
                  <button className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/90" type="submit">
                    Save changes
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-md border border-line bg-white">
              <div className="border-b border-line px-5 py-4">
                <h3 className="text-base font-semibold">Notifications</h3>
                <p className="mt-1 text-sm text-muted">Choose which operational updates you want to receive.</p>
              </div>
              <div className="divide-y divide-line">
                <label className="flex items-start justify-between gap-5 px-5 py-4">
                  <span>
                    <span className="block text-sm font-medium">Order exceptions</span>
                    <span className="mt-1 block text-sm text-muted">Get notified when an order needs attention.</span>
                  </span>
                  <input aria-label="Order exceptions notifications" className="mt-1 size-4 accent-[var(--color-accent)]" defaultChecked type="checkbox" />
                </label>
                <label className="flex items-start justify-between gap-5 px-5 py-4">
                  <span>
                    <span className="block text-sm font-medium">Weekly summary</span>
                    <span className="mt-1 block text-sm text-muted">Receive a weekly snapshot of workspace activity.</span>
                  </span>
                  <input aria-label="Weekly summary notifications" className="mt-1 size-4 accent-[var(--color-accent)]" defaultChecked type="checkbox" />
                </label>
              </div>
            </section>

            <section className="rounded-md border border-line bg-white">
              <div className="border-b border-line px-5 py-4">
                <h3 className="text-base font-semibold">Access and security</h3>
                <p className="mt-1 text-sm text-muted">Review how this workspace is accessed.</p>
              </div>
              <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">Read-only preview mode</p>
                  <p className="mt-1 text-sm text-muted">Changes to orders are disabled in this prototype.</p>
                </div>
                <span className="w-fit rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">Enabled</span>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
