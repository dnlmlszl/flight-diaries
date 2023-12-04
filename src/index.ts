import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('Someone pinged here');
  res.send('Pong');
});

app.use('/api/v1/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
