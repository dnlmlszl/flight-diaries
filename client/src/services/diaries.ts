import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diary, DiaryFormEntry } from '../types';

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const addDiary = async (newDiary: DiaryFormEntry) => {
  const { data } = await axios.post(`${apiBaseUrl}/diaries`, newDiary);

  return data;
};

export default { getAll, addDiary };
