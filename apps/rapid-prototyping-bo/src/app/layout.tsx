import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RP back office",
  description: "Mock-only backoffice order history dashboard."
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
