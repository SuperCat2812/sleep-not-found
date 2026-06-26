import { User } from "@/types/user";
import { api } from "./api";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const register = async (userData: RegisterUserData): Promise<User> => {
  await api.post("/auth/register", userData);
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

export const login = async (loginData: LoginUserData): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", loginData);
  return data;
};
