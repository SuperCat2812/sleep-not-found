import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import { getPublicWeeks } from "@/lib/journey-api";

const Page = async () => {
  const dataPublic = await getPublicWeeks();

  return (
    <>
      <GreetingBlock />
      <WeekSelector currentWeek={10} />
      <JourneyDetails />
    </>
  );
};

export default Page;
