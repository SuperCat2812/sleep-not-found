import { api } from '@/lib/api/api';
import { DiaryNote } from '@/types/diary-types';
import { AxiosError } from 'axios';

export const deleteDiary = async (noteID: string) => {
  try {
    const { data } = await api.delete<DiaryNote>(`/diary/${noteID}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('DIARY ERROR STATUS:', error.response?.status);
      console.log('DIARY ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};
