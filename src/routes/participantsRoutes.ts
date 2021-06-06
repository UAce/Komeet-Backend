import express from 'express';

import { signin } from '../handlers/participantsHandlers';

const Router = express.Router();

// POST participants/signin
Router.post('/signin', signin);

export default Router;
