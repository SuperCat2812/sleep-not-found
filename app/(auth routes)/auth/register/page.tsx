import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import Image from "next/image";

import css from "./register.module.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Реєстрація",
  description: "Реєстрація нового користувача",
  openGraph: {
    title: "Реєстрація",
    description: "Реєстрація нового користувача",
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    images: [{ url: `${process.env.NEXT_PUBLIC_API_URL}/leleka.png` }],
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
