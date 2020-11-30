const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	category: [Object],

	name: {
		type: String,
	},
	age: {
		type: Number,
	},

	theme: {
		type: String,
		default: 'dark',
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
