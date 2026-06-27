"use client";

import { useAuthStore } from "@/lib/store/authStore";
import styles from "./TasksReminderCard.module.css";

type Task = {
  id: string;
  date: string;
  title: string;
  completed: boolean;
};

type TasksReminderCardProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onAddClick: () => void;
};

const TasksReminderCard = ({
  tasks,
  onToggle,
  onAddClick,
}: TasksReminderCardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <span className={styles.taskDate}>{task.date}</span>
              <div className={styles.taskRow}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                />
                <span
                  className={`${styles.taskText} ${task.completed ? styles.taskTextCompleted : ""}`}
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
