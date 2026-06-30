'use client';
import css from './RegistrationForm.module.css';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

import { useId } from 'react';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}
const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};
const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(20, "Ім'я задовге")
    .required("Вкажіть ім'я"),
  email: Yup.string().email('Невірний формат пошти').required('Вкажіть пошту'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required('Вкажіть пароль'),
});
const RegistrationForm = () => {
  const router = useRouter();
  const fieldId = useId();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const res = await register(values);
      if (res) {
        setUser(res);
        actions.resetForm();
        router.push('/profile/edit');
      } else {
        toast.error('Невірний формат пошти чи пароля');
      }
    } catch {
      toast.error('Невірний формат пошти чи пароля');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Реєстрація</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterFormSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <label htmlFor={`${fieldId}-name`} className={css.label}>
                Ім&#39;я*
              </label>
              <Field
                id={`${fieldId}-name`}
                type="text"
                name="name"
                placeholder="Ваше ім&#39;я"
                className={`${css.input} ${touched.name && errors.name ? css.error : ''}`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor={`${fieldId}-email`} className={css.label}>
                Пошта*
              </label>
              <Field
                id={`${fieldId}-email`}
                type="email"
                name="email"
                placeholder="hello@leleka.com"
                className={`${css.input} ${touched.email && errors.email ? css.error : ''}`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor={`${fieldId}-password`} className={css.label}>
                Пароль*
              </label>
              <Field
                id={`${fieldId}-password`}
                type="password"
                name="password"
                placeholder="********"
                className={`${css.input} ${touched.password && errors.password ? css.error : ''}`}
              />

              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Реєстрація...' : 'Зареєструватись'}
            </button>
            <p className={css.paragraph}>
              Вже маєте аккаунт?{' '}
              <Link className={css.link} href={'/auth/login'}>
                Увійти
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegistrationForm;
