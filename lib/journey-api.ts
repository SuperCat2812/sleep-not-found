import { BabyByWeek, MomByWeek, WeeksData } from "@/types/journeyTypes";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const getPublicWeeks = async (): Promise<WeeksData> => {
  const { data } = await api.get<WeeksData>("/weeks/greeting/public");
  return data;
};

export const getWeekBabyByNumber = async (weekNumber: number) => {
  const { data } = await api.get<BabyByWeek>(`/weeks/${weekNumber}/baby`);
  return data;
};
export const getWeekMomByNumber = async (weekNumber: number) => {
  const { data } = await api.get<MomByWeek>(`/weeks/${weekNumber}/mom`);
  return data;
};
