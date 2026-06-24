import type { Metadata } from "next";
import { Lato, Comfortaa } from "next/font/google";
import css from "./layout.module.css";

import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Sidebar from "@/components/Sidebar/Sidebar";

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

export const metadata: Metadata = {
  title: "Лелека",
  description: "Персональний помічник для майбутніх мам",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${css.body} ${lato.variable} ${comfortaa.variable}`}>
        <Header />

        <div className={css.wrapper}>
          <Sidebar />

          <div className={css.content}>
            <Breadcrumbs />
            <main className={css.main}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
