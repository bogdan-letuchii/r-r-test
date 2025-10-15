export interface WorkType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}

export interface Shift {
  id: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[] | string; // Может быть массивом или строкой
  priceWorker: number;
  customerFeedbacksCount: string | number; // API возвращает строку "17 отзывов"
  customerRating: number | null; // Может быть null
}

export interface Location {
  latitude: number;
  longitude: number;
}