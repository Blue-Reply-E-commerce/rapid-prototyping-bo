import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OrderSummaryCard } from "./order-summary-card";
import { orderSummaryCardExamples } from "./order-summary-card.examples";

describe("OrderSummaryCard", () => {
  it("renders label, value, detail, and stable slots", () => {
    const { container } = render(
      <OrderSummaryCard {...orderSummaryCardExamples.totalOrders} />
    );

    expect(screen.getByText("Total orders")).toHaveAttribute(
      "data-slot",
      "order-summary-card-label"
    );
    expect(screen.getByText("24")).toHaveAttribute(
      "data-slot",
      "order-summary-card-value"
    );
    expect(screen.getByText("Available in order history")).toHaveAttribute(
      "data-slot",
      "order-summary-card-detail"
    );
    expect(container.firstElementChild).toHaveAttribute(
      "data-slot",
      "order-summary-card"
    );
  });

  it("omits the detail slot when no detail is provided", () => {
    const { container } = render(
      <OrderSummaryCard {...orderSummaryCardExamples.noDetail} />
    );

    expect(container.querySelector('[data-slot="order-summary-card-detail"]')).toBeNull();
  });
});
