import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

import Event, { IEvent } from '../models/eventModel';
import Logger from '../common/logger';

const logger = Logger.getInstance({ name: __filename });

export const getEvents = async (_req: Request, res: Response): Promise<void> => {
    try {
        const events: IEvent[] = await Event.find();
        res.status(200).send(events);
    } catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // populate the participants field with username and availabilities
        const event: IEvent | null = await Event.findById(id).populate('participants', 'username availabilities');

        if (event) {
            res.status(200).send(event);
        } else {
            res.status(404).send({ message: `Event [${id}] not found` });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = nanoid();
        const eventData = req.body;
        // TODO: server side dates validation, must be greater or equal than today
        logger.debug({ eventData }, 'data');
        const newEvent: IEvent = new Event({ _id: id, ...eventData });
        logger.debug('saving new event');
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
