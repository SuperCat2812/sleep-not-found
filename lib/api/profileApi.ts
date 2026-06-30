import { api } from "./api";
import type { User } from "@/types/user";

export interface UpdateUserData {
  name: string;
  email: string;
  babyGender: string;
  dueDate: string;
}

export interface UpdateOnboardingData {
  babyGender: string;
  dueDate: string;
}

export const updateMe = async (userData: UpdateUserData): Promise<User> => {
  const { data } = await api.patch<User>("/users/current", userData);
  return data;
};

export const updateOnboarding = async (
  onboardingData: UpdateOnboardingData,
): Promise<User> => {
  const { data } = await api.patch<User>("/users/current", onboardingData);
  return data;
};

export const updateAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.patch<User>("/users/current/avatars", formData);
  return data;
};