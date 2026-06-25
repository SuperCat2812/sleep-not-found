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

const diaryPage = async () => {
  const page = 1;
  const limit = 10;

  const diarys = await getDiary({ page, limit });

  return <DiaryClient diarys={diarys} />;
};

export default diaryPage;
