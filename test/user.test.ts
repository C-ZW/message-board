import supertest from 'supertest';
import app from '../src/app';
import * as db from '../src/models';
import { setTimeout } from 'timers/promises';
import bcrypt from 'bcrypt';


const request = supertest(app);

const username = 'test1';
const password = 'test';

describe('first test', () => {
    beforeAll(async (done) => {
        await setTimeout(200);
        await db.User.create({ username, password: bcrypt.hashSync(password, 8) });
        done();
    })

    afterAll(async (done) => {
        await db.User.destroy({
            where: {},
            truncate: true
        })
        done();
    });

    test('login', async (done) => {
        const response = (await request.post('/api/v1/auth/login')
            .send({ username, password }));

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        done();
    });

    test('login fail', async (done) => {
        const response = await request.post('/api/v1/auth/login')
            .send({ username, password: '123' });

        expect(response.status).toBe(400);
        done();
    });

    test('signup', async (done) => {
        const response = await request.post('/api/v1/auth/signup')
            .send({ username: 'signup', password });

        expect(response.status).toBe(201);
        done();
    });

    test('signup fail', async (done) => {
        await request.post('/api/v1/auth/signup')
            .send({ username: 'signup2', password });

        const response = await request.post('/api/v1/auth/signup')
            .send({ username: 'signup2', password });

        expect(response.status).toBe(400);
        done();
    });
})