import { cookies } from 'next/headers';
import { api } from './api';
import { AxiosError } from 'axios';
// import { BabyByWeek, WeeksData } from '@/types/journeyTypes';
import {
  BabyByWeek,
  DiaryParams,
  DiaryResponse,
  EmotionsParams,
  EmotionsResponse,
  WeeksData,
} from '@/types/types';

export const checkServerSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('ERROR:', error.response?.status);
      console.log('ERROR:', error.response?.data);
    }
    throw error;
  }
};
export const getDashboardDataServer = async (): Promise<WeeksData> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<WeeksData>('/weeks/greeting', {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('DASHBOARD ERROR:', error.response?.status);
      console.log('DASHBOARD ERROR:', error.response?.data);
    }
    throw error;
  }
};

export const getDashboardDataPublicServer = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>('/weeks/greeting/public');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('DASHBOARD PUBLIC ERROR:', error.response?.status);
      console.log('DASHBOARD PUBLIC ERROR:', error.response?.data);
    }
    throw error;
  }
};

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

export const getEmotions = async ({ page, limit }: EmotionsParams) => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<EmotionsResponse>('/emotions', {
      params: { page, limit },
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

export const getWeekServer = async (): Promise<WeeksData> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<WeeksData>('/weeks/greeting', {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GET WEEK ERROR STATUS:', error.response?.status);
      console.log('GET WEEK ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const getWeekBabyByNumberServer = async (
  weekNumber: number
): Promise<BabyByWeek> => {
  try {
    const cookieStore = await cookies();

    const { data } = await api.get<BabyByWeek>(`/weeks/${weekNumber}/baby`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GET INFO ERROR STATUS:', error.response?.status);
      console.log('GET INFO ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};
