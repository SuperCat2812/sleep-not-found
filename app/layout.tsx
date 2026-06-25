import type { Metadata } from "next";
import { Lato, Comfortaa } from "next/font/google";
import "@blossom-carousel/react/style.css";
import "./globals.css";
import css from "./layout.module.css";

import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Sidebar from "@/components/Sidebar/Sidebar";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

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

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Лелека",
  description: "Персональний помічник для майбутніх мам",
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="uk">
      <body className={`${css.body} ${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <Header />

          <div className={css.wrapper}>
            <Sidebar />

            <div className={css.content}>
              <Breadcrumbs />
              <main className={css.main}>{children}</main>
            </div>
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
};

export default Layout;
