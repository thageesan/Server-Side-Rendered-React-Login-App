import jwt from 'jsonwebtoken';
import errorHandler from './error.handler';

const secret = process.env.JWT_SECRET || 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING';

export function validateToken(req, res, next) {
    try {
        const token = req.get('authorization').split(' ')[1]
        const decoded = jwt.verify(token, secret);
        // need to pass user data about user to below routes
        req['tokenData'] = decoded;
        next();
    } catch (err) {
        errorHandler({name: 'UnauthorizedError'}, res);
    }

}

export function generateToken(data, res) {
    try {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user: data
        }, secret);
    } catch (e) {
        errorHandler(err, res);
    }
    
}