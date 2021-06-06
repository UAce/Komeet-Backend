import express from 'express';

import { getEvents, createEvent, deleteEvent, getEventById } from '../handlers/eventsHandlers';

const Router = express.Router();

// GET events
Router.get('/', getEvents);

// GET events/:id
Router.get('/:id', getEventById);

// POST events
Router.post('/', createEvent);

// DELETE events/:id
Router.delete('/:id', deleteEvent);

export default Router;
