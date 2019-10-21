import '@babel/polyfill';
import request from 'supertest';
import {App} from '../src/app';

describe('Test the root api path', () => {
    test('It should respond to GET request', async () => {
        const app = new App().getHTTPServer();
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
    })
});

describe('Test the login api path', () => {
    test('It should respond to GET request', async() => {
        const app = new App().getHTTPServer();
        const response = await request(app).get('/api/auth/twitter');
        
        expect(response.statusCode).toBe(500);
    })
})

describe('Test the login callback api path', () => {
    test('It should respond to GET request', async() => {
        const app = new App().getHTTPServer();
        const response = await request(app).get('/api/auth/twitter/callback');
        
        expect(response.statusCode).toBe(500);
    })
})

describe('Test the create tweet api path', () => {
    test('It should respond to POST request', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).post('/api/twitter/create-tweet', {message: 'hello'});
        expect(response.statusCode).toBe(201);
    })
})

describe('Test the create tweet api path', () => {
    test('It should fail with 401', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).post('/api/twitter/create-tweet', {message: 'hello'});
        expect(response.statusCode).toBe(401);
    })
})

describe('Test the delete tweet api path', () => {
    test('It should respond to DELETE request', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).delete('/api/twitter/tweet/123456');
        expect(response.statusCode).toBe(200);
    })
})

describe('Test the delete tweet api path', () => {
    test('It should fail with 401', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).delete('/api/twitter/tweet/123456');
        expect(response.statusCode).toBe(401);
    })
})

describe('Test the get tweet api path', () => {
    test('It should respond to GET request', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).get('/api/twitter/tweet/123456');
        expect(response.statusCode).toBe(200);
    })
})

describe('Test the get tweet api path', () => {
    test('It should fail with 401', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).get('/api/twitter/tweet/123456');
        expect(response.statusCode).toBe(401);
    })
})

describe('Test the direct message api path', () => {
    test('It should respond to POST request', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).post('/api/twitter/direct-message', {recipientID: 123456, message: 'Hello!'});
        expect(response.statusCode).toBe(201);
    })
})

describe('Test the direct message api path', () => {
    test('It should fail with 401', async() => {
        const app = new App().getHTTPServer();
         const response = await request(app).post('/api/twitter/direct-message', {recipientID: 123456, message: 'Hello!'});
        expect(response.statusCode).toBe(401);
    })
})