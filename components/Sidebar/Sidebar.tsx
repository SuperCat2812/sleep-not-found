'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import css from './Sidebar.module.css';
import Icon from '../Icon/Icon';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe, logout } from '@/lib/api/clientApi';
import { useConfirmationModal } from '@/lib/store/confirmModalStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Sidebar = () => {
  const router = useRouter();
  const { user, isAuthenticated, setUser, clearIsAuthenticated } =
    useAuthStore();

  const setOpen = useConfirmationModal().open;

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const ok = await checkSession();
        if (!ok) return;
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
    await logout();
    clearIsAuthenticated();
    router.push('/');
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
