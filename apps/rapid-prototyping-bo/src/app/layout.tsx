import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rapid Prototyping BO | Operations dashboard",
  description: "A calm, editorial order history dashboard for modern operations teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
