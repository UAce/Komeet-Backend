import express, { Request, Response } from "express";

import * as EventSvc from "./services";
import { BaseEvent, Event } from "./interfaces";

export const Routes = express.Router();

/**
 * Get all events
 * GET events
 */
// Routes.get("/", async (req: Request, res: Response) => {
//   try {
//     const events: Event[] = await EventSvc.findAll();

//     res.status(200).send(events);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

/**
 * Get event by Id
 * GET events/:id
 */
Routes.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const event: Event = await EventSvc.find(id);

    if (event) {
      return res.status(200).send(event);
    }

    res.status(404).send(`event [${id}] not found`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Create event
 * POST events
 */
Routes.post("/", async (req: Request, res: Response) => {
  try {
    const event: BaseEvent = req.body;

    const newEvent = await EventSvc.create(event);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Update event
 * PUT events/:id
 */
Routes.put("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const eventUpdate: Event = req.body;

    const existingEvent: Event = await EventSvc.find(id);

    if (existingEvent) {
      const updatedEvent = await EventSvc.update(id, eventUpdate);
      return res.status(200).json(updatedEvent);
    }

    const newEvent = await EventSvc.create(eventUpdate);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Delete event
 * DELETE events/:id
 */
Routes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await EventSvc.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
