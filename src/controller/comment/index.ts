import express from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { authValidator } from '../../auth';
import { Comment, Post } from '../../models';
import { simpleErrorHandler } from '../../share/validatorResult';
import { createCommentValidator } from './validator';

const commentRouter = express.Router();

commentRouter.post('/',
    authValidator,
    createCommentValidator,
    simpleErrorHandler,
    asyncHandler(createComment));

export {
    commentRouter
}

/**
 * @api {Post} /comment createComment
 * @apiHeader Authorization JWT token.
 * @apiName CreateComment
 * @apiGroup Comment
 * 
 * @apiParam {String} content comment content
 * @apiParam {Number} postId Post ID
 * 
 * @apiSuccess {Number} creator ID
 * 
 * @apiuse UserNotFoundError
 */
async function createComment(req: express.Request, res: express.Response) {
    const userId = res.locals.user.id;
    const { content, postId } = req.body;
    const post = await Post.findByPk(postId);
    if (post === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'post not found' });
        return;
    }
    const data = await Comment.create({ creator: userId, content, post_id: postId });
    return res.json({ data });
}