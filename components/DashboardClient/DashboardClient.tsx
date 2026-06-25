"use client";

import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";

const DashboardClient = () => {
  return (
    <>
      <TasksReminderCard
        tasks={[]}
        isAuthorized={false}
        onToggle={() => {}}
        onAddClick={() => {}}
      />
      <FeelingCheckCard
        recommendation="Занотуйте незвичні відчуття у тілі."
        isAuthorized={false}
        onDiaryClick={() => {}}
      />
    </>
  );
};

export default DashboardClient;
