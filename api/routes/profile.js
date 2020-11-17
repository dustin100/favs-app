const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route GET /profile/me
// Desc Get current user's profile
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

module.exports = router;
