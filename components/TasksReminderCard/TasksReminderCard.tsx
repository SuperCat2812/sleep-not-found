"use client";

type Task = {
  id: string;
  date: string;
  title: string;
  completed: boolean;
};

type TasksReminderCardProps = {
  tasks: Task[];
  isAuthorized: boolean;
  onToggle: (id: string) => void;
  onAddClick: () => void;
};

const TasksReminderCard = ({
  tasks,
  isAuthorized,
  onToggle,
  onAddClick,
}: TasksReminderCardProps) => {
  return (
    <div>
      <div>
        <h2>Важливі завдання</h2>
        <button onClick={onAddClick}>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Завдань поки немає</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.date}</span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksReminderCard;
