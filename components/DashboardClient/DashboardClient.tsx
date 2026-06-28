'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';

const DashboardClient = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleAddTask = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    // TODO: відкрити AddTaskModal коли буде готовий
  };

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    // TODO: відкрити AddDiaryEntryModal коли буде готовий
  };

  return (
    <>
      <TasksReminderCard
        tasks={[]}
        onToggle={() => {}}
        onAddClick={handleAddTask}
      />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        onDiaryClick={handleDiaryClick}
      />
    </>
  );
};

export default DashboardClient;
