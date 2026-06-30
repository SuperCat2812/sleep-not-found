'use client';

import { useAuthStore } from '@/lib/store/authStore';
import styles from './GreetingBlock.module.css';

const GreetingBlock = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div>
      <h1 className={styles.greeting}>
        Доброго ранку, {user?.name ?? 'Гостю'}!
      </h1>
    </div>
  );
};

export default GreetingBlock;
