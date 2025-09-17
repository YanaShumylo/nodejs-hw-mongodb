import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

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

    // додаємо роутер до арр
    app.use('/contacts', contactsRouter);

    // обробляємо запити до неіснуючих  маршрутів
    app.use(notFoundHandler);

    // обробляємо помилки
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
