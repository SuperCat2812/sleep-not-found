import { getDiary } from '@/lib/diary-api-server';
import DiaryClient from './DiaryClient';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Щоденник',
  description: 'Сторінка Щоденника',
};

const diaryPage = async () => {
  const page = 1;
  const limit = 10;

  const diarys = await getDiary({ page, limit });

  return <DiaryClient diarys={diarys} />;
};

export default diaryPage;
