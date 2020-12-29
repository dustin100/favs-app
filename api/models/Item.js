const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
	{
		belongsToCat: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Category',
		},
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},

		note: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = Profile = mongoose.model('item', ItemSchema);
