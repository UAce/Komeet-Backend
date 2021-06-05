type CalendarType = 'dates' | 'days';
export interface BaseEventModel {
    name: string;
    description: string;
    calendarType: CalendarType;
    selected: string[];
    startTime: string; // 24h format, e.g. 9:00
    endTime: string; // 24h format, e.g. 00:00
    timezone: string; // default America/Montreal
    example?: boolean; // TODO: remove this
}

export interface EventModel extends BaseEventModel {
    eventId: string;
    maxParticipants: number; // default 20
}

export interface Events {
    [key: string]: Event;
}
