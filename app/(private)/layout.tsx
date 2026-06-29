import Header from '@/components/Header/Header';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Sidebar from '@/components/Sidebar/Sidebar';

import css from './layout.module.css';
import './globals.css';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <div className={css.wrapper}>
        <Sidebar />

        <div className={css.content}>
          <div className={css.position}>
            <Breadcrumbs />
            <main className={css.main}>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
