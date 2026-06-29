export interface DiaryParams {
  page: number;
  limit: number;
  DiaryList?: string;
}
interface Emotion {
  _id: string;
  title: string;
}
export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  emotions: Emotion[];
  description: string;
}
export interface DiaryResponse {
  diaryNotes: DiaryNote[];
  totalCount: number;
  totalPages: number;
  page: number;
}
