'use client';

import { useAuthStore } from '@/lib/store/authStore';
import styles from './GreetingBlock.module.css';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'Доброго ранку';
  if (hour >= 12 && hour < 18) return 'Доброго дня';
  if (hour >= 18 && hour < 24) return 'Доброго вечора';
  return 'Доброї ночі';
};

const GreetingBlock = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div>
      <h1 className={styles.greeting}>
        {getGreeting()}, {user?.name ?? 'Гостю'}!
      </h1>
    </div>
  );
};

export default GreetingBlock;
