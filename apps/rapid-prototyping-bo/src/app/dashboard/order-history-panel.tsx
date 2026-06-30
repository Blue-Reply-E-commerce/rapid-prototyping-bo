"use client";

import type {
  DashboardSuccessResponse,
  OrderStatus
} from "@rapid-prototyping-bo/api-client";
import {
  Button,
  Card,
  CardHeader,
  CardTitle
} from "@rapid-prototyping-bo/design-system";
import {
  dashboardDensityOptions,
  dashboardStatusFilterOptions,
  useDashboardUiStore,
  type DashboardDensity,
  type DashboardStatusFilter
} from "@/stores/dashboard-ui-store";

type DashboardOrders = DashboardSuccessResponse["orders"];
type DashboardOrderFilters = DashboardSuccessResponse["orderFilters"];

type DensityPresentation = {
  label: string;
  bodyCellClassName: string;
  emptyCellClassName: string;
};

const densityPresentation: Record<DashboardDensity, DensityPresentation> = {
  comfortable: {
    label: "Comfortable",
    bodyCellClassName: "px-4 py-3",
    emptyCellClassName: "px-4 py-6"
  },
  compact: {
    label: "Compact",
    bodyCellClassName: "px-4 py-2",
    emptyCellClassName: "px-4 py-4"
  }
};

const statusLabels: Record<DashboardStatusFilter, string> = {
  all: "All",
  submitted: "Submitted",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed"
};

const statusToneClassNames: Record<OrderStatus, string> = {
  submitted: "border-line bg-white text-ink",
  processing: "border-warning/40 bg-warning/10 text-warning",
  completed: "border-accent/40 bg-accent/10 text-accent",
  cancelled: "border-line bg-canvas text-muted",
  failed: "border-danger/40 bg-danger/10 text-danger"
};

type OrderHistoryPanelProps = {
  orderFilters: DashboardOrderFilters;
  orders: DashboardOrders;
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
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function OrderHistoryPanel({ orderFilters, orders }: OrderHistoryPanelProps) {
  const displayDensity = useDashboardUiStore((state) => state.displayDensity);
  const searchQuery = useDashboardUiStore((state) => state.searchQuery);
  const statusFilter = useDashboardUiStore((state) => state.statusFilter);
  const setDisplayDensity = useDashboardUiStore((state) => state.setDisplayDensity);
  const setSearchQuery = useDashboardUiStore((state) => state.setSearchQuery);
  const setStatusFilter = useDashboardUiStore((state) => state.setStatusFilter);
  const presentation = densityPresentation[displayDensity];
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const availableStatusFilters = dashboardStatusFilterOptions.filter(
    (status) => status === "all" || orderFilters.statusOptions.includes(status)
  );
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" ? true : order.status === statusFilter;
    const matchesSearch =
      normalizedSearchQuery.length === 0
        ? true
        : `${order.id} ${order.title} ${order.description}`
            .toLowerCase()
            .includes(normalizedSearchQuery);

    return matchesStatus && matchesSearch;
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle>Order history</CardTitle>
          <div
            aria-label="Table density"
            className="inline-flex w-fit rounded-md border border-line bg-white p-1"
          >
            {dashboardDensityOptions.map((density) => (
              <Button
                aria-pressed={displayDensity === density}
                className="min-w-24"
                key={density}
                onClick={() => setDisplayDensity(density)}
                size="sm"
                variant={displayDensity === density ? "primary" : "ghost"}
              >
                {densityPresentation[density].label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="sr-only" htmlFor="order-search">
            Search orders
          </label>
          <input
            className="h-9 w-full rounded-md border border-line bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent lg:max-w-xs"
            id="order-search"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search orders"
            type="search"
            value={searchQuery}
          />
          <div
            aria-label="Order status filter"
            className="flex flex-wrap gap-2"
          >
            {availableStatusFilters.map((status) => (
              <Button
                aria-pressed={statusFilter === status}
                key={status}
                onClick={() => setStatusFilter(status)}
                size="sm"
                variant={statusFilter === status ? "primary" : "secondary"}
              >
                {statusLabels[status]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Submitted</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr className="border-t border-line">
                <td
                  className={`${presentation.emptyCellClassName} text-center text-muted`}
                  colSpan={5}
                >
                  No orders match the current filters.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-line">
                  <td className={`${presentation.bodyCellClassName} font-medium`}>
                    <div>{order.title}</div>
                    <div className="mt-1 text-xs font-normal text-muted">
                      {order.id} - {order.description}
                    </div>
                  </td>
                  <td className={presentation.bodyCellClassName}>
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-medium ${statusToneClassNames[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className={`${presentation.bodyCellClassName} text-muted`}>
                    {formatCurrency(
                      order.totalAmount.amountMinor,
                      order.totalAmount.currency
                    )}
                  </td>
                  <td className={`${presentation.bodyCellClassName} text-muted`}>
                    {formatDate(order.submittedAt)}
                  </td>
                  <td className={`${presentation.bodyCellClassName} text-muted`}>
                    {formatDate(order.updatedAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
