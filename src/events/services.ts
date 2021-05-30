import { v4 as UUIDv4 } from "uuid";
/**
 * Data Model Interfaces
 */
import { BaseEvent, Event, Events } from "./interfaces";

/**
 * In-Memory Store
 * TODO: Store in MongoDB
 */
const items: Events = {};

/**
 * Service Methods
 */
// export const findAll = async (): Promise<Event[]> => {
//   return Object.values(items);
// };

export const find = async (id: string): Promise<Event> => {
  return items[id];
};

export const create = async (newEvent: BaseEvent): Promise<Event> => {
  const id: string = UUIDv4();

  items[id] = {
    id,
    ...newEvent
  };

  return items[id];
};

export const update = async (
  id: string,
  itemUpdate: BaseEvent
): Promise<Event | null> => {
  const item = await find(id);

  if (!item) {
    console.warn(`Event [${id}] does not exist`);
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: string): Promise<void> => {
  const item = await find(id);

  if (item) {
    delete items[id];
  }
};

/**
 * Populate In-Memory Store
 */
const initialEvents: BaseEvent[] = [
  {
    name: "March Book Club",
    description: "At Park Lafontaine from 2pm to 3pm",
    calendarType: "dates",
    selected: ["2022-05-30"]
  }
];

Promise.all(
  initialEvents.map(async (event: BaseEvent) => {
    await create(event);
  })
);
