import express from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

function areValidationErrors(req: express.Request, res: express.Response): boolean {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST)
            .json({ error: error.array() });
        return false;
    }
    return true;
}

function simpleErrorHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (!areValidationErrors(req, res)) return;
    next();
}

export {
    areValidationErrors,
    simpleErrorHandler
}