'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import { fetchTasks, Task } from '@/lib/api/tasks';

const DashboardClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasksData } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const tasks: Task[] = Array.isArray(tasksData)
    ? tasksData
    : ((tasksData as any)?.tasks ?? []);

  const mappedTasks = tasks.map(task => ({
    id: task._id,
    title: task.name,
    date: task.date,
    completed: task.isDone,
  }));

  return (
    <>
      <TasksReminderCard
        tasks={mappedTasks}
        isAuthorized={true}
        onToggle={() => {}}
        onAddClick={() => setIsModalOpen(true)}
      />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        isAuthorized={false}
        onDiaryClick={() => {}}
      />

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default DashboardClient;
