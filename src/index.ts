/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';

import EventsRouter from './events/routes';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

dotenv.config();

/**
 * App Variables
 */
const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '_');
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express(); // Creates Express app

/**
 *  App Configuration
 */

// Third-party Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));

// setup the logger
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
app.use('/api/events', EventsRouter);

// Error Middlewares
app.use(errorHandler);
app.use(notFoundHandler); // Last one is a catch-all

/**
 * Server Activation
 */
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server is running on port ${port}`);
});
