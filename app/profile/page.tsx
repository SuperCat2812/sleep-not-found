"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) {
    return <p>Завантаження профілю...</p>;
  }

  if (isError || !user) {
    return <p>Не вдалося завантажити профіль</p>;
  }

  return (
    <section className={css.page}>
      <div className={css.card}>
        <ProfileAvatar user={user} />
        <ProfileEditForm user={user} />
      </div>
    </section>
  );
}