// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NewDiaryEntryObject = {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
