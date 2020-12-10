const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Item = require('../models/Item');
const Category = require('../models/Category');
const User = require('../models/User');

// @route POST /item/:cat_id
// @desc add items to categories
// @access Private
router.post(
	'/:cat_id',
	[
		auth,
		[check('name', 'Name is Required').not().isEmpty()],
		[check('rating', 'Rating is Required').not().isEmpty()],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, rating, note, date } = req.body;
		let newItem = new Item({
			catId: req.params.cat_id,
			name,
			rating,
			note: '',
			date,
		});

		try {
			const category = await Category.findOne({
				_id: req.params.cat_id,
			});

			console.log(newItem);
			category.catList.unshift(newItem);
			await newItem.save();
			await category.save();
			res.json(category);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route DELETE /item/:cat_id/:item_id
// @desc Delete item from list
// @access Private
router.delete('/:cat_id/:item_id', auth, async (req, res) => {
	try {
		const category = await Category.findOne({ _id: req.params.cat_id })
			.populate('catList')
			.exec();
		//get remove index
		const removeIndex = category.catList
			.map((x) => x._id)
			.indexOf(req.params.item_id);

		if (removeIndex >= 0) {
			category.catList.splice(removeIndex, 1);
		}

		await Item.findOneAndDelete({
			_id: req.params.item_id,
		});
		await category.save();
		res.json(category);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
