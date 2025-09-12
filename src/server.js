import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar';

dotenv.config();

export const setupServer = () => {
    const app = express();
    const PORT = Number(getEnvVar('PORT', '3000'));

    app.use(express.json());

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

      app.get('/', (req, res) => {
        res.json({ message: 'Server is working' });
    });

    // обробляємо запити до неіснуючих  маршрутів
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    });
});

    // обробляємо помилки
 app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
