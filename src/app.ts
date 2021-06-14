import './config';

import express from 'express';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import path from 'path';

import './auth';
import { logger } from './share/logger';
import { postRouter } from './controller/post';
import { userRouter } from './controller/user';
import { commentRouter } from './controller/comment';
import { historyRouter } from './controller/history';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, '../apidoc')))
}

app.get('/', (req, res) => { res.send() })
app.use('/api/v1/post', postRouter);
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/history', historyRouter);

app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).send();
});

// eslint-disable-next-line
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // eslint-disable-next-line
    let error: any = 'Unknown error.'
    if (err) {
        error = err.stack || err.message || err
    }

    // Sequelize error
    const sql = err.parent?.sql;

    logger.error('Error in controller.', { err: error, sql })
    return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).end()
});


export default app;