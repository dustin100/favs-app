const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../models/Item');
const Category = require('../models/Category');
const multer = require('multer');
const sharp = require('sharp');

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

	const results = {};

	try {
		const item = await Item.find({
			belongsToCat: id,
			...match,
		})
			.sort(sortByParam)
			.limit(parseInt(req.query.limit))
			.skip(parseInt(req.query.skip));

		results.count = await Item.countDocuments({ ...match, belongsToCat: id });
		results.data = await item;
		results.offset = parseInt(req.query.skip);
		results.totalPages = Math.ceil(results.count / parseInt(req.query.limit));

		res.send(results);
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

const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			cb(new Error('Please upload an image that is a jpg, jpeg, or png'));
		}

		cb(undefined, true);
	},
});

// @route POST /item/:id/image
// @desc Adds image to itemImage field
// @access Private
router.post(
	'/:id/image',
	auth,
	upload.single('itemImage'),
	async (req, res) => {
		try {
			const item = await Item.findById(req.params.id);

			if (!item) {
				return res.status(404).send();
			}
			const buffer = await sharp(req.file.buffer)
				.resize({ width: 500, height: 500 })
				.png()
				.toBuffer();

			item.itemImage = buffer;

			await item.save();
			res.send();
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);
// @route Delete /item/:id/image
// @desc Deletes image from item
// @access Private
router.delete('/:id/image', auth, async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);

		if (!item) {
			return res.status(404).send();
		}
		item.itemImage = undefined;
		await item.save();
		res.send();
	} catch (error) {
		console.log(error);
		res.status(500);
	}
});

// @route GET /item/:id/image
// @desc gets image
// @access Private
router.get('/:id/image', auth, async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);

		if (!item || !item.itemImage) {
			throw new Error();
		}

		res.set('Content-Type', 'image/png');
		res.send(item.itemImage);
	} catch (err) {
		console.log(err);
		res.status(404).send;
	}
});

module.exports = router;
