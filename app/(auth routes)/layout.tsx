import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import '@blossom-carousel/react/style.css';
import './Auth-globals.css';
import css from './layout.module.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-comfortaa',
});

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Персональний помічник для майбутніх мам',
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="uk">
      <body className={`${css.body} ${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <Toaster position="top-center" reverseOrder={false} />

          <div className={css.wrapper}>
            <div className={css.content}>
              <main className={css.main}>{children}</main>
            </div>
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
};

export default Layout;
