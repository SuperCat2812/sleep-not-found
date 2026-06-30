'use client';

import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import Loader from '@/components/Loader/Loader';

import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const setUser = useAuthStore(state => state.setUser);

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getMe,

    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading || isFetching) {
    return (
      <section className={css.pageLoader}>
        <Loader />
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section className={css.page}>
        <p>Не вдалося завантажити профіль</p>
      </section>
    );
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
