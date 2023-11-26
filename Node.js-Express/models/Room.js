import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    photo: { type: String },
},
    { timestamps: true, }
);

export default mongoose.model('Room', roomSchema);