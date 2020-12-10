const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],

	name: {
		type: String,
	},

	theme: {
		type: String,
		default: 'dark',
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
