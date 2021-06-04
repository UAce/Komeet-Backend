type CalendarType = 'dates' | 'days';
export interface BaseEvent {
    name: string;
    description: string;
    calendarType: CalendarType;
    selected: string[];
    startTime: string; // 24h format, e.g. 9:00
    endTime: string; // 24h format, e.g. 00:00
    timezone: string; // default America/Montreal
    example?: boolean; // TODO: remove this
}

export interface Event extends BaseEvent {
    eventId: string;
    maxParticipants: number; // default 20
}

export interface Events {
    [key: string]: Event;
}
