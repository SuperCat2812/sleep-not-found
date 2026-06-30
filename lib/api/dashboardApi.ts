import { WeeksData } from '@/types/journeyTypes';
import { api } from './api';

export const getDashboardDataPublic = async (): Promise<WeeksData> => {
  const { data } = await api.get<WeeksData>('/weeks/greeting/public');
  return data;
};

export const getDashboardData = async (): Promise<WeeksData> => {
  const { data } = await api.get<WeeksData>('/weeks/greeting');
  return data;
};
