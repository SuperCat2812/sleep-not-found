"use client";
// import css from "./RegistrationForm.module.css";
import { Formik, Form, Field } from "formik";
import { useId } from "react";

const RegistrationForm = () => {
  const fieldId = useId();
  return (
    <>
      <h1>Реєстрація</h1>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <label htmlFor={`${fieldId}-name`}>Ім&#39;я*</label>
          <Field id={`${fieldId}-name`} type="text" name="name" placeholder='Ваше ім&#39;я'></Field>

          <label htmlFor={`${fieldId}-email`}>Пошта*</label>
          <Field id={`${fieldId}-email`} type="email" name="email" placeholder='hello@leleka.com'></Field>

          <label htmlFor={`${fieldId}-password`}>Пароль*</label>
          <Field
            id={`${fieldId}-password`}
            type="password"
            name="password"
          placeholder='********'></Field>

          <button type="submit">Зареєструватись</button>
        </Form>
      </Formik>
    </>
  );
};
export default RegistrationForm;
