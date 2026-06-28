'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createTask, Task } from '@/lib/api/tasks';
import css from './AddTaskForm.module.css';

interface TaskFormValues {
  name: string;
  date: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .max(200, 'Максимум 200 символів')
    .required("Назва завдання обов'язкова"),
  date: Yup.string().required("Дата обов'язкова"),
});

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

interface AddTaskFormProps {
  onClose: () => void;
}

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Task, Error, TaskFormValues>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Сталася помилка';
      toast.error(msg);
    },
  });

  return (
    <Formik<TaskFormValues>
      initialValues={{ name: '', date: getTodayDate() }}
      validationSchema={validationSchema}
      onSubmit={values => mutate(values)}
    >
      {({ errors, touched }) => (
        <Form className={css.form} noValidate>
          <div className={css.field}>
            <label className={css.label} htmlFor="name">
              Завдання
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Введіть назву завдання"
              className={`${css.input} ${errors.name && touched.name ? css.inputError : ''}`}
            />
            <ErrorMessage name="name">
              {msg => <p className={css.errorMsg}>{msg}</p>}
            </ErrorMessage>
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor="date">
              Дата
            </label>
            <Field
              id="date"
              name="date"
              type="date"
              className={`${css.input} ${errors.date && touched.date ? css.inputError : ''}`}
            />
            <ErrorMessage name="date">
              {msg => <p className={css.errorMsg}>{msg}</p>}
            </ErrorMessage>
          </div>

          <button type="submit" className={css.submitBtn} disabled={isPending}>
            {isPending ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
