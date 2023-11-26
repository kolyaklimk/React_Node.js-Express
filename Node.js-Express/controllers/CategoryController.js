import CategoryModel from '../models/Category.js';

export const create = async (req, res) => {
	try {
		const doc = new CategoryModel({
			name: req.body.name,
		});

		const category = await doc.save();

		res.json(category);
	}
	catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to create a category'
		});
	}
}

export const getAll = async (req, res) => {
	try {
		const categories = await CategoryModel.find();

		res.json(categories);
	}
	catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to get categories'
		});
	}
};

export const get = async (req, res) => {
	try {
		const categoryId = req.params.id;

		const category = await CategoryModel.findOne({ _id: categoryId });

		res.json(category);
	}
	catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to get category'
		});
	}
};

export const remove = async (req, res) => {
	try {
		const categoryId = req.params.id;

		const deletedCategory = await CategoryModel.findOneAndDelete({ _id: categoryId });

		if (!deletedCategory) {
			return res.status(404).json({
				message: 'Category not found'
			});
		}

		res.json({ success: true });
	}
	catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to delete category'
		});
	}
};


export const update = async (req, res) => {
	try {
		const categoryId = req.params.id;

		const updatedCategory = await CategoryModel.updateOne({ _id: categoryId },
			{
				name: req.body.name,
			});

		if (!updatedCategory) {
			return res.status(404).json({
				message: 'Category not updated'
			});
		}

		res.json({ success: true });
	}
	catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to update category'
		});
	}
};