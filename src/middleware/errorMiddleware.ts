import { NextFunction, Request, Response } from 'express';
import HttpException from '../common/httpException';

import Logger from '../common/logger';

const logger = Logger.getInstance({ name: __filename });

export const errorHandler = (
    error: HttpException,
    _request: Request,
    response: Response,
    _next: NextFunction
): void => {
    const status = error.statusCode || error.status || 500;
    response.status(status).send(error);
};

export const notFoundHandler = (request: Request, response: Response, _next: NextFunction): void => {
    const message = `Requested path '${request.path}' not found\n`;
    logger.error(message);
    response.status(404).send(message);
};
