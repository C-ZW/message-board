import { body, param } from 'express-validator';

const createPostValidator = [
    body('content')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('content should be non-empty string')
]

const getPostValidator = [
    param('id')
        .isString()
        .notEmpty()
        .withMessage('id should be non-empty')
]

export {
    createPostValidator,
    getPostValidator
}