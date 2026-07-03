import type { OrderSummaryCardProps } from "./order-summary-card";

export const orderSummaryCardExamples = {
  exceptions: {
    detail: "Cancelled or failed",
    label: "Exceptions",
    value: "3"
  },
  noDetail: {
    label: "Processing",
    value: "7"
  },
  totalOrders: {
    detail: "Available in order history",
    label: "Total orders",
    value: "24"
  }
} satisfies Record<string, OrderSummaryCardProps>;
