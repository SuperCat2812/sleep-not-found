import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { User } from "@/types/user";
import { WeeksData } from "@/types/journeyTypes";
import { api } from "@/app/api/api";

export const getMeServer = async (): Promise<User> => {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<User>("/users/current", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("GET ME ERROR STATUS:", error.response?.status);
      console.log("GET ME ERROR DATA:", error.response?.data);
    }
    throw error;
  }
};

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
