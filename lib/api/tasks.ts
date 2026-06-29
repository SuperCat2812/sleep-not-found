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
  await api.patch(`/tasks/status/${taskId}`, { isDone });
}