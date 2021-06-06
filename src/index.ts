/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { createStream } from 'rotating-file-stream';

import EventsRoutes from './routes/eventsRoutes';
import ParticipantsRoutes from './routes/participantsRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

dotenv.config();

/**
 * App Variables
 */
const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '_');
const host: string = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || '4000');
const app = express(); // Creates Express app

/**
 *  App Configuration
 */

// Third-party Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// setup the request logger
app.use(
    morgan('common', {
        stream: createStream(`komeet_${date}.log`, {
            // create a rotating write stream
            interval: '1d', // rotate daily
            path: path.join(path.resolve(__dirname, '..'), 'logs')
        })
    })
);

// Routes Middlewares
app.use('/health', (_: Request, res: Response) => res.send('Server is running!'));
app.use('/api/events', EventsRoutes);
app.use('/api/participants', ParticipantsRoutes);

// Error Middlewares
app.use(errorHandler);
app.use(notFoundHandler); // Last one is a catch-all

const url = process.env.DATABASE_URL;

if (!url) {
    throw new Error('Database URL not specified');
}
/**
 * Connec to DB and start Server
 */
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            // eslint-disable-next-line
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
    });

mongoose.set('useFindAndModify', false);
