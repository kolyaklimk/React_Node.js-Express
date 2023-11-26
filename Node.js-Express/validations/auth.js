import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Error email').isEmail(),
    body('password', 'Password should be more then 5 symbols').isLength({ min: 5 }),
    body('fullName', 'FullName should be more then 3 symbols').isLength({ min: 3 }),
];

export const loginValidator = [
    body('email', 'Error email').isEmail(),
    body('password', 'Password should be more then 5 symbols').isLength({ min: 5 })
];