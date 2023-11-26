import RoomModel from '../models/Room.js';

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
	catch(err){
		console.log(err);
		res.status(500).json({
		message: 'Failed to create a room'});
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