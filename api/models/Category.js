const mongoose = require('mongoose');
const Item = require('./Item');

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
	},
	{ timestamps: true }
);
categorySchema.virtual('categoryItems', {
	ref: 'item',
	localField: '_id',
	foreignField: 'belongsToCat',
});

// Delete all items when category is removed
categorySchema.pre('deleteOne', async function (next) {
	const id = this.getQuery();
	await Item.deleteMany({ belongsToCat: id });
	next();
});
module.exports = Profile = mongoose.model('category', categorySchema);
