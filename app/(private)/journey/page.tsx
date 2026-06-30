import { getWeekServer } from '@/lib/api/serverApi';
import { redirect } from 'next/navigation';

export const page = async () => {
  const week = await getWeekServer();
  return redirect(`/journey/${week.curWeekToPregnant}`);
};

export default page;
