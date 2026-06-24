import type { Metadata } from "next";
import { Lato, Comfortaa } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sleep-Not-Found",
  description: "Sleep-Not-Found",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-comfortaa",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        {children}
      </body>
    </html>
  );
}
