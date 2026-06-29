import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import { api } from '@/app/api/api';

export interface Emotion {
  _id: string;
  title: string;
}

export interface EmotionsResponse {
  emotions: Emotion[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

export const getEmotions = async () => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<EmotionsResponse>('/emotions', {
      params: { limit: 100 },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('EMOTIONS ERROR STATUS:', error.response?.status);
      console.log('EMOTIONS ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};
