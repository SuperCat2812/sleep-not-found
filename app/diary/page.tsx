import { getDiary } from "@/lib/diary";
import DiaryClient from "./diaryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Щоденник",
  description: "Странка Щоденника",
  openGraph: {
    title: "Щоденник",
    description: "Странка Щоденника",
    url: "https://sleep-not-found-dev.vercel.app/diary",
    images: [{ url: "/leleka.png" }],
  },
};
interface diaryPageProps {
  username: string;
}
const diaryPage = async ({ username }: diaryPageProps) => {
  const page = 1;
  const limit = 10;

  const diarys = await getDiary({ page, limit });

  return (
    <>
      <h2>{`Доброго ранку, ${username}!`}</h2>
      <DiaryClient diarys={diarys} />;
    </>
  );
};

export default diaryPage;
