const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		catName: {
			type: String,
			required: true,
		},
		catType: {
			type: String,
			required: true,
		},
		isPublic: {
			type: Boolean,
			required: true,
			default: false,
		},

		catList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }],
	},
	{ timestamps: true }
);
categorySchema.virtual('categoryItems', {
	ref: 'item',
	localField: '_id',
	foreignField: 'belongsToCat',
});
module.exports = Profile = mongoose.model('category', categorySchema);
