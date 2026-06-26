import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import css from "./Journey.module.css";
import { getWeekServer } from "@/lib/journey-api-server";
import { Toaster } from "react-hot-toast";

const Journey = async () => {
  const week = await getWeekServer();
  return (
    <div className={css.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <WeekSelector currentWeek={week.curWeekToPregnant} />
      {week && <JourneyDetails />}
    </div>
  );
};

export default Journey;
