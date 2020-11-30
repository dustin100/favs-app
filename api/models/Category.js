const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	catName: {
		type: String,
		required: true,
	},
	catList: [],
});

module.exports = Profile = mongoose.model('category', CategorySchema);
