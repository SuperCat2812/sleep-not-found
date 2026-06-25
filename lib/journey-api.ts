import { BabyByWeek, MomByWeek, WeeksData } from "@/types/journeyTypes";
import { api } from "./api";

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
