'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import css from './Sidebar.module.css';

import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import { getMe, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useConfirmationModal } from '@/lib/store/confirmModalStore';

const Sidebar = () => {
  const router = useRouter();

  const { user, isAuthenticated, setUser, clearIsAuthenticated } =
    useAuthStore();

  const setOpen = useConfirmationModal().open;

  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const navHref = '/auth/login';

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await logout();

      clearIsAuthenticated();
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

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
            <div className={css.avatar}>
              <Image
                src={user.avatarUrl}
                alt="Users avatar"
                width={40}
                height={40}
              />
            </div>

            <div className={css.userText}>
              <p className={css.name}>{user.name}</p>
              <p className={css.email}>{user.email}</p>
            </div>
          </div>

          {isLoggingOut ? (
            <Loader className={css.logoutLoader} />
          ) : (
            <button
              className={css.logout}
              type="button"
              onClick={() => setOpen('logout')}
            >
              <Icon id="icon-logaut" className={css.logoutIcon} />
            </button>
          )}

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
