import * as React from "react";
import { cn } from "./utils";

type CardElement = "article" | "aside" | "div" | "section";

export type CardProps = React.ComponentProps<"div"> & {
  as?: CardElement;
};
export type CardHeaderProps = React.ComponentProps<"div">;
export type CardTitleProps = React.ComponentProps<"h3">;
export type CardDescriptionProps = React.ComponentProps<"p">;
export type CardContentProps = React.ComponentProps<"div">;
export type CardFooterProps = React.ComponentProps<"div">;

export function Card({ as: Component = "div", className, ...props }: CardProps) {
  return (
    <Component
      className={cn("rounded-md border border-line bg-white text-ink", className)}
      data-slot="card"
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("border-b border-line px-4 py-3", className)}
      data-slot="card-header"
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-base font-semibold leading-6", className)}
      data-slot="card-title"
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("mt-1 text-sm text-muted", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn("p-4", className)} data-slot="card-content" {...props} />
  );
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("border-t border-line px-4 py-3", className)}
      data-slot="card-footer"
      {...props}
    />
  );
}
