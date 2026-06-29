'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';

const DashboardClient = () => {
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    setIsDiaryModalOpen(true);
  };

  return (
    <>
      <TasksReminderCard />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        onDiaryClick={handleDiaryClick}
      />
      {isDiaryModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsDiaryModalOpen(false)} />
      )}
    </>
  );
};

export default DashboardClient;
