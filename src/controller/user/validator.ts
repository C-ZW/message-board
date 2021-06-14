import { body } from 'express-validator';

const signupValidator = [
    body('username')
        .isString()
        .trim(' ')
        .notEmpty()
        .withMessage('username should be non-empty string'),
    body('password')
        .isString()
        .trim(' ')
        .notEmpty()
        .withMessage('password should be non-empty string')
]

export {
    signupValidator
}