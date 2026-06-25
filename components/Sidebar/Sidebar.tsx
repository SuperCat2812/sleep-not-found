import Link from "next/link";
import css from "./Sidebar.module.css";
import Icon from "../Icon/Icon";

const Sidebar = () => {
  return (
    <aside className={css.sidebar}>
      <Link href="/" className={css.logo}>
        <Icon id="icon-Logo-leleka" className={css.logoIcon} />
      </Link>

      <nav className={css.nav}>
        <Link href="/" className={css.link}>
          <Icon id="icon-calendar" className={css.icon} />
          <span>Мій день</span>
        </Link>

        <Link href="/journey/1" className={css.link}>
          <Icon id="icon-travel" className={css.icon} />
          <span>Подорож</span>
        </Link>

        <Link href="/diary" className={css.link}>
          <Icon id="icon-book" className={css.icon} />
          <span>Щоденник</span>
        </Link>

        <Link href="/profile" className={css.link}>
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

        <button className={css.logout}>
          <Icon id="icon-logaut" className={css.logoutIcon} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
