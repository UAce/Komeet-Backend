import { nanoid } from 'nanoid';

/**
 * Data Model Interfaces
 */
import { BaseEvent, Event, Events } from './interfaces';
import Logger from '../common/logger';

const logger = Logger.getInstance({ name: __filename });

/**
 * In-Memory Store
 * TODO: Store in MongoDB
 */
const items: Events = {};

/**
 * Service Methods
 */
export const findAll = async (): Promise<Event[]> => Object.values(items);

export const find = async (id: string): Promise<Event> => items[id];

export const create = async (newEvent: BaseEvent): Promise<Event> => {
    const id: string = nanoid();

    items[id] = {
        id,
        startTime: '9:00',
        endTime: '12:00',
        timezone: 'America/Montreal',
        maxParticipants: 20,
        ...newEvent
    };

    return items[id];
};

export const update = async (id: string, itemUpdate: BaseEvent): Promise<Event | null> => {
    const item = await find(id);

    if (!item) {
        logger.warn(`Event [${id}] does not exist`);
        return null;
    }
    items[id] = { ...item, ...itemUpdate };

    return items[id];
};

export const remove = async (id: string): Promise<void> => {
    const item = await find(id);

    if (item) {
        delete items[id];
    }
};

/**
 * Populate In-Memory Store
 */
const initialEvents: BaseEvent[] = [
    {
        name: 'March Book Club',
        description: 'At Park Lafontaine from 2pm to 3pm',
        calendarType: 'dates',
        selected: ['2022-05-30']
    }
];

Promise.all(
    initialEvents.map(async (event: BaseEvent) => {
        await create(event);
    })
);
