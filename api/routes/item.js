const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../models/Item');
const Category = require('../models/Category');

// @route POST /item/:cat_id
// @desc add items to categories
// @access Private
router.post('/:id', auth, async (req, res) => {
	const id = req.params.id;
	const item = new Item({
		...req.body,
		belongsToCat: id,
	});

	try {
		await item.save();
		const items = await Item.find({ belongsToCat: id });
		res.send(items);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route GET /item:id
// @desc Get item based on category id
// @access Private
router.get('/:id', auth, async (req, res) => {
	const id = req.params.id;

	const match = {};

	switch (req.query.rating) {
		case '1':
			match.rating = '1';
			break;
		case '2':
			match.rating = '2';
			break;
		case '3':
			match.rating = '3';
			break;
		case '4':
			match.rating = '4';
			break;
		case '5':
			match.rating = '5';
			break;
		default:
			match;
	}

	const sortByParam = {};
	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sortByParam[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		const item = await Item.find({
			belongsToCat: id,
			...match,
		})
			.sort(sortByParam)
			.limit(parseInt(req.query.limit))
			.skip(parseInt(req.query.skip));

		res.send(item);
	} catch (err) {
		res.status(500);
	}
});

// @route DELETE /item/:id
// @desc Delete item from list
// @access Private
router.delete('/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const item = await Item.findOneAndDelete({ _id });

		res.json(item);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.patch('/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'rating', 'note'];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const item = await Item.findOne({
			_id: req.params.id,
		});

		if (!item) {
			return res.status(404).send();
		}
		updates.forEach((update) => (item[update] = req.body[update]));
		await item.save();
		res.send(item);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
