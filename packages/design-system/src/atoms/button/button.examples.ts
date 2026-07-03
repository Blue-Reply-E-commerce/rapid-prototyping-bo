import type { ButtonProps } from "./button";

export const buttonExamples = {
  disabled: {
    children: "Unavailable",
    disabled: true
  },
  ghost: {
    children: "Reset filters",
    size: "sm",
    variant: "ghost"
  },
  primary: {
    children: "Save changes",
    size: "md",
    variant: "primary"
  },
  secondary: {
    children: "Filter orders",
    size: "sm",
    variant: "secondary"
  }
} satisfies Record<string, ButtonProps>;
