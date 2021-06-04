import { nanoid } from 'nanoid';
import crypto from 'crypto';

import { BaseParticipant, EventParticipants, Participant, Participants } from './interfaces';
import Logger from '../../common/logger';

const logger = Logger.getInstance({ name: __filename });

/**
 * In-Memory data store (mock MongoDB documents)
 * TODO: Store data in MongoDB
 */
const eventParticipants: EventParticipants = {};

// Helpers
const getHash = async (message: string): Promise<string> => {
    const hash = crypto.createHash('sha256').update(message).digest('base64');
    return hash;
};

/**
 * Service Methods
 */
export const getEventParticipants = async (eventId: string): Promise<Participants> => {
    let participants = {};
    if (eventId in eventParticipants) {
        participants = eventParticipants[eventId];
    }
    return participants;
};

export const validatePassword = async (participant: Participant, password = ''): Promise<boolean> => {
    const hashedPassword = await getHash(password);
    return participant.password === hashedPassword;
};

export const create = async ({ username, password = '', eventId }: BaseParticipant): Promise<Participant> => {
    logger.info(`Creating new participant [${username}] for event [${eventId}]`);
    const participantId: string = nanoid();
    const hashedPassword = await getHash(password);
    const newParticipant = {
        participantId,
        eventId,
        username,
        availabilities: [],
        password: hashedPassword
    };
    eventParticipants[eventId] = {};
    eventParticipants[eventId][username] = newParticipant;
    return newParticipant;
};
