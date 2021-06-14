import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import express from 'express';

import { User } from '../models'
import { logger } from '../share/logger';

async function isMatch(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
}

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'test'
}, async (payload, done) => {
    const { id, username, create_time } = payload.data;
    done(null, {
        id,
        username,
        createTime: create_time
    });
}));

passport.use(
    new LocalStrategy({ session: false }, async (username, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    username
                }
            });

            if (!user || !await isMatch(password, user.password)) {
                return done(null, false, {
                    message: 'username or password error'
                });
            } else {
                const { id, username, create_time } = user;
                return done(null, {
                    id,
                    username,
                    createTime: create_time
                });
            }

        } catch (err) {
            logger.error(err);
            done(err, false);
        }
    })
);

export const authValidator = [
    passport.authenticate('jwt', { session: false }),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.locals.user = req.user;
        next();
    },
]