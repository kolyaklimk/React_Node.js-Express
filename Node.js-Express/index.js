import express from 'express';
import mongoose from 'mongoose';
import * as Validator from './validations.js';
import * as UserController from './controllers/UserController.js'
import * as RoomController from './controllers/RoomController.js'
import * as CategoryController from './controllers/CategoryController.js'
import checkAuth from './utilities/checkAuth.js'
import checkAdmin from './utilities/checkAdmin.js'

mongoose.connect('mongodb+srv://admin:admin@cluster0.qsyl956.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));
const app = express();
app.use(express.json());

app.post('/auth/login', Validator.loginValidator, UserController.login);
app.post('/auth/register', Validator.registerValidator, UserController.register);


app.post('/categories', checkAdmin, Validator.categoryValidator, CategoryController.create);
app.get('/categories', CategoryController.getAll);
app.get('/categories/:id', CategoryController.get);
app.delete('/categories/:id', checkAdmin, CategoryController.remove);
app.patch('/categories/:id', checkAdmin, Validator.categoryValidator, CategoryController.update);

app.get('/rooms', RoomController.getAll);
app.post('/rooms', checkAdmin, Validator.roomValidator, RoomController.create);
app.get('/rooms/:id', RoomController.get);
app.delete('/rooms/:id', checkAdmin, RoomController.remove);
app.patch('/rooms/:id', checkAdmin, Validator.roomValidator, RoomController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Serser OK');
})