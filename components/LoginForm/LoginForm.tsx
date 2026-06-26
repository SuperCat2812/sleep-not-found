"use client";

import css from "./LoginForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  email: string;
  password: string;
}
const initialValues: LoginFormValues = {
  email: "",
  password: "",
};
const LoginFormShema = Yup.object().shape({
  email: Yup.string().email("Невірний формат пошти").required("Вкажіть пошту"),
  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Вкажіть пароль"),
});
const LoginForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      const res = await login(values);
      if (res) {
        setUser(res);
        router.push("/");
        actions.resetForm();
      } else {
        toast.error("Перевірте пошту чи пароль");
      }
    } catch {
      toast.error("Перевірте пошту чи пароль");
    }
  };
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Вхід</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginFormShema}
      >
        <Form className={css.form}>
          <Field
            type="email"
            name="email"
            placeholder="Пошта"
            aria-label="Електронна пошта користувача"
            className={css.label}
          />

          <ErrorMessage name="email" component="span" className={css.error} />

          <Field
            type="password"
            name="password"
            placeholder="Пароль"
            aria-label="Пароль користувача"
            className={css.label}
          />

          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
          <button type="submit" className={css.button}>Увійти</button>
        </Form>
      </Formik>
      <p className={css.paragraph}>
        Немає аккаунта?<Link href={"/auth/register"} className={css.link}> Зареєструватись</Link>
      </p>
    </div>
  );
};
export default LoginForm;
