import { DiaryParams, DiaryResponse } from '@/types/diary-types';

import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import { api } from '@/lib/api/api';

export const getDiary = async ({ page, limit }: DiaryParams) => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<DiaryResponse>('/diary', {
      params: { page, limit },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('DIARY ERROR STATUS:', error.response?.status);
      console.log('DIARY ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};
