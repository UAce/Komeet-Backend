import express, { Request, Response } from 'express';

import * as EventSvc from './services';
import { BaseEvent, Event } from './interfaces';

const Router = express.Router();

/**
 * Get all events
 * GET events
 */
Router.get('/', async (_req: Request, res: Response) => {
    try {
        const events: Event[] = await EventSvc.findAll();

        res.status(200).send(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/**
 * Get example event
 * GET events/:id
 */
Router.get(
    '/example',
    async (_req: Request, res: Response): Promise<any> => {
        try {
            const events: Event[] = await EventSvc.findAll();
            const exampleEvent = events.find(event => {
                console.log(event);
                return event.example;
            });
            if (exampleEvent) {
                return res.status(200).send(exampleEvent);
            }

            return res.status(404).send(`Example event not found`);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
);

/**
 * Get event by Id
 * GET events/:id
 */
Router.get(
    '/:id',
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;

        try {
            const event: Event = await EventSvc.find(id);

            if (event) {
                return res.status(200).send(event);
            }

            return res.status(404).send(`event [${id}] not found`);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
);

/**
 * Create event
 * POST events
 */
Router.post(
    '/',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const event: BaseEvent = req.body;

            const newEvent = await EventSvc.create(event);

            res.status(201).json(newEvent);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
);

/**
 * Update event
 * PUT events/:id
 */
Router.put(
    '/:id',
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;

        try {
            const eventUpdate: Event = req.body;

            const existingEvent: Event = await EventSvc.find(id);

            if (existingEvent) {
                const updatedEvent = await EventSvc.update(id, eventUpdate);
                return res.status(200).json(updatedEvent);
            }

            const newEvent = await EventSvc.create(eventUpdate);

            return res.status(201).json(newEvent);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
);

/**
 * Delete event
 * DELETE events/:id
 */
Router.delete(
    '/:id',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await EventSvc.remove(id);

            res.sendStatus(204);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
);

export default Router;
