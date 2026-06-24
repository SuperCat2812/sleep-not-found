"use client";
// import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { useId } from "react";

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
    .min(2, "The name must be at least 2 characters")
    .max(20, "The name is too long")
    .required("The name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("The email is required"),
  password: Yup.string().required(),
});
const RegistrationForm = () => {
  const fieldId = useId();
  const handleSubmit = (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>,
  ) => {
    /*register(values)  дані які ми передаємо у функцію для post на бекенд*/
    console.log(values); //ВИДАЛИТИ ПОТІМ!!!
    actions.resetForm();
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
          ></Field>

          <label htmlFor={`${fieldId}-email`}>Пошта*</label>
          <Field
            id={`${fieldId}-email`}
            type="email"
            name="email"
            placeholder="hello@leleka.com"
          ></Field>

          <label htmlFor={`${fieldId}-password`}>Пароль*</label>
          <Field
            id={`${fieldId}-password`}
            type="password"
            name="password"
            placeholder="********"
          ></Field>

          <button type="submit">Зареєструватись</button>
        </Form>
      </Formik>
      <p>
        Вже маєте аккаунт?<Link href={{}}>Увійти</Link>
      </p>
    </>
  );
};
export default RegistrationForm;
