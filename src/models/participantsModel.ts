import { Schema, model, Model, Document } from 'mongoose';

export interface IParticipant extends Document {
    username: string;
    password: string;
    availabilities: number[][];
    createdAt: Date;
    eventId: string;
}

const participantsModelSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    availabilities: {
        type: [[Number]], // Array of arrays of arrays of numbers
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    eventId: {
        type: String,
        ref: 'Events'
    }
});

const Participants: Model<IParticipant> = model('Participants', participantsModelSchema);

export default Participants;
