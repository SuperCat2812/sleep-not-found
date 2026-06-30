import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import Image from 'next/image';
import css from './register.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Реєстрація',
  description: 'Реєстрація нового користувача',
  openGraph: {
    title: 'Реєстрація нового користувача',
    description: 'Реєстрація нового користувача',
    url: 'http://localhost:3000/auth/register',
    images: [
      {
        url: '/leleka.png',
        width: '1200',
        height: '630',
        alt: 'Яйця лелеки',
      },
    ],
  },
};

const register = () => {
  return (
    <div className={css.wrapper}>
      <RegistrationForm />
      <Image
        src="/leleka.png"
        alt="leleka"
        width={720}
        height={900}
        priority
        className={css.image}
      />
    </div>
  );
};
export default register;
