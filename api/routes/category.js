const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Category = require('../models/Category');
const { parse } = require('date-fns');

// @route GET /category
// @route GET /category?catType=type
// @route GET /category?limit=10&skip=10
// @route GET /category?sortBy=createdAt:desc
// @desc Get  categories
// @access Private
router.get('/', auth, async (req, res) => {
	const match = {};

	switch (req.query.catType) {
		case 'foods':
			match.catType = 'foods';
			break;
		case 'restaurants':
			match.catType = 'restaurants';
			break;
		case 'businesses':
			match.catType = 'businesses';
			break;
		case 'drinks':
			match.catType = 'drinks';
			break;
		case 'products':
			match.catType = 'products';
			break;
		case 'movies':
			match.catType = 'movies';
			break;
		case 'tv':
			match.catType = 'tv';
			break;
		case 'music':
			match.catType = 'music';
			break;
		case 'places':
			match.catType = 'places';
			break;
		case 'other':
			match.catType = 'other';
			break;
		default:
			match;
	}

	if (req.query.isPublic) {
		match.isPublic = req.query.isPublic === 'true';
	}

	const sort = {};

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}
	try {
		await req.user
			.populate({
				path: 'usersCategory',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.execPopulate();
		res.send(req.user.usersCategory);
	} catch (err) {
		res.status(500);
	}
});

// @route GET /category/:id
// @desc Get Category by id
// @access Private
router.get('/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const category = await Category.findOne({ _id, owner: req.user._id });
		if (!category) {
			return res.status(404).send();
		}

		res.send(category);
	} catch (err) {
		res.status(500).send();
	}
});

// @route POST /category
// @desc add Category
// @access Private
router.post('/', auth, async (req, res) => {
	const category = new Category({
		...req.body,
		owner: req.user._id,
	});

	try {
		await category.save();
		res.json(category);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route DELETE /category/:cat_id
// @desc Delete category from list
// @access Private
router.delete('/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const category = await Category.deleteOne({
			_id,
			owner: req.user._id,
		});

		if (!category) {
			return res.status(404).send();
		}
		res.json(category);
	} catch (err) {
		res.status(500).send();
	}
});

// @route PATCH /category/:id
// @desc Update Category
// @access Private
router.patch('/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['catName', 'catType', 'isPublic'];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const category = await Category.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!category) {
			return res.status(404).send();
		}

		updates.forEach((update) => (category[update] = req.body[update]));
		await category.save();

		res.json(category);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
