import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    admin: { type: Boolean, default: false }
},
    { timestamps: true, }
);

export default mongoose.model('User', UserSchema);