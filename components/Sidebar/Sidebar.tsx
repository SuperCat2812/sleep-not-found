'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import css from './Sidebar.module.css';
import Icon from '../Icon/Icon';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';

const Sidebar = () => {
  const { user, isAuthenticated, setUser, clearIsAuthenticated } =
    useAuthStore();

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [user, setUser, clearIsAuthenticated]);

  const handleLogout = () => {
    clearIsAuthenticated();
  };

  const navHref = '/auth/login';

  return (
    <aside className={css.sidebar}>
      <Link href="/" className={css.logo}>
        <Icon id="icon-Logo-leleka" className={css.logoIcon} />
      </Link>

      <nav className={css.nav}>
        <Link href={isAuthenticated ? '/' : navHref} className={css.link}>
          <Icon id="icon-calendar" className={css.icon} />
          <span>Мій день</span>
        </Link>

        <Link
          href={isAuthenticated ? '/journey' : navHref}
          className={css.link}
        >
          <Icon id="icon-travel" className={css.icon} />
          <span>Подорож</span>
        </Link>

        <Link href={isAuthenticated ? '/diary' : navHref} className={css.link}>
          <Icon id="icon-book" className={css.icon} />
          <span>Щоденник</span>
        </Link>

        <Link
          href={isAuthenticated ? '/profile' : navHref}
          className={css.link}
        >
          <Icon id="icon-profile" className={css.icon} />
          <span>Профіль</span>
        </Link>
      </nav>

      {isAuthenticated && user ? (
        <div className={css.userBar}>
          <div className={css.userInfo}>
            <div className={css.avatar}></div>

            <div>
              <p className={css.name}>{user.name}</p>
              <p className={css.email}>{user.email}</p>
            </div>
          </div>

          <button className={css.logout} type="button" onClick={handleLogout}>
            <Icon id="icon-logaut" className={css.logoutIcon} />
          </button>
        </div>
      ) : (
        <div className={css.authBar}>
          <Link href="/auth/register" className={css.registerButton}>
            Зареєструватися
          </Link>

          <Link href="/auth/login" className={css.loginButton}>
            Увійти
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
