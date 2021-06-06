import { Schema, model, Model, Document } from 'mongoose';

import { IParticipant } from '../models/participantsModel';

type CalendarType = 'calendar' | 'weekdays';

export interface IEvent extends Document {
    name: string;
    description: string;
    calendarType: CalendarType;
    selected: string[];
    startTime: string;
    endTime: string;
    timezone: string;
    maxParticipants: number;
    createdAt: Date;
    participants: IParticipant[];
}

const eventsModelSchema = new Schema<IEvent>({
    _id: String,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    eventType: ['calendar', 'weekdays'],
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    maxParticipants: {
        type: Number,
        default: 20
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participants'
        }
    ]
});

const Events: Model<IEvent> = model<IEvent>('Events', eventsModelSchema);

export default Events;
