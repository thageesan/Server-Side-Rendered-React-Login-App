import { Router } from 'express';
import userService from './user.service';
export const userRouter = Router();

// routes
userRouter.post('/register', register);
userRouter.get('/details', getById);


export async function authenticate(req, res, next) {
    try {
        const user = await userService.authenticate(req.body, res)
        user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
    } catch (e) {
        next(e);
    }
}

async function register(req, res, next) {
    try {
        await userService.create(req.body);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}

async function getById(req, res, next) {
    try {
        const user = await userService.getById(req.tokenData.user.id);
        user ? res.json(user) : res.sendStatus(404)
    } catch (e) {
        next(e);
    }
}