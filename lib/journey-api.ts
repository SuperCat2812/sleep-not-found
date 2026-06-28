import { BabyByWeek, MomByWeek, WeeksData } from "@/types/journeyTypes";
import { api } from "./api/api";

export const getWeeks = async (): Promise<WeeksData> => {
  const { data } = await api.get<WeeksData>("/weeks/greeting");
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
