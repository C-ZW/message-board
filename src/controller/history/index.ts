import express from 'express';
import asyncHandler from 'express-async-handler';

import { authValidator } from '../../auth';
import { Comment, Post } from '../../models';
import { simpleErrorHandler } from '../../share/validatorResult';
import { getPostHistoryValidator, getCommentHistoryValidator } from './validator';

const historyRouter = express.Router();

historyRouter.get('/comment',
    authValidator,
    getCommentHistoryValidator,
    simpleErrorHandler,
    asyncHandler(getCommentHistory));

historyRouter.get('/post',
    authValidator,
    getPostHistoryValidator,
    simpleErrorHandler,
    asyncHandler(getPostHistory));

export {
    historyRouter
}


async function getCommentHistory(req: express.Request, res: express.Response) {
    const userId = res.locals.user.id;
    const comments = await Comment.findAll({
        where: {
            creator: userId
        },
        limit: 20
    });
    res.json({ comments });
}

async function getPostHistory(req: express.Request, res: express.Response) {
    const userId = res.locals.user.id;
    const posts = await Post.findAll({
        where: {
            creator: userId
        },
        limit: 20
    });
    res.json({ posts });
}