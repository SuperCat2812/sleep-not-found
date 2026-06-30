'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { updateAvatar, updateOnboarding } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './OnboardingForm.module.css';
import GenderSelect, {
  GenderValue,
} from '@/components/GenderSelect/GenderSelect';
import DueDatePicker from '@/components/DueDatePicker/DueDatePicker';
import Image from 'next/image';

interface OnboardingFormValues {
  babyGender: string;
  dueDate: string;
}

const MAX_FILE_SIZE = 1024 * 1024;

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

const getMaxDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 42 * 7);
  return date.toISOString().split('T')[0];
};

const todayDate = getTodayDate();
const maxDueDate = getMaxDueDate();

const onboardingSchema = Yup.object({
  babyGender: Yup.string()
    .oneOf(['boy', 'girl', 'unknown'], 'Оберіть коректне значення')
    .required('Оберіть стать дитини'),

  dueDate: Yup.string()
    .required('Оберіть планову дату пологів')
    .test(
      'not-in-past',
      'Дата не може бути раніше сьогоднішньої',
      value => !value || value >= todayDate
    )
    .test(
      'not-too-far',
      'Дата не може бути пізніше ніж через 42 тижні',
      value => !value || value <= maxDueDate
    ),
});

export default function OnboardingForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore(state => state.setUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const initialValues: OnboardingFormValues = {
    babyGender: '',
    dueDate: '',
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Фото занадто велике. Оберіть файл до 1 MB.');
      input.value = '';
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    values: OnboardingFormValues,
    actions: FormikHelpers<OnboardingFormValues>
  ) => {
    try {
      let updatedUser = await updateOnboarding(values);

      if (avatarFile) {
        const userWithAvatar = await updateAvatar(avatarFile);

        updatedUser = {
          ...updatedUser,
          ...userWithAvatar,
        };
      }

      setUser(updatedUser);
      queryClient.setQueryData(['currentUser'], updatedUser);
      toast.dismiss();

      toast.success('Дані збережено', {
        duration: 3000,
      });

      router.replace('/');
    } catch {
      toast.error('Не вдалося зберегти дані', { duration: 3000 });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Давайте познайомимось ближче</h1>

      <div className={css.avatarBlock}>
        <button
          type="button"
          className={css.avatarButton}
          onClick={handleUploadClick}
          aria-label="Завантажити фото"
        >
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Попередній перегляд аватара"
              className={css.avatarImage}
              width={164}
              height={164}
            />
          ) : (
            <Image
              src="/images/avatar-placeholder.svg"
              alt="Avatar"
              className={css.avatarPlaceholder}
              aria-hidden="true"
              width={164}
              height={164}
            />
          )}
        </button>

        <button
          type="button"
          className={css.uploadButton}
          onClick={handleUploadClick}
        >
          Завантажити фото
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={onboardingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.field}>
              <label className={css.label} htmlFor="babyGender">
                Стать дитини
              </label>

              <GenderSelect
                id="babyGender"
                name="babyGender"
                value={values.babyGender as GenderValue}
                onChange={value => setFieldValue('babyGender', value)}
              />

              <ErrorMessage
                name="babyGender"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="dueDate">
                Планова дата пологів
              </label>

              <DueDatePicker
                id="dueDate"
                name="dueDate"
                value={values.dueDate}
                onChange={value => setFieldValue('dueDate', value)}
                minDate={todayDate}
                maxDate={maxDueDate}
              />

              <ErrorMessage
                name="dueDate"
                component="span"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Збереження...' : 'Зберегти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
