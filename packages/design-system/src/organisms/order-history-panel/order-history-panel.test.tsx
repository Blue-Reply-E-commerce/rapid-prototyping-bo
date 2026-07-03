import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OrderHistoryPanel } from "./order-history-panel";
import { orderHistoryPanelExamples } from "./order-history-panel.examples";

describe("OrderHistoryPanel", () => {
  it("renders title, controls, rows, and stable slots", () => {
    const { container } = render(
      <OrderHistoryPanel {...orderHistoryPanelExamples.default} />
    );

    expect(screen.getByRole("heading", { name: "Order history" })).toHaveAttribute(
      "data-slot",
      "order-history-panel-title"
    );
    expect(screen.getByRole("searchbox", { name: "Search orders" })).toHaveAttribute(
      "data-slot",
      "order-history-panel-search"
    );
    expect(screen.getByText("Replacement parts request")).toBeInTheDocument();
    expect(screen.getAllByText("Processing")).toHaveLength(2);
    expect(container.querySelectorAll('[data-slot="order-history-panel-row"]')).toHaveLength(3);
  });

  it("wires density, status, and search callbacks", () => {
    const onDensityChange = vi.fn();
    const onSearchQueryChange = vi.fn();
    const onStatusFilterChange = vi.fn();

    render(
      <OrderHistoryPanel
        {...orderHistoryPanelExamples.default}
        onDensityChange={onDensityChange}
        onSearchQueryChange={onSearchQueryChange}
        onStatusFilterChange={onStatusFilterChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Compact" }));
    fireEvent.click(screen.getByRole("button", { name: "Failed" }));
    fireEvent.change(screen.getByRole("searchbox", { name: "Search orders" }), {
      target: { value: "replacement" }
    });

    expect(onDensityChange).toHaveBeenCalledWith("compact");
    expect(onStatusFilterChange).toHaveBeenCalledWith("failed");
    expect(onSearchQueryChange).toHaveBeenCalledWith("replacement");
  });

  it("renders the empty state", () => {
    render(<OrderHistoryPanel {...orderHistoryPanelExamples.empty} />);

    expect(screen.getByText("No orders match the current filters.")).toHaveAttribute(
      "data-slot",
      "order-history-panel-empty"
    );
  });
});
