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
		type: [Boolean],
		required: true,
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
