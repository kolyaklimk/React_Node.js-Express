import express from 'express';
import mongoose from 'mongoose';
import * as Validator  from './validations.js';
import * as UserController from './controllers/UserController.js'
import checkAuth from './utilities/checkAuth.js'

mongoose.connect('mongodb+srv://admin:admin@cluster0.qsyl956.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});


app.post('/auth/login', Validator.loginValidator, UserController.login);

app.post('/auth/register', Validator.registerValidator, UserController.register);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Serser OK');
})