import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Error email').isEmail(),
    body('password', 'Password should be more then 5 symbols').isLength({ min: 5 }),
    body('firstName', 'FirstName should be more then 3 symbols').isLength({ min: 3 }),
    body('lastName', 'lastName should be more then 3 symbols').isLength({ min: 3 }),
    body('patronymic', 'Patronymic should be more then 3 symbols').isLength({ min: 3 }),
    body('phoneNumber', 'Error phoneNumber').isMobilePhone(),
    body('birthDate', 'Error birthDate').isDate(),
];

export const loginValidator = [
    body('email', 'Error email').isEmail(),
    body('password', 'Password should be more then 5 symbols').isLength({ min: 5 })
];


export const categoryValidator = [
    body('name', 'Name should be more then 5 symbols and less than 50').isLength({ min: 5, max: 50 })
];

export const roomValidator = [
    body('price', 'Name should be less than 0.01').isFloat({ min: 0.01 })
];