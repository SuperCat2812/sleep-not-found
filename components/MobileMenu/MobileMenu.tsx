import Link from 'next/link';
import Icon from '../Icon/Icon';
import css from './MobileMenu.module.css';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <aside className={css.menu} onClick={event => event.stopPropagation()}>
        <div className={css.top}>
          <Link href="/" className={css.logo} onClick={onClose}>
            <Icon id="icon-Logo-leleka" className={css.logoIcon} />
            <span>Лелека</span>
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
          <Link href="/" className={css.link} onClick={onClose}>
            <Icon id="icon-calendar" className={css.icon} />
            <span>Мій день</span>
          </Link>

          <Link href="/journey" className={css.link} onClick={onClose}>
            <Icon id="icon-travel" className={css.icon} />
            <span>Подорож</span>
          </Link>

          <Link href="/diary" className={css.link} onClick={onClose}>
            <Icon id="icon-book" className={css.icon} />
            <span>Щоденник</span>
          </Link>

          <Link href="/profile" className={css.link} onClick={onClose}>
            <Icon id="icon-profile" className={css.icon} />
            <span>Профіль</span>
          </Link>
        </nav>

        <div className={css.userBar}>
          <div className={css.userInfo}>
            <div className={css.avatar}></div>

            <div>
              <p className={css.name}>Ганна</p>
              <p className={css.email}>hanna@gmail.com</p>
            </div>
          </div>

          <button className={css.logout} type="button">
            <Icon id="icon-logaut" className={css.logoutIcon} />
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
