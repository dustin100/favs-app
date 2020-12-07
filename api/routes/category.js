const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Category = require('../models/Category');

// @route POST /category
// @desc add Category
// @access Private
router.post(
	'/',
	[auth, [check('catName', 'Name is Required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { catName } = req.body;

		let newCat = new Category({
			user: req.user.id,
			catName,
		});

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.category.unshift(newCat);
			await newCat.save();
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route DELETE /category/:cat_id
// @desc Delete category from list
// @access Private
router.delete('/:cat_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		//get remove index
		const removeIndex = profile.category
			.map((item) => item._id)
			.indexOf(req.params.cat_id);

		if (removeIndex >= 0) {
			profile.category.splice(removeIndex, 1);
		}

		await profile.save();
		await Category.findOneAndDelete({
			_id: req.params.cat_id,
		});

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route PUT /profile/category/:id
// @desc Update Category
// @access Private
router.put('/:cat_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const { catName } = req.body;

		const updateCat = await Category.findOneAndUpdate(
			{ _id: req.params.cat_id },
			{ catName: catName },
			{ new: true }
		);

		res.json(updateCat);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
