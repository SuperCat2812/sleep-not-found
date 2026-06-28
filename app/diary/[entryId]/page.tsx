import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { getDiary } from '@/lib/diary-api-server';
import { Metadata } from 'next';
interface DiaryDetailsProps {
  params: Promise<{ entryId: string }>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const generateMetadata = async ({
  params,
}: DiaryDetailsProps): Promise<Metadata> => {
  const { entryId } = await params;
  const diarys = await getDiary({ page: 1, limit: 10 });
  const diary = diarys.diaryNotes.find(diary => diary._id === entryId);
  return {
    title: diary?.title,
    description: diary?.description,
    openGraph: {
      title: diary?.title,
      description: diary?.description,
      url: `${baseUrl}/${entryId}`,
      images: [{ url: `${baseUrl}/leleka.png` }],
    },
  };
};

const DiaryDetails = async ({ params }: DiaryDetailsProps) => {
  const { entryId } = await params;
  const diarys = await getDiary({ page: 1, limit: 10 });
  const diary = diarys.diaryNotes.find(diary => diary._id === entryId);
  console.log(diary);
  if (!diary) return <p>Запис не знайдено</p>;
  return <DiaryEntryDetails diary={diary} />;
};

export default DiaryDetails;
