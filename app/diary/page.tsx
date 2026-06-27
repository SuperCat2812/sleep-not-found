import { getDiary } from "@/lib/diary";
import DiaryClient from "./diaryClient";
import { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const metadata: Metadata = {
  title: "Щоденник",
  description: "Странка Щоденника",
  openGraph: {
    title: "Щоденник",
    description: "Странка Щоденника",
    url: `${baseUrl}/diary`,
    images: [{ url: `${baseUrl}/leleka.png` }],
  },
};

const diaryPage = async () => {
  const page = 1;
  const limit = 10;

  const diarys = await getDiary({ page, limit });

  return <DiaryClient diarys={diarys} />;
};

export default diaryPage;
