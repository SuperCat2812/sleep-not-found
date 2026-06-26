import type { User } from "@/types/user";
import css from "./ProfileEditForm.module.css";

interface ProfileEditFormProps {
  user: User;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  return (
    <form className={css.form}>
      <div className={css.fields}>
        <div className={css.field}>
          <div className={css.inputGroup}>
            <label className={css.label} htmlFor="name">
              Ім’я
            </label>
            <input
              id="name"
              className={css.input}
              type="text"
              defaultValue={user.name}
              placeholder="Ганна"
            />
          </div>
        </div>

        <div className={css.field}>
          <div className={css.inputGroup}>
            <label className={css.label} htmlFor="email">
              Пошта
            </label>
            <input
              id="email"
              className={css.input}
              type="email"
              defaultValue={user.email}
              placeholder="hanna@gmail.com"
            />
          </div>
        </div>

        <div className={css.selectFields}>
          <div className={css.field}>
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="babyGender">
                Стать дитини
              </label>
              <select
                id="babyGender"
                className={css.input}
                defaultValue={user.babyGender || ""}
              >
                <option value="">Оберіть стать</option>
                <option value="boy">Хлопчик</option>
                <option value="girl">Дівчинка</option>
                <option value="unknown">Ще не знаю</option>
              </select>
            </div>
          </div>

          <div className={css.field}>
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="dueDate">
                Планова дата пологів
              </label>
              <input
                id="dueDate"
                className={css.input}
                type="date"
                defaultValue={user.dueDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton}>
          Відмінити зміни
        </button>

        <button type="submit" className={css.saveButton}>
          Зберегти зміни
        </button>
      </div>
    </form>
  );
}