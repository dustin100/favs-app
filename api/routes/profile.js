// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');
// const Profile = require('../models/Profile');
// const User = require('../models/User');
// const Category = require('../models/Category');

// // @route GET /profile/me
// // @desc Get current user's profile
// // @access Private
// router.get('/me', auth, async (req, res) => {
// 	try {
// 		const profile = await Profile.findOne({
// 			user: req.user.id,
// 		})
// 			.populate('categories')
// 			.exec();

// 		if (!profile) {
// 			return res
// 				.status(400)
// 				.json({ msg: 'There is not profile for this user' });
// 		}

// 		res.json(profile);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error something');
// 	}
// });

// // @route POST /profile/
// // @desc Create or update profile
// // @access Private
// router.post('/', auth, async (req, res) => {
// 	const { age, theme, name } = req.body;
// 	const profileFields = {};
// 	profileFields.user = req.user.id;
// 	if (name) profileFields.name = name;
// 	if (age) profileFields.age = age;
// 	if (theme) profileFields.theme = theme;

// 	try {
// 		let profile = await Profile.findOne({ user: req.user.id });

// 		if (profile) {
// 			// Update
// 			profile = await Profile.findOneAndUpdate(
// 				{ user: req.user.id },
// 				{ $set: profileFields },
// 				{ new: true }
// 			);
// 			res.json(profile);
// 		} else {
// 			// Create profile
// 			profile = new Profile(profileFields);
// 			await profile.save();
// 			res.json(profile);
// 		}
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500), send('Server Error');
// 	}
// });

// module.exports = router;
