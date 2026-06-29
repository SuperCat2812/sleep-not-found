import { User } from "@/types/user";
import { api } from "./api";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const register = async (userData: RegisterUserData): Promise<User> => {
  await api.post<User>("/auth/register", userData);
  const user = await getMe();
  return user;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/current");
  return data;
};

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  name: string;
  email: string;
  babyGender: string;
  dueDate: string;
}

export const updateMe = async (userData: UpdateUserData): Promise<User> => {
  const { data } = await api.patch<User>("/users/current", userData);
  return data;
};

export interface UpdateOnboardingData {
  babyGender: string;
  dueDate: string;
}

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

export const login = async (loginData: LoginUserData): Promise<User> => {
  await api.post<User>("/auth/login", loginData);
  const user = await getMe();
  return user;
};