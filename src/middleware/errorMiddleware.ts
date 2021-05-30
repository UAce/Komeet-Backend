import { Request, Response } from 'express';
import HttpException from '../common/httpException';

import Logger from '../common/logger';

const logger = Logger.getInstance({ name: __filename });

export const errorHandler = (error: HttpException, _: Request, response: Response): void => {
    const status = error.statusCode || error.status || 500;
    response.status(status).send(error);
};

export const notFoundHandler = (request: Request, response: Response): void => {
    const message = `The requested path ${request.path} was not found`;
    logger.error(message);
    response.status(404).send(message);
};
