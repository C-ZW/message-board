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
        done();
    })

    afterAll(async (done) => {
        await db.User.destroy({
            where: {},
            truncate: true
        })
        done();
    });

    test('get post', async (done) => {
        const response = await request.get('/api/v1/post')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true)
        done();
    });

    test('get post', async (done) => {
        const response = await request.get('/api/v1/post/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true)
        done();
    });

    test('create post', async (done) => {
        const response = await request.post('/api/v1/post')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'test' });

        expect(response.status).toBe(200);
        done();
    });
})