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
type Tips = "Харчування" | "Активність" | "Відпочинок та комфорт";
interface MomComfortTips {
  category: Tips;
  tip: string;
}
