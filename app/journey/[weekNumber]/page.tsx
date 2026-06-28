import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import {
  getWeekBabyByNumberServer,
  getWeekServer,
} from '@/lib/journey-api-server';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ weekNumber: string }>;
}): Promise<Metadata> => {
  const { weekNumber } = await params;
  const week = Number(weekNumber);
  if (!week || week < 1 || week > 42) {
    return { title: 'Сторінку не знайдено' };
  }
  const data = await getWeekBabyByNumberServer(week);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const description = data
    ? `Детальне відстеження росту малюка. ${data.analogy}. ${data.description}`
    : `Детальне відстеження росту малюка на ${week} тижні`;

  return {
    title: `${week} Тиждень | Лелека`,
    description,

    openGraph: {
      title: `${week} Тиждень | Лелека`,
      description,
      url: `${baseUrl}/journey/${week}`,
      images: [
        {
          url: data?.image
            ? `${baseUrl}/week/baby?${data.image}`
            : `${baseUrl}/leleka.png }`,
          width: 1200,
          height: 630,
          alt: `Week ${week} baby`,
        },
      ],
    },
  };
};

const Journey = async ({
  params,
}: {
  params: Promise<{ weekNumber: string }>;
}) => {
  const { weekNumber } = await params;
  const week = Number(weekNumber);
  if (!week || week < 1 || week > 42) {
    redirect('/not-found');
  }
  const currentWeek = await getWeekServer();

  return (
    <>
      <GreetingBlock name="" />
      <WeekSelector currentWeek={currentWeek.curWeekToPregnant} />
      {<JourneyDetails currentWeek={currentWeek.curWeekToPregnant} />}
    </>
  );
};

export default Journey;
