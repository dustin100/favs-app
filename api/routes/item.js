const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../models/Item');
const Category = require('../models/Category');

// @route POST /item/:cat_id
// @desc add items to categories
// @access Private
router.post('/:id', auth, async (req, res) => {
	const item = new Item({
		...req.body,
		belongsToCat: req.params.id,
	});

	try {
		await item.save();
		res.send(item);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route GET /item:id
// @desc Get  item based on category id
// @access Private
router.get('/:id', auth, async (req, res) => {
	const id = req.params.id;

	try {
		const item = await Item.find({ belongsToCat: id });
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
