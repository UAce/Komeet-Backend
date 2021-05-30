import { Request, Response } from 'express';
import HttpException from '../common/httpException';

export const errorHandler = (error: HttpException, _: Request, response: Response): void => {
    const status = error.statusCode || error.status || 500;
    response.status(status).send(error);
};

export const notFoundHandler = (request: Request, response: Response): void => {
    const message = `The requested path ${request.path} was not found`;
    console.error(message);
    response.status(404).send(message);
};
