import express from 'express';
import asyncHandler from 'express-async-handler';

import { authValidator } from '../../auth';
import { Post } from '../../models';
import { simpleErrorHandler } from '../../share/validatorResult';
import { createPostValidator, getPostValidator } from './validator';

const postRouter = express.Router();

postRouter.get('/:id',
    getPostValidator,
    asyncHandler(getPost));

postRouter.get('/',
    asyncHandler(getPost));

postRouter.post('/',
    authValidator,
    createPostValidator,
    simpleErrorHandler,
    asyncHandler(createPost)
);

export {
    postRouter
}

async function getPost(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const condition = id === undefined ? {} : { id };
    const data = await Post.findAll({
        where: condition,
        limit: 20
    });

    res.json({ data });
}

async function createPost(req: express.Request, res: express.Response) {
    const userId = res.locals.user.id;
    const { content } = req.body;

    const data = await Post.create({
        creator: userId,
        content
    });

    res.send({ data });
}