import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import { getWeekServer } from "@/lib/journey-api-server";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
const Journey = async () => {
  const week = await getWeekServer();

  return (
    <>
      <GreetingBlock name="" />
      <WeekSelector currentWeek={week.curWeekToPregnant} />
      {week && <JourneyDetails />}
    </>
  );
};

export default Journey;
