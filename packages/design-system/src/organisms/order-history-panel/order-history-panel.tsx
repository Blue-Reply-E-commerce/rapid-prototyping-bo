import * as React from "react";
import { Button } from "../../atoms/button";
import { cn } from "../../utils";

export type OrderHistoryPanelDensity = "comfortable" | "compact";

export type OrderHistoryPanelStatusTone =
  | "danger"
  | "muted"
  | "neutral"
  | "success"
  | "warning";

export type OrderHistoryPanelDensityOption = {
  label: React.ReactNode;
  value: OrderHistoryPanelDensity;
};

export type OrderHistoryPanelFilterOption = {
  label: React.ReactNode;
  value: string;
};

export type OrderHistoryPanelRow = {
  id: string;
  orderDescription?: React.ReactNode;
  orderTitle: React.ReactNode;
  statusLabel: React.ReactNode;
  statusTone: OrderHistoryPanelStatusTone;
  submittedAt: React.ReactNode;
  total: React.ReactNode;
  updatedAt: React.ReactNode;
};

export type OrderHistoryPanelProps = Omit<
  React.ComponentProps<"section">,
  "onChange" | "title"
> & {
  densityLabel?: string;
  densityOptions: OrderHistoryPanelDensityOption[];
  emptyMessage?: React.ReactNode;
  onDensityChange: (value: OrderHistoryPanelDensity) => void;
  onSearchQueryChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  rows: OrderHistoryPanelRow[];
  searchInputId?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  searchQuery: string;
  selectedDensity: OrderHistoryPanelDensity;
  selectedStatusFilter: string;
  statusFilterLabel?: string;
  statusFilterOptions: OrderHistoryPanelFilterOption[];
  title?: React.ReactNode;
};

const densityPresentation: Record<
  OrderHistoryPanelDensity,
  { bodyCellClassName: string; emptyCellClassName: string }
> = {
  comfortable: {
    bodyCellClassName: "px-4 py-3",
    emptyCellClassName: "px-4 py-6"
  },
  compact: {
    bodyCellClassName: "px-4 py-2",
    emptyCellClassName: "px-4 py-4"
  }
};

const statusToneClassNames: Record<OrderHistoryPanelStatusTone, string> = {
  danger: "border-danger/40 bg-danger/10 text-danger",
  muted: "border-line bg-canvas text-muted",
  neutral: "border-line bg-white text-ink",
  success: "border-accent/40 bg-accent/10 text-accent",
  warning: "border-warning/40 bg-warning/10 text-warning"
};

export function OrderHistoryPanel({
  className,
  densityLabel = "Table density",
  densityOptions,
  emptyMessage = "No orders match the current filters.",
  onDensityChange,
  onSearchQueryChange,
  onStatusFilterChange,
  rows,
  searchInputId = "order-history-search",
  searchLabel = "Search orders",
  searchPlaceholder = "Search orders",
  searchQuery,
  selectedDensity,
  selectedStatusFilter,
  statusFilterLabel = "Order status filter",
  statusFilterOptions,
  title = "Order history",
  ...props
}: OrderHistoryPanelProps) {
  const presentation = densityPresentation[selectedDensity];

  return (
    <section
      className={cn("overflow-hidden rounded-md border border-line bg-white text-ink", className)}
      data-slot="order-history-panel"
      {...props}
    >
      <header className="border-b border-line px-4 py-3" data-slot="order-history-panel-header">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="text-base font-semibold leading-6" data-slot="order-history-panel-title">
            {title}
          </h3>
          <div
            aria-label={densityLabel}
            className="inline-flex w-fit rounded-md border border-line bg-white p-1"
            data-slot="order-history-panel-density"
          >
            {densityOptions.map((density) => (
              <Button
                aria-pressed={selectedDensity === density.value}
                className="min-w-24"
                key={density.value}
                onClick={() => onDensityChange(density.value)}
                size="sm"
                variant={selectedDensity === density.value ? "primary" : "ghost"}
              >
                {density.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="sr-only" htmlFor={searchInputId}>
            {searchLabel}
          </label>
          <input
            className="h-9 w-full rounded-md border border-line bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent lg:max-w-xs"
            data-slot="order-history-panel-search"
            id={searchInputId}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={searchQuery}
          />
          <div
            aria-label={statusFilterLabel}
            className="flex flex-wrap gap-2"
            data-slot="order-history-panel-status-filters"
          >
            {statusFilterOptions.map((status) => (
              <Button
                aria-pressed={selectedStatusFilter === status.value}
                key={status.value}
                onClick={() => onStatusFilterChange(status.value)}
                size="sm"
                variant={selectedStatusFilter === status.value ? "primary" : "secondary"}
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>
      </header>
      <div className="overflow-x-auto" data-slot="order-history-panel-table-wrapper">
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
            {rows.length === 0 ? (
              <tr className="border-t border-line">
                <td
                  className={cn(presentation.emptyCellClassName, "text-center text-muted")}
                  colSpan={5}
                  data-slot="order-history-panel-empty"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr className="border-t border-line" data-slot="order-history-panel-row" key={row.id}>
                  <td className={cn(presentation.bodyCellClassName, "font-medium")}>
                    <div>{row.orderTitle}</div>
                    {row.orderDescription ? (
                      <div className="mt-1 text-xs font-normal text-muted">
                        {row.orderDescription}
                      </div>
                    ) : null}
                  </td>
                  <td className={presentation.bodyCellClassName}>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-1 text-xs font-medium",
                        statusToneClassNames[row.statusTone]
                      )}
                    >
                      {row.statusLabel}
                    </span>
                  </td>
                  <td className={cn(presentation.bodyCellClassName, "text-muted")}>
                    {row.total}
                  </td>
                  <td className={cn(presentation.bodyCellClassName, "text-muted")}>
                    {row.submittedAt}
                  </td>
                  <td className={cn(presentation.bodyCellClassName, "text-muted")}>
                    {row.updatedAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
