const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	catId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category',
	},
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 3,
	},

	note: {
		type: String,
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('item', ItemSchema);
