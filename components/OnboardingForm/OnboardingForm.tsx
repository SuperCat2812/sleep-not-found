"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { updateAvatar, updateOnboarding } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./OnboardingForm.module.css";

interface OnboardingFormValues {
  babyGender: string;
  dueDate: string;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1 MB

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

const onboardingSchema = Yup.object({
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

export default function OnboardingForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const initialValues: OnboardingFormValues = {
    babyGender: "unknown",
    dueDate: "",
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
      toast.error("Фото занадто велике. Оберіть файл до 1 MB.");
      input.value = "";
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    values: OnboardingFormValues,
    actions: FormikHelpers<OnboardingFormValues>,
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
      queryClient.setQueryData(["currentUser"], updatedUser);

      toast.success("Дані збережено");
      router.push("/");
    } catch {
      toast.error("Не вдалося зберегти дані");
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
            <img
              src={avatarPreview}
              alt="Попередній перегляд аватара"
              className={css.avatarImage}
            />
          ) : (
            <span className={css.avatarPlaceholder}>🖼️</span>
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
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.field}>
              <label className={css.label} htmlFor="babyGender">
                Стать дитини
              </label>

              <Field
                as="select"
                id="babyGender"
                name="babyGender"
                className={css.input}
              >
                <option value="unknown">Оберіть стать</option>
                <option value="boy">Хлопчик</option>
                <option value="girl">Дівчинка</option>
              </Field>

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

              <Field
                id="dueDate"
                name="dueDate"
                type="date"
                className={css.input}
                min={todayDate}
                max={maxDueDate}
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
              {isSubmitting ? "Збереження..." : "Зберегти"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}