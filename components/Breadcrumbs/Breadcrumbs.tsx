import Link from "next/link";
import css from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  return (
    <div className={css.breadcrumbs}>
      <Link href="/" className={css.link}>
        Лелека
      </Link>

      <span className={css.separator}>›</span>

      <span className={css.current}>Мій день</span>
    </div>
  );
};

export default Breadcrumbs;
