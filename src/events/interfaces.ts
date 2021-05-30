type CalendarType = 'dates' | 'days';
export interface BaseEvent {
    name: string;
    description: string;
    calendarType: CalendarType;
    selected: string[];
}

export interface Event extends BaseEvent {
    id: string;
    startTime: string; // 24h format
    endTime: string; // 24h format
    timezone: string; // default America/Montreal
    maxParticipants: number; // default 20
}

export interface Events {
    [key: string]: Event;
}
