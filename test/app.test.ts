import supertest from 'supertest';
import app from '../src/app';


const request = supertest(app);

describe('test app', () => {
    test('health check', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        done();
    });

    test('not found', async (done) => {
        const response = await request.get('/notFound');
        expect(response.status).toBe(404);
        done();
    });
});