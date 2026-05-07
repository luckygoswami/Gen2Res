import express from 'express';
import { authRouter } from '#routes/auth.route.js';
import { interviewRouter } from '#routes/interview.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { FRONTEND_URL } from '#config/variables.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

app.get('/', (req, res) => {
  res.send({ message: 'ok' });
});

export { app };
