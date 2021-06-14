import supertest from 'supertest';
import app from '../src/app';
import * as db from '../src/models';
import { setTimeout } from 'timers/promises';
import bcrypt from 'bcrypt';

const request = supertest(app);

const username = 'test1';
const password = 'test';

describe('Post test', () => {
    let token: string;
    beforeAll(async (done) => {
        await setTimeout(200);
        await db.User.create({ username, password: bcrypt.hashSync(password, 8) });

        token = (await request.post('/api/v1/auth/login')
            .send({ username, password })).body.data;

        await request.post('/api/v1/post')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'test' });

        done();
    })

    afterAll(async (done) => {
        await db.User.destroy({
            where: {},
            truncate: true
        })
        done();
    });

    test('create comment', async (done) => {
        const response = await request.post('/api/v1/comment')
            .set('Authorization', `Bearer ${token}`)
            .send({ postId: 1, content: 'test' });

        expect(response.status).toBe(200);
        done();
    });

    test('create comment fail', async (done) => {
        const response = await request.post('/api/v1/comment')
            .set('Authorization', `Bearer ${token}`)
            .send({ postId: 100, content: 'test' });

        expect(response.status).toBe(400);
        done();
    });
})