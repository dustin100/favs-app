const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route GET /profile/me
// @desc Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name']);

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is not profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error something');
	}
});

// @route POST /profile/
// @desc Create or update profile
// @access Private

router.post('/', auth, async (req, res) => {
	const profileFields = {};
	profileFields.user = req.user.id;

	try {
		let profile = await Profile.findOne({ user: req.user.id });

		if (profile) {
			// Update
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);
			res.json(profile);
		} else {
			// Create profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500), send('Server Error');
	}
});

// @route PUT /profile/category
// @desc Update or add Category
// @access Private

router.put(
	'/category',
	[auth, [check('catName', 'Name is Required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { catName } = req.body;

		const newCat = {
			catName,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.category.unshift(newCat);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route DELETE /profile/category/:cat_id
// @desc Delete category from list
// @access Private

router.delete('/category/:cat_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//get remove index
		const removeIndex = profile.category
			.map((item) => item.id)
			.indexOf(req.params.cat_id);

		profile.category.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
