import type { OrderHistoryPanelProps } from "./order-history-panel";

const densityOptions = [
  { label: "Comfortable", value: "comfortable" },
  { label: "Compact", value: "compact" }
] satisfies OrderHistoryPanelProps["densityOptions"];

const statusFilterOptions = [
  { label: "All", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Failed", value: "failed" }
] satisfies OrderHistoryPanelProps["statusFilterOptions"];

const rows = [
  {
    id: "ORD-1001",
    orderDescription: "ORD-1001 - Standard fulfilment",
    orderTitle: "Replacement parts request",
    statusLabel: "Processing",
    statusTone: "warning",
    submittedAt: "01 Jul 2026",
    total: "$1,240.00",
    updatedAt: "02 Jul 2026"
  },
  {
    id: "ORD-1002",
    orderDescription: "ORD-1002 - Internal supply",
    orderTitle: "Workshop equipment refresh",
    statusLabel: "Completed",
    statusTone: "success",
    submittedAt: "28 Jun 2026",
    total: "$840.00",
    updatedAt: "30 Jun 2026"
  },
  {
    id: "ORD-1003",
    orderDescription: "ORD-1003 - Exception review",
    orderTitle: "Regional stock reconciliation",
    statusLabel: "Failed",
    statusTone: "danger",
    submittedAt: "26 Jun 2026",
    total: "$2,110.00",
    updatedAt: "27 Jun 2026"
  }
] satisfies OrderHistoryPanelProps["rows"];

const noop = () => undefined;

export const orderHistoryPanelExamples = {
  compact: {
    densityOptions,
    onDensityChange: noop,
    onSearchQueryChange: noop,
    onStatusFilterChange: noop,
    rows,
    searchQuery: "",
    selectedDensity: "compact",
    selectedStatusFilter: "all",
    statusFilterOptions
  },
  default: {
    densityOptions,
    onDensityChange: noop,
    onSearchQueryChange: noop,
    onStatusFilterChange: noop,
    rows,
    searchQuery: "",
    selectedDensity: "comfortable",
    selectedStatusFilter: "all",
    statusFilterOptions
  },
  empty: {
    densityOptions,
    emptyMessage: "No orders match the current filters.",
    onDensityChange: noop,
    onSearchQueryChange: noop,
    onStatusFilterChange: noop,
    rows: [],
    searchQuery: "missing",
    selectedDensity: "comfortable",
    selectedStatusFilter: "failed",
    statusFilterOptions
  }
} satisfies Record<string, OrderHistoryPanelProps>;
