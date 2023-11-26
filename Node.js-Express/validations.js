import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Error email').isEmail(),
    body('password', 'Password should be more then 5 symbols').isLength({ min: 5 }),
    body('firstName', 'FirstName should be more then 3 symbols').isLength({ min: 3 }),
    body('lastName', 'lastName should be more then 3 symbols').isLength({ min: 3 }),
    body('patronymic', 'Patronymic should be more then 3 symbols').isLength({ min: 3 }),
    body('phoneNumber', 'Error phoneNumber').isMobilePhone(),
    body('birthDate', 'Error birthDate').isDate(),
    body('birthDate', 'BirthDate should be more then 18').custom((value) => {
        const age = (new Date().getTime() - new Date(value).getTime()) / (365 * 24 * 60 * 60 * 1000);
        return age >= 18;
    }),
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

export const bookingValidator = [
    body('checkInDate', 'Error checkInDate').isDate(),
    body('checkOutDate', 'Error checkOutDate').isDate(),
    body('checkOutDate', 'checkOutDate should be more then checkInDate').custom((value) => {
        const checkInDate = bookingSchema.path('checkInDate').get();
        return new Date(value) > new Date(checkInDate);
    }),
];