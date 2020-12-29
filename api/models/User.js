const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Category = require('./Category');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Can not contain password');
				}
			},
		},
		theme: {
			type: String,
			default: 'dark',
		},

		avatar: {
			type: Buffer,
		},

		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

userSchema.virtual('usersCategory', {
	ref: 'category',
	localField: '_id',
	foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	// delete userObject.avatar;

	return userObject;
};

userSchema.methods.genAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'ThisIsTesting!');
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('incorrect credentials');
	}
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('incorrect credentials');
	}

	return user;
};

// Hash the plain text password
userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	next();
});

// Delete user categories when user is removed
userSchema.pre('remove', async function (next) {
	const user = this;

	await Category.deleteMany({ owner: user._id });
	next();
});

module.exports = User = mongoose.model('User', userSchema);
