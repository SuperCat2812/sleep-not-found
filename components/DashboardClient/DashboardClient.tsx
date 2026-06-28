'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import { fetchTasks, updateTaskStatus, Task } from '@/lib/api/tasks';

const DashboardClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const queryClient = useQueryClient();

  const { data: tasksData } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(),
    enabled: isAuthenticated,
  });

  const { mutate: toggleTask } = useMutation({
    mutationFn: ({ taskId, isDone }: { taskId: string; isDone: boolean }) =>
      updateTaskStatus(taskId, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleAddTask = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    setIsModalOpen(true);
  };

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    // TODO: відкрити AddDiaryEntryModal коли буде готовий
  };

  const tasks = (tasksData ?? []).map((task: Task) => ({
    id: task._id,
    date: task.date,
    title: task.name,
    completed: task.isDone,
  }));

  return (
    <>
      <TasksReminderCard
        tasks={tasks}
        onToggle={id => {
          const task = (tasksData ?? []).find((t: Task) => t._id === id);
          if (task) toggleTask({ taskId: id, isDone: !task.isDone });
        }}
        onAddClick={handleAddTask}
      />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        onDiaryClick={handleDiaryClick}
      />
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default DashboardClient;
