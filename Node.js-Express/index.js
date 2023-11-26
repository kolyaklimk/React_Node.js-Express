import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import * as Validator from './validations.js';
import * as UserController from './controllers/UserController.js';
import * as RoomController from './controllers/RoomController.js';
import * as CategoryController from './controllers/CategoryController.js';
import checkAuth from './utilities/checkAuth.js';
import checkAdmin from './utilities/checkAdmin.js';
import handleValidationErrors from './utilities/handleValidationErrors.js';

mongoose.connect('mongodb+srv://admin:admin@cluster0.qsyl956.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAdmin, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.post('/auth/login', Validator.loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/register', Validator.registerValidator, handleValidationErrors, UserController.register);

app.post('/categories', checkAdmin, Validator.categoryValidator, handleValidationErrors, CategoryController.create);
app.get('/categories', CategoryController.getAll);
app.get('/categories/:id', CategoryController.get);
app.delete('/categories/:id', checkAdmin, CategoryController.remove);
app.patch('/categories/:id', checkAdmin, Validator.categoryValidator, handleValidationErrors, CategoryController.update);

app.get('/rooms', RoomController.getAll);
app.post('/rooms', checkAdmin, Validator.roomValidator, handleValidationErrors, RoomController.create);
app.get('/rooms/:id', RoomController.get);
app.delete('/rooms/:id', checkAdmin, RoomController.remove);
app.patch('/rooms/:id', checkAdmin, Validator.roomValidator, handleValidationErrors, RoomController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Serser OK');
})