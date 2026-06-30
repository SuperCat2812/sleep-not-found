"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { User } from "@/types/user";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./ProfileEditForm.module.css";
import GenderSelect, { GenderValue } from "@/components/GenderSelect/GenderSelect";
import DueDatePicker from "@/components/DueDatePicker/DueDatePicker";

interface ProfileEditFormProps {
  user: User;
}

interface ProfileFormValues {
  name: string;
  email: string;
  babyGender: string;
  dueDate: string;
}

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getMaxDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 42 * 7);
  return date.toISOString().split("T")[0];
};

const todayDate = getTodayDate();
const maxDueDate = getMaxDueDate();

const profileSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім’я має містити щонайменше 2 символи")
    .max(50, "Ім’я занадто довге")
    .required("Вкажіть ім’я"),

  email: Yup.string()
    .email("Невірний формат пошти")
    .required("Вкажіть пошту"),

  babyGender: Yup.string()
    .oneOf(["boy", "girl", "unknown"], "Оберіть коректне значення")
    .required("Оберіть стать дитини"),

  dueDate: Yup.string()
  .required("Оберіть планову дату пологів")
  .test(
    "not-in-past",
    "Дата не може бути раніше сьогоднішньої",
    (value) => !value || value >= todayDate,
  )
  .test(
    "not-too-far",
    "Дата не може бути пізніше ніж через 42 тижні",
    (value) => !value || value <= maxDueDate,
  ),
});

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues: ProfileFormValues = {
    name: user.name || "",
    email: user.email || "",
    babyGender: user.babyGender || "unknown",
    dueDate: user.dueDate || "",
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>,
  ) => {
    try {
      const updatedUser = await updateMe(values);

      setUser(updatedUser);
      queryClient.setQueryData(["currentUser"], updatedUser);

      toast.success("Профіль оновлено");
      actions.resetForm({ values });
    } catch {
      toast.error("Не вдалося оновити профіль");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, resetForm, values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.fields}>
            <div className={css.field}>
              <div className={css.inputGroup}>
                <label className={css.label} htmlFor="name">
                  Ім’я
                </label>
                <Field
                  id="name"
                  name="name"
                  className={css.input}
                  type="text"
                  placeholder="Ганна"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.field}>
              <div className={css.inputGroup}>
                <label className={css.label} htmlFor="email">
                  Пошта
                </label>
                <Field
                  id="email"
                  name="email"
                  className={`${css.input} ${css.disabledInput}`}
                  type="email"
                  placeholder="hanna@gmail.com"
                  disabled
               />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.selectFields}>
              <div className={css.field}>
                <div className={css.inputGroup}>
                  <label className={css.label} htmlFor="babyGender">
                    Стать дитини
                  </label>
                  <GenderSelect
                   id="babyGender"
                   name="babyGender"
                   value={values.babyGender as GenderValue}
                   onChange={(value) => setFieldValue("babyGender", value)}
                  />
                  <ErrorMessage
                    name="babyGender"
                    component="span"
                    className={css.error}
                  />
                </div>
              </div>

              <div className={css.field}>
                <div className={css.inputGroup}>
                  <label className={css.label} htmlFor="dueDate">
                    Планова дата пологів
                  </label>
                  <DueDatePicker
                    id="dueDate"
                    name="dueDate"
                    value={values.dueDate}
                    onChange={(value) => setFieldValue("dueDate", value)}
                    minDate={todayDate}
                    maxDate={maxDueDate}
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="span"
                    className={css.error}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => resetForm()}
              disabled={isSubmitting}
            >
              Відмінити зміни
            </button>

            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Збереження..." : "Зберегти зміни"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}