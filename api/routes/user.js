const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../models/User');

// @route POST /users
// Desc Register user
// @access Public
router.post('/', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.genAuthToken();
		res.cookie('auth_token', token);
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send();
	}
});

// Login User
router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.genAuthToken();
		res.cookie('auth_token', token);
		res.status(200).send({ user, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

// Logout User
router.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	} catch (err) {
		res.status(500).send();
	}
});

// Logout of all sessions
router.post('/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (err) {
		res.status(500).send();
	}
});

// Get current user
router.get('/me', auth, async (req, res) => {
	res.send(req.user);
});

// Update User by Id
router.patch('/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'theme'];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update];
		});
		await req.user.save();

		res.send(req.user);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete User by Id
router.delete('/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (err) {
		res.status(500).send();
	}
});

module.exports = router;
