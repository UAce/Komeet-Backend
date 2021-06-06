import { Request, Response } from 'express';

import Events, { IEvent } from '../models/eventsModel';
import Participants, { IParticipant } from '../models/participantsModel';
import { validatePassword, getHash } from '../common/utils';
import Logger from '../common/logger';

const logger = Logger.getInstance({ name: __filename });

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const participantData = req.body;
        const { username, password, eventId } = participantData;

        const event: IEvent | null = await Events.findById(eventId);
        if (!event) {
            res.status(404).send({ message: `Event [${eventId}] not found` });
            return;
        }

        let participant: IParticipant | null = await Participants.findOne({ username, eventId });
        if (participant) {
            logger.debug(`Existing participant [${username}] for event [${eventId}]`);

            if (!(await validatePassword(participant.password, password))) {
                res.status(401).send({ message: 'Invalid or wrong password' });
                return;
            }
        } else {
            logger.debug(`Creating new participant [${username}] for event [${eventId}]`);

            const hashedPassword = await getHash(password);
            participant = new Participants({ ...participantData, password: hashedPassword });
            logger.debug('saving new participants');
            await participant.save();

            // Push participant ref to event and save
            event.participants.push(participant);
            await event.save();
        }

        const { username: name, availabilities: avail } = participant;
        res.status(200).send({ username: name, availabilities: avail });
    } catch (error) {
        logger.error({ error }, 'Failed to sign in');
        res.status(500).send(error.message);
    }
};
