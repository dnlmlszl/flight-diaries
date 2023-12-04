import { Diary } from '../types';

interface DiaryListProps {
  diary: Diary;
}

const DiaryList: React.FC<DiaryListProps> = ({ diary }) => {
  return (
    <article>
      <p>{diary.date}: </p>
      <p>Daily weather conditions: {diary.weather}, </p>
      <p>Visibility: {diary.visibility}</p>
    </article>
  );
};

export default DiaryList;
