import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";
import css from "./login.module.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Вхід",
  description: "Вхід в аккаунт користувача",
  openGraph: {
    title: "Вхід",
    description: "Вхід в аккаунт користувача",
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    images: [{ url: `${process.env.NEXT_PUBLIC_API_URL}/leleka.png` }],
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
