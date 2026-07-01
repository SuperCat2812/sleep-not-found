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
  User,
  WeeksData,
} from '@/types/types';
import { AxiosError } from 'axios';

export const register = async (userData: RegisterUserData): Promise<User> => {
  try {
    await api.post<User>('/auth/register', userData);
    const user = await getMe();
    return user;
  } catch (error) {
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('/users/current');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        await api.get('/auth/session');

        const { data } = await api.get<User>('/users/current');
        return data;
      }
    }

    throw error;
  }
};

export const updateMe = async (userData: UpdateUserData): Promise<User> => {
  try {
    const { data } = await api.patch<User>('/users/current', userData);
    return data;
  } catch (error) {
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
    throw error;
  }
};

export const login = async (loginData: LoginUserData): Promise<User> => {
  try {
    await api.post<User>('/auth/login', loginData);
    const user = await getMe();
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const { data } = await api.get('/auth/session');
    return data.success;
  } catch (error) {
    throw error;
  }
};

export const getDashboardDataPublic = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>('/weeks/greeting/public');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardData = async (): Promise<WeeksData> => {
  try {
    const { data } = await api.get<WeeksData>('/weeks/greeting');
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteDiary = async (noteID: string) => {
  try {
    const { data } = await api.delete<DiaryNote>(`/diary/${noteID}`);
    return data;
  } catch (error) {
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
    throw error;
  }
};
export const getWeekMomByNumber = async (weekNumber: number) => {
  try {
    const { data } = await api.get<MomByWeek>(`/weeks/${weekNumber}/mom`);
    return data;
  } catch (error) {
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
    throw error;
  }
};
export const checkServerSession = async (cookie: string) => {
  try {
    const res = await api.get('/auth/session', {
      headers: {
        Cookie: cookie,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};
