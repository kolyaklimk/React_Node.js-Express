import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    hasChild: { type: Boolean, default: false },
    status: { type: String, enum: ['paid', 'cart'], default: 'cart', },
},
    { timestamps: true, }
);

export default mongoose.model('Booking', bookingSchema);

