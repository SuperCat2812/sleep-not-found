'use client';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import styles from './AddDiaryEntryModal.module.css';
import Icon from '@/components/Icon/Icon';

interface Emotion {
  _id: string;
  title: string;
}

interface AddDiaryEntryFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  entryToEdit?: {
    _id: string;
    title: string;
    emotions: string[];
    description: string;
  };
}

const validationSchema = Yup.object({
  title: Yup.string().required('Введіть заголовок'),
  emotions: Yup.array().min(1, 'Оберіть хоча б одну емоцію'),
  description: Yup.string().required('Введіть текст запису'),
});

export default function AddDiaryEntryForm({
  onClose,
  onSuccess,
  entryToEdit,
}: AddDiaryEntryFormProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emotionsList, setEmotionsList] = useState<Emotion[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await fetch('/api/emotions');
        const data = await res.json();
        setEmotionsList(data.emotions);
      } catch {
        toast.error('Не вдалось завантажити емоції');
      }
    };
    fetchEmotions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Formik
      initialValues={{
        title: entryToEdit?.title ?? '',
        emotions: entryToEdit?.emotions ?? [],
        description: entryToEdit?.description ?? '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (entryToEdit) {
            await fetch(`/api/diary/${entryToEdit._id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });
          } else {
            const res = await fetch('/api/diary', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error();
          }
          onClose();
          onSuccess?.();
        } catch {
          toast.error('Помилка збереження запису');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue, handleChange }) => (
        <Form>
          <div>
            <label className={styles.label}>Заголовок</label>
            <input
              className={styles.input}
              name="title"
              type="text"
              placeholder="Введіть заголовок запису"
              value={values.title}
              onChange={handleChange}
            />
            <ErrorMessage name="title" component="p" className={styles.error} />
          </div>

          <div>
            <label className={styles.label}>Категорії</label>
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <div
                className={styles.dropdownTrigger}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className={styles.tags}>
                  {values.emotions.length > 0 ? (
                    emotionsList
                      .filter(e => values.emotions.includes(e._id))
                      .map(e => (
                        <span key={e._id} className={styles.tag}>
                          {e.title}
                        </span>
                      ))
                  ) : (
                    <span>Оберіть категорію</span>
                  )}
                </div>
                <Icon
                  id="icon-bottom"
                  className={`${styles.arrow} ${isDropdownOpen ? styles.arrowOpen : ''}`}
                />
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdownList}>
                  {emotionsList.map(emotion => (
                    <label key={emotion._id} className={styles.dropdownItem}>
                      <input
                        type="checkbox"
                        checked={values.emotions.includes(emotion._id)}
                        onChange={() => {
                          const updated = values.emotions.includes(emotion._id)
                            ? values.emotions.filter(id => id !== emotion._id)
                            : [...values.emotions, emotion._id];
                          setFieldValue('emotions', updated);
                        }}
                      />
                      {emotion.title}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <ErrorMessage
              name="emotions"
              component="p"
              className={styles.error}
            />
          </div>

          <div>
            <label className={styles.label}>Запис</label>
            <textarea
              className={styles.textarea}
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
              value={values.description}
              onChange={handleChange}
            />
            <ErrorMessage
              name="description"
              component="p"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
