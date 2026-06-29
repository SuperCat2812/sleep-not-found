import Link from 'next/link';
import css from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Сторінку не знайдено</p>
      <Link className={css.link} href="/">
        Повернутись на головну
      </Link>
    </div>
  );
};

export default NotFound;
