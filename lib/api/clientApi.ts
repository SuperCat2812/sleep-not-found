import { User } from '@/types/user';
import { api } from './api';
import {
  BabyByWeek,
  DiaryNote,
  LoginUserData,
  MomByWeek,
  RegisterUserData,
  Task,
  TasksResponse,
  UpdateOnboardingData,
  UpdateUserData,
  WeeksData,
} from '@/types/types';
import { AxiosError } from 'axios';

export const register = async (userData: RegisterUserData): Promise<User> => {
  try {
    await api.post<User>('/auth/register', userData);
    const user = await getMe();
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('REGISTRATION ERROR STATUS:', error.response?.status);
      console.log('REGISTRATION ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('/users/current');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GETME ERROR STATUS:', error.response?.status);
      console.log('GETME ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const updateMe = async (userData: UpdateUserData): Promise<User> => {
  try {
    const { data } = await api.patch<User>('/users/current', userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('UPDATE ERROR STATUS:', error.response?.status);
      console.log('UPDATE ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const updateOnboarding = async (
  onboardingData: UpdateOnboardingData
): Promise<User> => {
  try {
    const { data } = await api.patch<User>('/users/current', onboardingData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('ONBOARDING ERROR STATUS:', error.response?.status);
      console.log('ONBOARDING ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const updateAvatar = async (file: File): Promise<User> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await api.patch<User>('/users/current/avatars', formData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('AVATAR ERROR STATUS:', error.response?.status);
      console.log('AVATAR ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const login = async (loginData: LoginUserData): Promise<User> => {
  try {
    await api.post<User>('/auth/login', loginData);
    const user = await getMe();
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('LOGIN ERROR STATUS:', error.response?.status);
      console.log('LOGIN ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('LOGOUT ERROR STATUS:', error.response?.status);
      console.log('LOGOUT ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const { data } = await api.get('/auth/session');
    return data.success;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('CHECKSESSION ERROR STATUS:', error.response?.status);
      console.log('CHECKSESSION ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const getDashboardDataPublic = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>('/weeks/greeting/public');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('DASHBOARD ERROR STATUS:', error.response?.status);
      console.log('DASHBOARD ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const getDashboardData = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>('/weeks/greeting');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GETDASHBOARDDATA ERROR STATUS:', error.response?.status);
      console.log('GETDASHBOARDDATA ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const deleteDiary = async (noteID: string) => {
  try {
    const { data } = await api.delete<DiaryNote>(`/diary/${noteID}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('DELETEDIARY ERROR STATUS:', error.response?.status);
      console.log('DELETEDIARY ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const getWeeks = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>('/weeks/greeting');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GETWEEKS ERROR STATUS:', error.response?.status);
      console.log('GETWEEKS ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const getWeekBabyByNumber = async (weekNumber: number) => {
  try {
    const { data } = await api.get<BabyByWeek>(`/weeks/${weekNumber}/baby`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GETWEEKBABY ERROR STATUS:', error.response?.status);
      console.log('GETWEEKBABY ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};
export const getWeekMomByNumber = async (weekNumber: number) => {
  try {
    const { data } = await api.get<MomByWeek>(`/weeks/${weekNumber}/mom`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('GETWEEKMOM ERROR STATUS:', error.response?.status);
      console.log('GETWEEKMOM ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const fetchTasks = async (): Promise<TasksResponse> => {
  try {
    const { data } = await api.get<TasksResponse>('/tasks', {
      params: { limit: 100 },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('FETCHTASKS ERROR STATUS:', error.response?.status);
      console.log('FETCHTASKS ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const createTask = async (body: {
  name: string;
  date: string;
}): Promise<Task> => {
  try {
    const { data } = await api.post<Task>('/tasks', body);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('CREATETASK ERROR STATUS:', error.response?.status);
      console.log('CREATETASK ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};

export const updateTaskStatus = async (
  taskId: string,
  isDone: boolean
): Promise<void> => {
  try {
    await api.patch(`/tasks/status/${taskId}`, { isDone });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('UPDATE TASK ERROR STATUS:', error.response?.status);
      console.log('UPDATE TASK ERROR DATA:', error.response?.data);
    }
    throw error;
  }
};
