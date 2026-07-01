'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import styles from './TasksReminderCard.module.css';
import { fetchTasks, updateTaskStatus } from '@/lib/api/clientApi';
import { Task } from '@/types/types';

const TasksReminderCard = () => {
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

  const handleAddClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    setIsModalOpen(true);
  };

  const tasks = (tasksData?.tasks ?? []).map((task: Task) => ({
    id: task._id,
    date: task.date,
    title: task.name,
    completed: task.isDone,
  }));

  const formatDateKey = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayKey = formatDateKey(new Date());

  const todayTasks = tasks.filter(t => t.date === todayKey && !t.completed);

  const futureTasks = tasks.filter(t => {
    if (t.completed || t.date === todayKey) return false;

    const taskDate = new Date(t.date + 'T00:00:00');
    const today = new Date(todayKey + 'T00:00:00');

    return taskDate.getTime() > today.getTime();
  });

  const completedTasks = tasks.filter(t => t.completed);

  const renderTask = (task: (typeof tasks)[0]) => (
    <li key={task.id} className={styles.taskItem}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => {
          const original = tasksData?.tasks.find(t => t._id === task.id);
          if (original)
            toggleTask({ taskId: task.id, isDone: !original.isDone });
        }}
      />
      <div className={styles.taskContent}>
        <span className={styles.taskDate}>
          {new Date(task.date).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
          })}
        </span>
        <span
          className={`${styles.taskText} ${task.completed ? styles.taskTextCompleted : ''}`}
        >
          {task.title}
        </span>
      </div>
    </li>
  );

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Важливі завдання</h2>
          <button
            className={styles.addButton}
            onClick={handleAddClick}
            aria-label="Додати завдання"
          >
            <svg width="24" height="24">
              <use href="/images/sprite.svg#icon-plus" />
            </svg>
          </button>
        </div>
        {tasks.length === 0 ? (
          <p className={styles.placeholder}>Завдань поки немає</p>
        ) : (
          <ul className={styles.list}>
            {todayTasks.length > 0 && (
              <>
                <li className={styles.groupLabel}>Сьогодні:</li>
                {todayTasks.map(renderTask)}
              </>
            )}
            {futureTasks.length > 0 && (
              <>
                <li className={styles.groupLabel}>Найближчі завдання:</li>
                {futureTasks.map(renderTask)}
              </>
            )}
            {completedTasks.length > 0 && (
              <>
                <li className={styles.groupLabel}>
                  Виконані завдання за тиждень:
                </li>
                {completedTasks.map(renderTask)}
              </>
            )}
          </ul>
        )}
      </div>
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default TasksReminderCard;
