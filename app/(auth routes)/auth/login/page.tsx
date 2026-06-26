import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";
import css from "./login.module.css";

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
