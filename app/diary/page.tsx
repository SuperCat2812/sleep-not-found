import { getDiary } from "@/lib/diary";
import DiaryClient from "./diaryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Щоденник",
  description: "Странка Щоденника",
  openGraph: {
    title: "Щоденник",
    description: "Странка Щоденника",
    url: `${process.env.NEXT_PUBLIC_API_URL}/diary`,
    images: [{ url: `${process.env.NEXT_PUBLIC_API_URL}/leleka.png` }],
  },
};

const diaryPage = async () => {
  const page = 1;
  const limit = 10;

  const diarys = await getDiary({ page, limit });

  return <DiaryClient diarys={diarys} />;
};

export default diaryPage;
