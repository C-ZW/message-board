import { body } from 'express-validator';

const createCommentValidator = [
    body('postId').isInt().withMessage('postId is required'),
    body('content').isString().trim().notEmpty().withMessage('content should be non-empty string')
]

export {
    createCommentValidator
}