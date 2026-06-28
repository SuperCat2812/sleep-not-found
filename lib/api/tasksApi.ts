import { api } from "./api";

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

export const getTasks = async (page = 1, limit = 100): Promise<TasksResponse> => {
  const { data } = await api.get<TasksResponse>("/tasks", {
    params: { page, limit, sortOrder: "asc" },
  });
  return data;
};

export const updateTaskStatus = async (taskId: string, isDone: boolean): Promise<void> => {
  await api.patch(`/tasks/status/${taskId}`, { isDone });
};

export const createTask = async (name: string, date: string): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", { name, date });
  return data;
};