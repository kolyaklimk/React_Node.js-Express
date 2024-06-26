import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {

        const hash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        var checkAdmin = false;
        if (req.body.admin) {
            checkAdmin = true;
        }

        const doc = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            patronymic: req.body.patronymic,
            birthDate: req.body.birthDate,
            phoneNumber: req.body.phoneNumber,
            passwordHash: hash,
            admin: checkAdmin
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return req.status(404).json({
                message: 'Error email/password',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return req.status(404).json({
                message: 'Error email/password',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to login',
        });
    }
};