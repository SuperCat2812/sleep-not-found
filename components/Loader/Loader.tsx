import clsx from 'clsx';
import css from './Loader.module.css';

interface LoaderProps {
  className?: string;
}

function Loader({ className }: LoaderProps) {
  return (
    <div
      className={clsx(css.container, className)}
      aria-label="Loading content"
    >
      <span className={css.loadText}>...Loading...</span>

      <div className={css.dotsWrapper} aria-hidden="true">
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
        <span className={css.dots}></span>
      </div>
    </div>
  );
}

export default Loader;
