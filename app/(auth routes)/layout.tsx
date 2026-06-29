import Link from 'next/link';

import Icon from '@/components/Icon/Icon';

import css from './layout.module.css';
import './Auth-globals.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      <Link href="/" className={css.logo}>
        <Icon id="icon-Logo-leleka" className={css.logoIcon} />
      </Link>

      <div className={css.content}>
        <main className={css.main}>{children}</main>
      </div>
    </div>
  );
}
