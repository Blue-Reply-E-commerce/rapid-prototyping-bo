import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { buttonExamples } from "./button.examples";

describe("Button", () => {
  it("renders the default accessible button contract", () => {
    render(<Button {...buttonExamples.primary} />);

    const button = screen.getByRole("button", { name: "Save changes" });

    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-ink");
    expect(button).toHaveClass("h-9");
  });

  it("renders secondary and small variants", () => {
    render(<Button {...buttonExamples.secondary} />);

    const button = screen.getByRole("button", { name: "Filter orders" });

    expect(button).toHaveClass("border-line");
    expect(button).toHaveClass("h-8");
  });

  it("preserves disabled state", () => {
    render(<Button {...buttonExamples.disabled} />);

    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });
});
