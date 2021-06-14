import { query } from 'express-validator';

const getCommentHistoryValidator = [
    query('sort')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('sort should be empty or non-empyt string')
]

const getPostHistoryValidator = [
    query('sort')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('sort should be empty or non-empyt string')
]

export {
    getCommentHistoryValidator,
    getPostHistoryValidator
}