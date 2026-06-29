import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { WeeksData } from "@/types/journeyTypes";
import { api } from "@/app/api/api";

export const getDashboardDataServer = async (): Promise<WeeksData> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<WeeksData>("/weeks/greeting", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("DASHBOARD ERROR:", error.response?.status);
    }
    throw error;
  }
};

export const getDashboardDataPublicServer = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>("/weeks/greeting/public");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("DASHBOARD PUBLIC ERROR:", error.response?.status);
    }
    throw error;
  }
};