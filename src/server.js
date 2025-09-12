import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

    app.get('/contacts', async (req, res, next) => {
        try {
            const contacts = await getAllContacts();
            res.status(200).json({
                status: 200,
                message: 'Successfully found contacts!',
                data: contacts,
            });
        } catch (err) {
            next(err);
        }
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);
            if (!contact) {
                res.status(404).json({ message: 'Contact not found' });
                return;
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (err) {
            next(err);
        }
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