import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import '@blossom-carousel/react/style.css';
import './globals.css';
import css from './layout.module.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

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

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Персональний помічник для майбутніх мам',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${css.body} ${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <ThemeProvider>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                removeDelay: 500,
              }}
            />
            {children}
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
