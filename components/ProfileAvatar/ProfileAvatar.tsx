import type { User } from "@/types/user";
import css from "./ProfileAvatar.module.css";

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.avatarBox}>
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className={css.avatar} />
        ) : (
          <div className={css.placeholder}>
            {user.name?.charAt(0).toUpperCase() || "?"}
          </div>
        )}
      </div>

      <div className={css.info}>
        <h2 className={css.name}>{user.name}</h2>
        <p className={css.email}>{user.email}</p>

        <button type="button" className={css.uploadButton}>
          Завантажити нове фото
        </button>
      </div>
    </div>
  );
}