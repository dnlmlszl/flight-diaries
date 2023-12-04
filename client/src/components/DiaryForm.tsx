import { useState } from 'react';
import diaryService from '../services/diaries';
import { Diary, DiaryFormEntry, Visibility, Weather } from '../types';
import axios, { AxiosError } from 'axios';

interface DiaryFormProps {
  setIsLoading: (isLoading: boolean) => void;
  setDiaries: (diaries: Diary[]) => void;
  diaries: Diary[];
  setNotify: (notify: string) => void;
  // setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryForm: React.FC<DiaryFormProps> = ({
  setIsLoading,
  setDiaries,
  diaries,
  setNotify,
}) => {
  const [formData, setFormData] = useState<DiaryFormEntry>({
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newDiary: DiaryFormEntry = {
        date: formData.date,
        weather: formData.weather,
        visibility: formData.visibility,
        comment: formData.comment,
      };
      if (
        !formData.date ||
        !formData.weather ||
        !formData.visibility ||
        !formData.comment
      ) {
        setNotify('All fields required');
        setIsLoading(false);
        return;
      }

      const addedEntry = await diaryService.addDiary(newDiary);

      setDiaries(diaries.concat(addedEntry));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          const errorMessage = axiosError.response.data;
          setNotify(`Backend error: ${errorMessage}`);
        } else {
          setNotify('An unknown error occured');
        }
      }
      const errorString = error as string;
      setNotify(errorString);
      setIsLoading(false);
    } finally {
      setFormData({
        date: '',
        visibility: '',
        weather: '',
        comment: '',
      });
      setIsLoading(false);
      setTimeout(() => {
        setNotify('');
      }, 3000);
    }
  };

  const weatherOptions = Object.values(Weather);
  const visibilityOptions = Object.values(Visibility);

  return (
    <section>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility:</label>
          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            required
          >
            <option>-</option>
            {visibilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="weather">Weather:</label>
          <select
            id="weather"
            value={formData.weather}
            name="weather"
            onChange={handleChange}
            required
          >
            <option>-</option>
            {weatherOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add entry</button>
      </form>
    </section>
  );
};

export default DiaryForm;
