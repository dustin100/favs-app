const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},

	category: [
		{
			catName: {
				type: String,
				required: true,
			},
			catList: {
				type: [Object],
			},
		},
	],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
