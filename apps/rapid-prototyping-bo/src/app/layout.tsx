import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rapid Prototyping BO",
  description: "Backoffice workspace for order history and operational settings."
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
