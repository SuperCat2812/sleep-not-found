"use client";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { useId } from "react";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}
const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
};
const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(20, "Ім'я задовге")
    .required("Вкажіть ім'я"),
  email: Yup.string().email("Невірний формат пошти").required("Вкажіть пошту"),
  password: Yup.string().required("Вкажіть пароль"),
});
const RegistrationForm = () => {
  const router = useRouter();
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>,
  ) => {
    try {
      const res = await register(values);
      if (res) {
        setUser(res);
        router.push("/profile");
        actions.resetForm();
      } else {
        toast.error("Невірний формат пошти чи пароля");
      }
    } catch {
      toast.error("Невірний формат пошти чи пароля");
    }
  };

  return (
    <>
      <h1>Реєстрація</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterFormSchema}
      >
        <Form>
          <label htmlFor={`${fieldId}-name`}>Ім&#39;я*</label>
          <Field
            id={`${fieldId}-name`}
            type="text"
            name="name"
            placeholder="Ваше ім&#39;я"
          />
          <ErrorMessage name="name" component="span" className={css.error} />
          <label htmlFor={`${fieldId}-email`}>Пошта*</label>
          <Field
            id={`${fieldId}-email`}
            type="email"
            name="email"
            placeholder="hello@leleka.com"
          />
          <ErrorMessage name="email" component="span" className={css.error} />
          <label htmlFor={`${fieldId}-password`}>Пароль*</label>
          <Field
            id={`${fieldId}-password`}
            type="password"
            name="password"
            placeholder="********"
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
          <button type="submit">Зареєструватись</button>
        </Form>
      </Formik>
      <p>
        Вже маєте аккаунт?<Link href={"/auth/login"}>Увійти</Link>
      </p>
    </>
  );
};
export default RegistrationForm;
