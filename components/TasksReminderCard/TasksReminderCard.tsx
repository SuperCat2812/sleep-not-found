'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchTasks, updateTaskStatus, Task } from '@/lib/api/tasks';
import styles from './TasksReminderCard.module.css';

type TasksReminderCardProps = {
  onAddClick: () => void;
};

const TasksReminderCard = ({ onAddClick }: TasksReminderCardProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();
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

  const tasks = (tasksData?.tasks ?? []).map((task: Task) => ({
    id: task._id,
    date: task.date,
    title: task.name,
    completed: task.isDone,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>
        <button
          className={styles.addButton}
          onClick={onAddClick}
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
              <span className={styles.taskDate}>{task.date}</span>
              <div className={styles.taskRow}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => {
                    const original = tasksData?.tasks.find(
                      t => t._id === task.id
                    );
                    if (original)
                      toggleTask({ taskId: task.id, isDone: !original.isDone });
                  }}
                />
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
  );
};

export default TasksReminderCard;
