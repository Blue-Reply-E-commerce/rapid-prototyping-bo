"use client";

import type {
  DashboardSuccessResponse,
  OrderStatus
} from "@rapid-prototyping-bo/api-client";
import {
  OrderHistoryPanel as OrderHistoryPanelView,
  type OrderHistoryPanelRow,
  type OrderHistoryPanelStatusTone
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

const densityLabels: Record<DashboardDensity, string> = {
  comfortable: "Comfortable",
  compact: "Compact"
};

const statusLabels: Record<DashboardStatusFilter, string> = {
  all: "All",
  submitted: "Submitted",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed"
};

const statusTones: Record<OrderStatus, OrderHistoryPanelStatusTone> = {
  submitted: "neutral",
  processing: "warning",
  completed: "success",
  cancelled: "muted",
  failed: "danger"
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
  const rows: OrderHistoryPanelRow[] = filteredOrders.map((order) => ({
    id: order.id,
    orderDescription: `${order.id} - ${order.description}`,
    orderTitle: order.title,
    statusLabel: statusLabels[order.status],
    statusTone: statusTones[order.status],
    submittedAt: formatDate(order.submittedAt),
    total: formatCurrency(order.totalAmount.amountMinor, order.totalAmount.currency),
    updatedAt: formatDate(order.updatedAt)
  }));

  return (
    <OrderHistoryPanelView
      densityOptions={dashboardDensityOptions.map((density) => ({
        label: densityLabels[density],
        value: density
      }))}
      onDensityChange={setDisplayDensity}
      onSearchQueryChange={setSearchQuery}
      onStatusFilterChange={(value) => setStatusFilter(value as DashboardStatusFilter)}
      rows={rows}
      searchInputId="order-search"
      searchQuery={searchQuery}
      selectedDensity={displayDensity}
      selectedStatusFilter={statusFilter}
      statusFilterOptions={availableStatusFilters.map((status) => ({
        label: statusLabels[status],
        value: status
      }))}
    />
  );
}
