'use client';

import Link from 'next/link';
import Icon from '../Icon/Icon';
import css from './MobileMenu.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useConfirmationModal } from '@/lib/store/confirmModalStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const setOpen = useConfirmationModal().open;
  const router = useRouter();

  const navHref = '/auth/login';
  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    onClose();
    router.push('/');
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <aside className={css.menu} onClick={event => event.stopPropagation()}>
        <div className={css.top}>
          <Link
            href={isAuthenticated ? '/' : navHref}
            className={css.logo}
            onClick={onClose}
          >
            <Icon id="icon-Logo-leleka" className={css.logoIcon} />
          </Link>

          <button
            className={css.closeButton}
            type="button"
            aria-label="Закрити меню"
            onClick={onClose}
          >
            <Icon id="icon-close" className={css.closeIcon} />
          </button>
        </div>

        <nav className={css.nav}>
          <Link
            href={isAuthenticated ? '/' : navHref}
            className={css.link}
            onClick={onClose}
          >
            <Icon id="icon-calendar" className={css.icon} />
            <span>Мій день</span>
          </Link>

          <Link
            href={isAuthenticated ? '/journey' : navHref}
            className={css.link}
            onClick={onClose}
          >
            <Icon id="icon-travel" className={css.icon} />
            <span>Подорож</span>
          </Link>

          <Link
            href={isAuthenticated ? '/diary' : navHref}
            className={css.link}
            onClick={onClose}
          >
            <Icon id="icon-book" className={css.icon} />
            <span>Щоденник</span>
          </Link>

          <Link
            href={isAuthenticated ? '/profile' : navHref}
            className={css.link}
            onClick={onClose}
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

              <div>
                <p className={css.name}>{user.name}</p>
                <p className={css.email}>{user.email}</p>
              </div>
            </div>

            <button
              className={css.logout}
              type="button"
              onClick={() => setOpen('logoutBurger')}
            >
              <Icon id="icon-logaut" className={css.logoutIcon} />
            </button>
          </div>
        ) : (
          <div className={css.authBar}>
            <Link
              href="/auth/register"
              className={css.registerButton}
              onClick={onClose}
            >
              Зареєструватися
            </Link>

            <Link
              href="/auth/login"
              className={css.loginButton}
              onClick={onClose}
            >
              Увійти
            </Link>
          </div>
        )}
      </aside>
      <ConfirmationModal
        id="logoutBurger"
        title="Ви точно хочете вийти?"
        cancelButtonText="Ні"
        confirmButtonText="Так"
        onCancel={() => {}}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default MobileMenu;
