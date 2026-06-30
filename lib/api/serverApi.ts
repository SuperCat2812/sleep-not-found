import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { api } from '@/app/api/api';
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

const refreshServerSession = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) {
    return;
  }

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const setCookie = res.headers['set-cookie'];
  if (!setCookie) {
    return;
  }

  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: Number(parsed['Max-Age']),
    };

    if (parsed.accessToken) {
      cookieStore.set('accessToken', parsed.accessToken, options);
    }
    if (parsed.refreshToken) {
      cookieStore.set('refreshToken', parsed.refreshToken, options);
    }
  }
};

export const checkServerSession = async (cookie: string) => {
  try {
    const res = await api.get('/auth/session', {
      headers: {
        Cookie: cookie,
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
  return retryWithRefresh(async () => {
    const cookieStore = await cookies();
    const { data } = await api.get<WeeksData>('/weeks/greeting', {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  });
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

const retryWithRefresh = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      try {
        await refreshServerSession();
        return await fn();
      } catch (refreshError) {
        throw error;
      }
    }
    throw error;
  }
};

export const getDiary = async ({ page, limit }: DiaryParams) => {
  return retryWithRefresh(async () => {
    const cookieStore = await cookies();
    const { data } = await api.get<DiaryResponse>('/diary', {
      params: { page, limit },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  });
};

export const getEmotions = async ({ page, limit }: EmotionsParams) => {
  return retryWithRefresh(async () => {
    const cookieStore = await cookies();
    const { data } = await api.get<EmotionsResponse>('/emotions', {
      params: { page, limit },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  });
};

export const getWeekServer = async (): Promise<WeeksData> => {
  return retryWithRefresh(async () => {
    const cookieStore = await cookies();
    const { data } = await api.get<WeeksData>('/weeks/greeting', {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  });
};

export const getWeekBabyByNumberServer = async (
  weekNumber: number
): Promise<BabyByWeek> => {
  return retryWithRefresh(async () => {
    const cookieStore = await cookies();

    const { data } = await api.get<BabyByWeek>(`/weeks/${weekNumber}/baby`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return data;
  });
};
