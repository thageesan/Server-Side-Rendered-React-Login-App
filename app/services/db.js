import mongoose from 'mongoose';
import User from './../user/user.model';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/login-api', {useNewUrlParser: true});

const db = {
    User: User
};


export default db