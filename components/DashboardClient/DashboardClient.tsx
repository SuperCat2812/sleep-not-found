'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';

const DashboardClient = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleAddTask = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    setIsTaskModalOpen(true);
  };

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    setIsDiaryModalOpen(true);
  };

  return (
    <>
      <TasksReminderCard onAddClick={handleAddTask} />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        onDiaryClick={handleDiaryClick}
      />
      {isTaskModalOpen && (
        <AddTaskModal onClose={() => setIsTaskModalOpen(false)} />
      )}
      {isDiaryModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsDiaryModalOpen(false)} />
      )}
    </>
  );
};

export default DashboardClient;
