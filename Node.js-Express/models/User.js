import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: { type: String, required: true, /*min: 3*/ },
    birthDate: {
        type: Date, required: true,
        /*validate: {
            validator: (value) => {
                const age = (new Date().getTime() - new Date(value).getTime()) / (365 * 24 * 60 * 60 * 1000);
                return age >= 18;
            },
            message: 'BirthDate shuold be more then 18',
        },*/
    },
    phoneNumber: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    admin: { type: Boolean, default: false }
},
    { timestamps: true, }
);

export default mongoose.model('User', UserSchema);