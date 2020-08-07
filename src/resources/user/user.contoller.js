const { User } = require("./user.model");
const bcrypt = require("bcrypt");
const { omit, withCatch } = require("../../utils");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "this is not secret";

const getMany = (req, res) => {};

const getOne = (req, res) => {};

const register = (req, res, next) => {
	bcrypt.hash(req.body.password, 8, async (err, encryptedPassword) => {
		if (err) {
			console.error(err);
			next(err);
		} else {
			User.create({ ...req.body, password: encryptedPassword })
				.then(newUser => {
					const newUserWithoutPassword = omit(["password"], newUser._doc);
					res.status(200).json({ data: newUserWithoutPassword });
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
					success: `Welcome ${user.fullName}!`,
					userWithoutPassword,
					token: generateToken(user),
				});
			}
		});
	}
};

const update = (req, res) => {};

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
