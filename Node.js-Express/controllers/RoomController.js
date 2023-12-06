import RoomModel from '../models/Room.js';
import BookingModel from '../models/Booking.js';

export const create = async (req, res) => {
    try {
        const doc = new RoomModel({
            category: req.body.category,
            capacity: req.body.capacity,
            price: req.body.price,
            photo: req.body.photo,
            name: req.body.name,
        });

        const room = await doc.save();

        res.json(room);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create a room'
        });
    }
}


export const getAll = async (req, res) => {
    try {
        const rooms = await RoomModel.find().populate('category').exec();

        res.json(rooms);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get rooms'
        });
    }
};


export const get = async (req, res) => {
    try {
        const roomId = req.params.id;

        const room = await RoomModel.findOne({ _id: roomId }).populate('category').exec();

        res.json(room);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get room'
        });
    }
};


export const getLastBooking = async (req, res) => {
    try {
        const last = await BookingModel.findOne({}, {}, { sort: { 'createdAt': -1 } });
        res.json(last.createdAt);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get last booking'
        });
    }
};

export const booking = async (req, res) => {
    try {
        const existingBooking = await BookingModel.findOne({
            room: req.body.room,
            $or: [
                {
                    $and: [
                        { checkInDate: { $lte: req.body.checkInDate } },
                        { checkOutDate: { $gte: req.body.checkInDate } }
                    ]
                },
                {
                    $and: [
                        { checkInDate: { $lte: req.body.checkOutDate } },
                        { checkOutDate: { $gte: req.body.checkOutDate } }
                    ]
                },
                {
                    $and: [
                        { checkInDate: { $gte: req.body.checkInDate } },
                        { checkOutDate: { $lte: req.body.checkOutDate } }
                    ]
                }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'This room is already booked in the time period indicated' });
        }

        const newBooking = BookingModel({
            room: req.body.room,
            client: req.userId,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            hasChild: req.body.hasChild
        });

        const room = await newBooking.save();

        res.json(room);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const roomId = req.params.id;

        const deletedRoom = await RoomModel.findOneAndDelete({ _id: roomId });

        if (!deletedRoom) {
            return res.status(404).json({
                message: 'Room not found'
            });
        }

        res.json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete Room'
        });
    }
};


export const update = async (req, res) => {
    try {
        const roomId = req.params.id;

        const updatedRoom = await RoomModel.updateOne({ _id: roomId },
            {
                category: req.body.category,
                capacity: req.body.capacity,
                price: req.body.price,
                photo: req.body.photo,
                name: req.body.name,
            });

        if (!updatedRoom) {
            return res.status(404).json({
                message: 'Room not updated'
            });
        }

        res.json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update room'
        });
    }
};