import { nanoid } from 'nanoid';

/**
 * Data Model Interfaces
 */
import { BaseEvent, Event, Events } from './interfaces';
import Logger from '../../common/logger';

const logger = Logger.getInstance({ name: __filename });

/**
 * In-Memory data store (mock MongoDB documents)
 * TODO: Store data in MongoDB
 */
const events: Events = {};

/**
 * Service Methods
 */
export const findAll = async (): Promise<Event[]> => Object.values(events);

export const find = async (id: string): Promise<Event> => events[id];

export const create = async (newEvent: BaseEvent): Promise<Event> => {
    const eventId: string = nanoid();

    // TODO: server side dates validation, must be greater or equal than today
    events[eventId] = {
        eventId,
        maxParticipants: 20,
        ...newEvent
    };

    return events[eventId];
};

export const update = async (id: string, itemUpdate: BaseEvent): Promise<Event | null> => {
    const item = await find(id);

    if (!item) {
        logger.warn(`Event [${id}] does not exist`);
        return null;
    }
    events[id] = { ...item, ...itemUpdate };

    return events[id];
};

export const remove = async (id: string): Promise<void> => {
    const item = await find(id);

    if (item) {
        delete events[id];
    }
};

/**
 * Populate In-Memory data store
 */
const initialEvents: BaseEvent[] = [
    {
        name: 'March Book Club',
        description: 'At Park Lafontaine from 2pm to 3pm',
        calendarType: 'dates',
        selected: ['2022-05-30'],
        example: true
    }
];

Promise.all(
    initialEvents.map(async (event: BaseEvent) => {
        await create(event);
    })
);
