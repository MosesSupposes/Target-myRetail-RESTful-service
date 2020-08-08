const { User } = require("./user.model");
const bcrypt = require("bcrypt");
const { omit, withCatch } = require("../../utils");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "this is not secret";

const getMany = (req, res) => {
	User.find()
		.lean()
		.exec()
		.then(allUsers => {
			res.status(200).json({ data: allUsers });
		})
		.catch(error => {
			console.error(error);
			res.status(400).end();
		});
};

const getOne = (req, res) => {
	User.findOne({ _id: req.params.id })
		.lean()
		.exec()
		.then(foundUser => {
			res.status(200).json({ data: foundUser });
		})
		.catch(error => {
			console.error(error);
			res.status(400).end();
		});
};

const register = (req, res, next) => {
	bcrypt.hash(req.body.password, 8, async (err, encryptedPassword) => {
		if (err) {
			console.error(err);
			next(err);
		} else {
			User.create({ ...req.body, password: encryptedPassword })
				.then(newUser => {
					const newUserWithoutPassword = omit(["password"], newUser._doc);
					res.status(200).json({
						data: {
							...newUserWithoutPassword,
							token: generateToken(newUserWithoutPassword),
						},
					});
				})
				.catch(err => {
					console.error(err);
					next(err);
				});
		}
	});
};

const login = async (req, res, next) => {
	const [err, user] = await withCatch(
		User.findOne({ _id: req.body.id }).lean().exec()
	);

	if (err || !user) {
		res.status(400).json({ error: { message: "Invalid user ID." } });
	} else {
		bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
			if (err) {
				next(err);
			} else if (!passwordsMatch) {
				res.status(400).json({ error: { message: "Invalid password." } });
			} else {
				const userWithoutPassword = omit(["password"], user);
				res.status(200).json({
					data: {
						success: `Welcome ${user.fullName}!`,
						userWithoutPassword,
						token: generateToken(user),
					},
				});
			}
		});
	}
};

const update = async (req, res) => {
	const [err, updatedUser] = await withCatch(
		User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
			.lean()
			.exec()
	);

	if (err || !updatedUser) {
		res.status(400).end();
	} else {
		const updatedUserWithoutPassword = omit(["password"], updatedUser);
		res.status(200).json({ data: updatedUserWithoutPassword });
	}
};

const remove = (req, res) => {};

/**
 * Helpers
 */

function generateToken(user) {
	const payload = {
		fullName: user.fullName,
		email: user.email,
		subject: user._id,
	};
	const options = { expiresIn: "3h" };
	return jwt.sign(payload, jwtSecret, options);
}

module.exports = {
	getMany,
	getOne,
	register,
	login,
	update,
	remove,
};
