"use client";

import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";

const DashboardClient = () => {
  return (
    <>
      <TasksReminderCard tasks={[]} onToggle={() => {}} onAddClick={() => {}} />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        onDiaryClick={() => {}}
      />
    </>
  );
};

export default DashboardClient;
