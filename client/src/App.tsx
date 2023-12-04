import { useEffect, useState } from 'react';
import { Diary } from './types';
import diaryService from './services/diaries';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import Notify from './components/Notify';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState('');

  useEffect(() => {
    const fetchDiariesList = async () => {
      setIsLoading(true);
      try {
        const diaries = await diaryService.getAll();
        setDiaries(diaries);
      } catch (error) {
        const errorString = error as string;
        setNotify(errorString);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setNotify('');
        }, 3000);
      }
    };

    void fetchDiariesList();
  }, []);

  console.log(diaries);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Flight diaries</h1>
      <Notify notify={notify} />
      <DiaryForm
        setIsLoading={setIsLoading}
        setDiaries={setDiaries}
        diaries={diaries}
        setNotify={setNotify}
      />
      <section>
        <h2>Diary entries</h2>
        {diaries.map((diary) => (
          <DiaryList key={diary.id} diary={diary} />
        ))}
      </section>
    </>
  );
}

export default App;
