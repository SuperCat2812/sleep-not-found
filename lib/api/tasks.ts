import { isAxiosError } from 'axios';
import { api } from './api';

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export async function fetchTasks(): Promise<TasksResponse> {
  const { data } = await api.get<TasksResponse>('/tasks');
  return data;
}

export async function createTask(body: {
  name: string;
  date: string;
}): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', body);
  return data;
}

export async function updateTaskStatus(taskId: string, isDone: boolean): Promise<void> {
  try {
    const { data } = await api.patch(`/tasks/status/${taskId}`, { isDone });
    console.log('response:', data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('error response:', error.response?.data);
      console.log('error details:', error.response?.data?.response);
    }
  }
}