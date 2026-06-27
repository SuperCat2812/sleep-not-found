import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import Image from "next/image";

import css from "./register.module.css";
// import { Metadata } from "next";

//metadata
//я додам сюди коли визначимся з варіантом

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
