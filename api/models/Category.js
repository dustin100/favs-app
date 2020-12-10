const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	catName: {
		type: String,
		required: true,
	},

	catList: [],
});

module.exports = Profile = mongoose.model('category', CategorySchema);
