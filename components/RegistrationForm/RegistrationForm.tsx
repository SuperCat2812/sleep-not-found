"use client";
import { Formik, Form, Field } from "formik";

const RegistrationForm = () => {
  return (
    <>
      <h1>Реєстрація</h1>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Field type="text" name="name"></Field>
          <Field type="email" name="email"></Field>
          <Field type="password" name="password"></Field>
          <button type="submit">Зареєструватись</button>
        </Form>
      </Formik>
    </>
  );
};
export default RegistrationForm;
