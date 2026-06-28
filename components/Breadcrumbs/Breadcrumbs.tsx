'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Breadcrumbs.module.css';

const breadcrumbNames: Record<string, string> = {
  diary: 'Щоденник',
  new: 'Новий запис',
  journey: 'Подорож',
  profile: 'Профіль',
};

const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === '/' || pathname.startsWith('/auth')) {
    return null;
  }

  const segments = pathname.split('/').filter(el => {
    return el;
  });

  return (
    <div className={css.breadcrumbs}>
      <Link href="/" className={css.link}>
        Мій день
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join('/')}`;

        return (
          <div key={href} className={css.item}>
            <span className={css.separator}>›</span>

            {isLast ? (
              <span className={css.current}>
                {breadcrumbNames[segment] ?? segment}
              </span>
            ) : (
              <Link href={href} className={css.link}>
                {breadcrumbNames[segment] ?? segment}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
