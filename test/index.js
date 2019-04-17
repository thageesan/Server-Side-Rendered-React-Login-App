import '@babel/polyfill'
import assert from 'assert';
import request from 'request';
import server from './../app/server';
import userService from './../app/user/user.service';



const url = 'http://127.0.0.1:8000/api';

describe('User management & auth', () => {
    before(async () => {
        // populate dummy data
        await userService.removeAll();
        const userData = [{
                username: 'thageesan',
                password: '123456'
            },
            {
                username: 'bob',
                password: '123456'
            },
            {
                username: 'snow',
                password: '123456'
            }
        ];
        for (const data of userData) {
            await userService.create(data);
        }
    });
    after(async () => {
        // clear all user data
        await userService.removeAll();
    });
    it('should not create a user with the same user name.', async () => {
        const user = {
            username: 'thageesan',
            password: '12345'
        };
        try {
            await userService.create(user);
        } catch (e) {
            return assert.equal(e, `Username ${user.username} is already taken.`);
        }

        assert.fail('Should not create user.');
    });
    it('should authenticate a user and return a token.', async () => {
        const user = {
            username: 'thageesan',
            password: '123456'
        };
        const token = await userService.authenticate(user)
        assert.notEqual('undefined', typeof (token));
    });
    it('should not authenticate a user and not return a token', async () => {
        const user = {
            username: 'thageesan',
            password: '12345'
        };
        const token = await userService.authenticate(user)
        assert.equal('undefined', typeof (token));
    });
});

describe('Api endpoint tests and route protection', () => {
    let token;
    before(async () => {
        // populate dummy data
        await userService.removeAll();
        const userData = [{
                username: 'thageesan',
                password: '123456'
            },
            {
                username: 'bob',
                password: '123456'
            },
            {
                username: 'snow',
                password: '123456'
            }
        ];
        for (const data of userData) {
            await userService.create(data);
        }

    });
    after(async () => {
        // clear all user data
        await userService.removeAll();
    });
    it('should return 200', (done) => {
        request.get(`${url}/ping`, (err, res) => {
            if (err) throw err;
            assert.equal(res.statusCode, 200);
            done();
        });
    });
    it('should not allow access to user and user child routes', (done) => {
        request.get(`${url}/users`, (err, res) => {
            if (err) throw err;
            assert.equal(res.statusCode, 401);
            done();
        });
    });
    it('should authenticated user if username and password provided is correct', (done) => {
        const params = {
            body: {
                username: 'thageesan',
                password: '123456'
            },
            json: true
        };
        request.post(`${url}/auth`, params, (err, res) => {
            if (err) throw err;
            assert.equal(res.statusCode, 200);
            assert.equal(res && res.body && res.body.token && typeof (res.body.token) === 'string', true)
            token = res.body.token
            done();
        });
    });
    it('should not authenticate user if username and password is incorrect', (done) => {
        const params = {
            body: {
                username: 'thageesan',
                password: '12345'
            },
            json: true
        };
        request.post(`${url}/auth`, params, (err, res) => {
            if (err) throw err;
            assert.equal(res.statusCode, 400);
            done();
        });
    });
    it('should have access to user details if valid token is passed', (done) => {
        request.get(`${url}/users/details`, {
            'auth': {
                'bearer': token
            }
        }, (err, res) => {
            if (err) throw err;
            assert.equal(res.statusCode, 200);
            assert.equal(JSON.parse(res.body)['username'], 'thageesan')
            done();
        });
    });
});