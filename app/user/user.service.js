import bcrypt from 'bcryptjs';
import db from './../services/db';
import { generateToken } from './../services/jwt';

const User = db.User;

const userService = {
    authenticate: async function({ username, password }, res) {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...userWithoutPassword } = user.toObject();
            const token = generateToken({ id: user.id }, res);
            return {
                ...userWithoutPassword,
                token
            };
        }
    },
    getById: async function(id) {
        return await User.findById(id).select('-password');
    },
    create: async function(userParam) {
        // validate
        if (await User.findOne({ username: userParam.username })) {
            throw `Username ${userParam.username} is already taken.`;
        }
        
        if (!userParam.password) {
            throw 'Need to set a password.';
        }

        // hash password
        userParam.password = bcrypt.hashSync(userParam.password, 10);

        const user = new User(userParam);

        // save user
        await user.save();
    },
    removeAll: async function() {
        await User.remove();
    }
}

export default userService;