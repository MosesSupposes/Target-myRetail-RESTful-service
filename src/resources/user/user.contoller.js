const { User } = require("./user.model");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

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
					res.status(200).json({ data: newUser });
				})
				.catch(err => {
					console.error(err);
					next(err);
				});
		}
	});
};

const login = (req, res) => {};

const update = (req, res) => {};

const remove = (req, res) => {};

module.exports = {
	getMany,
	getOne,
	register,
	login,
	update,
	remove,
};
