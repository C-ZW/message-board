import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { User } from '../../models';
import { signupValidator } from './validator';
import { simpleErrorHandler } from '../../share/validatorResult';

const userRouter = express.Router();

userRouter.post('/login',
    asyncHandler(login)
)

userRouter.post('/signup',
    signupValidator,
    simpleErrorHandler,
    asyncHandler(signup));

export {
    userRouter
}


async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                mesage: 'not found'
            })
        }

        const token = jwt.sign({ data: user }, 'test');
        return res.json({ data: token });
    })(req, res, next)
}





/**
 * @api {Post} /user createUser
 * @apiName createUser
 * @apiGroup User
 * 
 * @apiParam {String} username username
 * @apiParam {Number} password password
 * 
 * @apiSuccess {Number} creator ID
 */
async function signup(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    const cipertext = await bcrypt.hash(password, 8);
    const result = await User.findOrCreate({
        where: { username },
        defaults: { username, password: cipertext }
    })
    if (!result[1]) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'username existed' });
        return;
    }
    res.status(StatusCodes.CREATED).send();
}
