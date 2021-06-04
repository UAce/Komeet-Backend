import express, { Request, Response } from 'express';

import * as EventSvc from '../events/services';
import * as SigninSvc from './services';
import { Event } from '../events/interfaces';
import { BaseParticipant, Participant, Participants } from './interfaces';
import Logger from '../../common/logger';

const logger = Logger.getInstance({ name: __filename });
const Router = express.Router();

/**
 * Sign in
 * POST signin/
 */
Router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const participantData: BaseParticipant = req.body;
        const { username: name, password, eventId }: BaseParticipant = participantData;
        let participant: Participant;
        const event: Event = await EventSvc.find(eventId);
        if (!event) {
            return res.status(404).send({ message: 'This event does not exist!' });
        }
        const eventParticipants: Participants = await SigninSvc.getEventParticipants(eventId);
        if (name in eventParticipants) {
            logger.info(`Existing participant [${name}] for event [${eventId}]`);
            participant = eventParticipants[name];
            if (!(await SigninSvc.validatePassword(participant, password))) {
                return res.status(401).send({ message: 'Invalid or wrong password' });
            }
        } else {
            participant = await SigninSvc.create(participantData);
        }
        const { username, availabilities }: Participant = participant;
        return res.status(200).send({ username, availabilities });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

export default Router;
