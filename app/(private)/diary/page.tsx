import { getDiary } from '@/lib/diary-api-server';

import { Metadata } from 'next';
import DiaryClient from './DiaryClient';
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
