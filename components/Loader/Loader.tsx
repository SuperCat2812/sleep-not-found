import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.container} aria-label="Loading content">
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
