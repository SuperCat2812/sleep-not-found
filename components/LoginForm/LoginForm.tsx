"use client";

import css from "./LoginForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

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
    .min(8, "Пароль має містити щонайменше 8 символи")
    .required("Вкажіть пароль"),
});
const LoginForm = () => {
  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    console.log(values); //TO REMOVE IT ONCE THE LOGIN REQUEST FUNCTION IS READY
    actions.resetForm();
  };
  return (
    <div>
      <h1 className={css.title}>Вхід</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginFormShema}
      >
        <Form>
          <Field type="email" name="email" placeholder="Пошта" />
          <ErrorMessage name="email" component="span" className={css.error} />
          <Field type="password" name="password" placeholder="Пароль" />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
          <button type="submit">Увійти</button>
        </Form>
      </Formik>
      <p>
        Немає аккаунта?<Link href={"/auth/register"}>Зареєструватись</Link>
      </p>
    </div>
  );
};
export default LoginForm;
