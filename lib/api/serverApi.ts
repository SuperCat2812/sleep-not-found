import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import {
  BabyByWeek,
  DiaryParams,
  DiaryResponse,
  EmotionsParams,
  EmotionsResponse,
  WeeksData,
} from '@/types/types';

export const refreshServerSession = async (cookieHeader?: string) => {
  const cookieStore = await cookies();

  const cookie = cookieHeader ?? cookieStore.toString();

  if (!cookie.includes('refreshToken=')) {
    return null;
  }

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookie,
    },
  });

  return res;
};

export const getDashboardDataServer = async (): Promise<WeeksData> => {
  const cookieStore = await cookies();
  const { data } = await api.get<WeeksData>('/weeks/greeting', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getDashboardDataPublicServer = async (): Promise<WeeksData> => {
  const { data } = await api.get<WeeksData>('/weeks/greeting/public');
  return data;
};

export const getDiary = async ({ page, limit }: DiaryParams) => {
  const cookieStore = await cookies();
  const { data } = await api.get<DiaryResponse>('/diary', {
    params: { page, limit },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getEmotions = async ({ page, limit }: EmotionsParams) => {
  const cookieStore = await cookies();
  const { data } = await api.get<EmotionsResponse>('/emotions', {
    params: { page, limit },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getWeekServer = async (): Promise<WeeksData> => {
  const cookieStore = await cookies();
  const { data } = await api.get<WeeksData>('/weeks/greeting', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getWeekBabyByNumberServer = async (
  weekNumber: number
): Promise<BabyByWeek> => {
  const cookieStore = await cookies();

  const { data } = await api.get<BabyByWeek>(`/weeks/${weekNumber}/baby`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
