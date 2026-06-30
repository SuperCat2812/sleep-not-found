import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getWeekServer } from '@/lib/api/serverApi';

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

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  return {
    title: `${week} Тиждень | Лелека`,
    description: `Детальне відстеження росту малюка на ${week} тижні вагітності`,
    openGraph: {
      title: `${week} Тиждень | Лелека`,
      description: `Детальне відстеження росту малюка на ${week} тижні вагітності`,
      url: `${baseUrl}/journey/${week}`,
      images: [
        {
          url: `${baseUrl}/leleka.png`, 
          width: 1200,
          height: 630,
          alt: `Тиждень ${week}`,
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
    <section>
      <GreetingBlock />
      <WeekSelector currentWeek={currentWeek.curWeekToPregnant} />
      <JourneyDetails currentWeek={currentWeek.curWeekToPregnant} />
    </section>
  );
};

export default Journey;
