import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { getDiary } from "@/lib/diary";
import { Metadata } from "next";
interface DiaryDetailsProps {
  params: Promise<{ entryId: string }>;
}
export const generateMetadata = async ({
  params,
}: DiaryDetailsProps): Promise<Metadata> => {
  const { entryId } = await params;
  return {
    title: "Щоденник",
    description: "Сторінка Щоденника",
    openGraph: {
      title: "Щоденник",
      description: "Сторінка Щоденника",
      url: `https://sleep-not-found-dev.vercel.app/diary/${entryId}`,
      images: [{ url: "/leleka.png" }],
    },
  };
};

const DiaryDetails = async ({ params }: DiaryDetailsProps) => {
  const { entryId } = await params;
  const diarys = await getDiary({ page: 1, limit: 10 });
  const diary = diarys.diaryNotes.find((diary) => diary._id === entryId);
  console.log(diary);
  if (!diary) return <p>Запис не знайдено</p>;
  return <DiaryEntryDetails diary={diary} />;
};

export default DiaryDetails;
