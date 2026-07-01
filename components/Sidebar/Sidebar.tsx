'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import css from './Sidebar.module.css';

import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import { getMe, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useConfirmationModal } from '@/lib/store/confirmModalStore';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Sidebar = () => {
  const setClose = useConfirmationModal().close;
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, setUser, clearIsAuthenticated } =
    useAuthStore();

  const setOpen = useConfirmationModal().open;

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (user || !isAuthenticated) return;

    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [user, isAuthenticated, setUser, clearIsAuthenticated]);

  const navHref = '/auth/login';

  const handleLogout = () => {
    if (isLoggingOut) return;

    setClose();
    setIsLoggingOut(true);

    setTimeout(async () => {
      try {
        await Promise.all([logout(), wait(500)]);
      } catch (error) {
        console.error(error);
      } finally {
        clearIsAuthenticated();
        queryClient.clear();

        router.replace('/');
        router.refresh();

        setIsLoggingOut(false);
      }
    }, 0);
  };

  return (
    <>
      {isLoggingOut && (
        <div className={css.logoutLoader}>
          <Loader />
        </div>
      )}

      <aside className={css.sidebar}>
        <Link href="/" className={css.logo}>
          <Icon id="icon-Logo-leleka" className={css.logoIcon} />
        </Link>

        <nav className={css.nav}>
          <Link
            href={isAuthenticated ? '/' : navHref}
            className={`${css.link} ${isActive('/') ? css.active : ''}`}
          >
            <Icon id="icon-calendar" className={css.icon} />
            <span>Мій день</span>
          </Link>

          <Link
            href={isAuthenticated ? '/journey' : navHref}
            className={`${css.link} ${isActive('/journey') ? css.active : ''}`}
          >
            <Icon id="icon-travel" className={css.icon} />
            <span>Подорож</span>
          </Link>

          <Link
            href={isAuthenticated ? '/diary' : navHref}
            className={`${css.link} ${isActive('/diary') ? css.active : ''}`}
          >
            <Icon id="icon-book" className={css.icon} />
            <span>Щоденник</span>
          </Link>

          <Link
            href={isAuthenticated ? '/profile' : navHref}
            className={`${css.link} ${isActive('/profile') ? css.active : ''}`}
          >
            <Icon id="icon-profile" className={css.icon} />
            <span>Профіль</span>
          </Link>
        </nav>

        {isAuthenticated && user ? (
          <div className={css.userBar}>
            <div className={css.userInfo}>
              <Image
                className={css.avatar}
                src={user.avatarUrl}
                alt="Users avatar"
                width={40}
                height={40}
              />

              <div className={css.userText}>
                <p className={css.name}>{user.name}</p>
                <p className={css.email}>{user.email}</p>
              </div>
            </div>

            <button
              className={css.logout}
              type="button"
              onClick={() => setOpen('logout')}
              disabled={isLoggingOut}
              aria-label="Вийти з акаунта"
            >
              <Icon id="icon-logaut" className={css.logoutIcon} />
            </button>

            <ConfirmationModal
              id="logout"
              title="Ви точно хочете вийти?"
              cancelButtonText="Ні"
              confirmButtonText="Так"
              onCancel={() => {}}
              onConfirm={handleLogout}
            />
          </div>
        ) : (
          <div className={css.authBar}>
            <button
              type="button"
              className={css.registerButton}
              onClick={() => router.push('/auth/register')}
            >
              Зареєструватися
            </button>

            <button
              type="button"
              className={css.loginButton}
              onClick={() => router.push('/auth/login')}
            >
              Увійти
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
