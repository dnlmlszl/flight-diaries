import { DiaryFormEntry } from './types';

export const isDiaryFormEntry = (data: any): data is DiaryFormEntry => {
  return (
    typeof data.date === 'string' &&
    typeof data.weather === 'string' &&
    typeof data.visibility === 'string' &&
    typeof data.comment === 'string'
  );
};
