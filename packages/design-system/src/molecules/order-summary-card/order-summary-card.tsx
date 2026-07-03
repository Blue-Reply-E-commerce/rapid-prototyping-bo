import * as React from "react";
import { cn } from "../../utils";

export type OrderSummaryCardProps = Omit<
  React.ComponentProps<"article">,
  "title"
> & {
  detail?: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
};

export function OrderSummaryCard({
  className,
  detail,
  label,
  value,
  ...props
}: OrderSummaryCardProps) {
  return (
    <article
      className={cn("rounded-md border border-line bg-white p-4 text-ink", className)}
      data-slot="order-summary-card"
      {...props}
    >
      <p className="text-sm font-medium text-muted" data-slot="order-summary-card-label">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold" data-slot="order-summary-card-value">
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-sm text-muted" data-slot="order-summary-card-detail">
          {detail}
        </p>
      ) : null}
    </article>
  );
}
