'use client';

import css from './LoginForm.module.css';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  email: string;
  password: string;
}
const initialValues: LoginFormValues = {
  email: '',
  password: '',
};
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('Невірний формат пошти').required('Вкажіть пошту'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required('Вкажіть пароль'),
});
const LoginForm = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const res = await login(values);
      if (res) {
        setUser(res);
        actions.resetForm();
        router.push('/');
      } else {
        toast.error('Перевірте пошту чи пароль');
      }
    } catch {
      toast.error('Перевірте пошту чи пароль');
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Вхід</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginFormSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <Field
                type="email"
                name="email"
                placeholder="Пошта"
                aria-label="Електронна пошта користувача"
                className={`${css.input} ${touched.email && errors.email ? css.error : ''}`}
              />

              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <Field
                type="password"
                name="password"
                placeholder="Пароль"
                aria-label="Пароль користувача"
                className={`${css.input} ${touched.password && errors.password ? css.error : ''}`}
              />

              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Увійти...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
      <p className={css.paragraph}>
        Немає аккаунту?{' '}
        <Link href={'/auth/register'} className={css.link}>
          Зареєструватися
        </Link>
      </p>
    </div>
  );
};
export default LoginForm;
