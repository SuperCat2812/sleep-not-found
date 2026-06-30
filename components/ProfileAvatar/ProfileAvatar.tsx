'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateAvatar } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileAvatar.module.css';
import Image from 'next/image';
import { User } from '@/types/types';

interface ProfileAvatarProps {
  user: User;
}

const MAX_FILE_SIZE = 1024 * 1024;

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();
  const setUser = useAuthStore(state => state.setUser);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
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

    try {
      setIsUploading(true);

      const updatedUser = await updateAvatar(file);

      const mergedUser = {
        ...user,
        ...updatedUser,
      };

      setUser(mergedUser);
      queryClient.setQueryData(['currentUser'], mergedUser);

      toast.success('Фото профілю оновлено');
    } catch {
      toast.error('Не вдалося оновити фото');
    } finally {
      setIsUploading(false);
      input.value = '';
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.avatarBox}>
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            className={css.avatar}
            width={132}
            height={132}
          />
        ) : (
          <div className={css.placeholder}>
            {user.name?.charAt(0).toUpperCase() || '?'}
          </div>
        )}
      </div>

      <div className={css.info}>
        <h2 className={css.name}>{user.name}</h2>
        <p className={css.email}>{user.email}</p>

        <button
          type="button"
          className={css.uploadButton}
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading ? 'Завантаження...' : 'Завантажити нове фото'}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
