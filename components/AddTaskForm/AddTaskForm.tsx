'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createTask, Task } from '@/lib/api/tasks';
import DueDatePicker from '@/components/DueDatePicker/DueDatePicker';
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

function getMaxDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 5);
  return date.toISOString().split('T')[0];
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
      {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
        <Form className={css.form} noValidate>
          <div className={css.field}>
            <label className={css.label} htmlFor="name">
              Назва завдання
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Прийняти вітаміни"
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
            <div className={css.dateFieldWrapper}>
              <DueDatePicker
                id="date"
                name="date"
                value={values.date}
                onChange={date => {
                  setFieldValue('date', date);
                  setFieldTouched('date', true);
                }}
                minDate={getTodayDate()}
                maxDate={getMaxDate()}
              />
            </div>
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
