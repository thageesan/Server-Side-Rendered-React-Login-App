import '@babel/polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import {
    validateToken
} from './services/jwt';
import {
    authenticate,
    userRouter
} from './user/user.controller'
import userService  from './user/user.service'

const template = require('./../views/template')
const path = require('path');
let initialState = {};

//SSR function import
const ssr = require('./../views/server');

export const app = express();



// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// server rendered home page
app.get('/api/login', (req, res) => {
    const {
        preloadedState,
        content
    } = ssr(initialState)
    const response = template("Server Rendered Page", preloadedState, content)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response);
});

app.get('/api/ping', (req, res) => res.send('pong'))

//unprotected routes
app.post('/api/auth', authenticate)

//protected routes
app.use('/api/users', validateToken, userRouter)

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8000) : 8000;
const server = app.listen(port, async function () {
    console.log('Server listening on port ' + port);
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

export default server;