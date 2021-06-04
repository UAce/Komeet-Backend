export interface BaseParticipant {
    username: string;
    eventId: string;
    password?: string; // hashed and optional because we wont send back the password
}

export interface Participant extends BaseParticipant {
    participantId: string;
    availabilities: number[][];
}

export interface Participants {
    [username: string]: Participant;
}

export interface EventParticipants {
    [eventId: string]: Participants;
}
