import { api } from './api';

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks');
  return data;
}

export async function createTask(body: {
  name: string;
  date: string;
}): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', body);
  return data;
}
