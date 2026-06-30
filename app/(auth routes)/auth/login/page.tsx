import LoginForm from '@/components/LoginForm/LoginForm';
import Image from 'next/image';
import css from './login.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід',
  description: 'Вхід в аккаунт користувача',
  openGraph: {
    title: 'Вхід в аккаунт',
    description: 'Вхід в аккаунт користувача',
    url: 'http://localhost:3000/auth/login',
    images: [
      {
        url: '/eggs.png',
        width: '1200',
        height: '630',
        alt: 'Лелека',
      },
    ],
  },
};

const login = () => {
  return (
    <div className={css.wrapper}>
      <LoginForm />
      <div className={css.imageWrapper}>
        <Image
          src="/eggs.png"
          alt="eggs in the nest"
          priority
          className={css.image}
          width={720}
          height={900}
        />
      </div>
    </div>
  );
};
export default login;
