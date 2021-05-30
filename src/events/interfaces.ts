type CalendarType = 'dates' | 'days';
export interface BaseEvent {
    name: string;
    description: string;
    calendarType: CalendarType;
    selected: string[];
}

export interface Event extends BaseEvent {
    id: string;
}

export interface Events {
    [key: string]: Event;
}
