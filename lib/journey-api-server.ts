import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { BabyByWeek, WeeksData } from "@/types/journeyTypes";
import { api } from "@/app/api/api";

export const getWeekServer = async (): Promise<WeeksData> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<WeeksData>("/weeks/greeting", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("GET WEEK ERROR STATUS:", error.response?.status);
      console.log("GET WEEK ERROR DATA:", error.response?.data);
    }
    throw error;
  }
};

export const getWeekBabyByNumberServer = async (
  weekNumber: number,
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
      console.log("GET INFO ERROR STATUS:", error.response?.status);
      console.log("GET INFO ERROR DATA:", error.response?.data);
    }
    throw error;
  }
};

export const getWeekPublicServer = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>("/weeks/greeting/public");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("GET PUBLIC WEEK ERROR STATUS:", error.response?.status);
      console.log("GET PUBLIC WEEK ERROR DATA:", error.response?.data);
    }
    throw error;
  }
};