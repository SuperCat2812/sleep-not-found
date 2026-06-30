export type Gender = 'boy' | 'girl' | 'unknown';

export interface Emotion {
  _id: string;
  title: string;
}

export interface EmotionsResponse {
  emotions: Emotion[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface EmotionsParams {
  page: number;
  limit: number;
}

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  name: string;
  email: string;
  babyGender: string;
  dueDate: string;
}
export interface UpdateOnboardingData {
  babyGender: string;
  dueDate: string;
}

export interface DiaryParams {
  page: number;
  limit: number;
  DiaryList?: string;
}
export interface Emotion {
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
export interface WeeksData {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: WeeksBabyToday;
  momHint: string;
}

export interface WeeksBabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
}

export interface BabyByWeek {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}

export interface MomByWeek {
  feelings: MomFeelings;
  comfortTips: MomComfortTips[];
}

interface MomFeelings {
  states: string[];
  sensationDescr: string;
}
type Tips = 'Харчування' | 'Активність' | 'Відпочинок та комфорт';
interface MomComfortTips {
  category: Tips;
  tip: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string;
  babyGender: string;
  theme: string;
}
