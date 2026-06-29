import Loader from '@/components/Loader/Loader';
import css from './loading.module.css';
const loadingPage = () => {
  return (
    <div className={css.loading}>
      <Loader />;
    </div>
  );
};
export default loadingPage;
