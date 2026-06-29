'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchTasks, updateTaskStatus, Task } from '@/lib/api/tasks';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import styles from './TasksReminderCard.module.css';

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
            {tasks.map(task => (
              <li key={task.id} className={styles.taskItem}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => {
                    console.log('task.id:', task.id);
                    console.log('tasksData?.tasks:', tasksData?.tasks);
                    const original = tasksData?.tasks.find(
                      t => t._id === task.id
                    );
                    console.log('original:', original);
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
            ))}
          </ul>
        )}
      </div>
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default TasksReminderCard;
