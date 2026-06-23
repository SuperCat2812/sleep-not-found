import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sleep-Not-Found",
  description: "Sleep-Not-Found",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
