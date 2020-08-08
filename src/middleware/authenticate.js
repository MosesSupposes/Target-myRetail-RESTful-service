/**
 * Imports
 */

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "this is not secret";

/**
 * Define Middleware
 */

const authenticate = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				const error = new Error("Invalid token.");
				error.status = 400;
				next(error);
			} else {
				req.user = {
					email: decodedToken.email,
					fullName: decodedToken.fullName,
				};
				next();
			}
		});
	} else {
		const error = new Error(
			"You need a token tto access this resource. Obtain one by logging in or registering an account."
		);
		error.stattus = 400;
		next(error);
	}
};

/**
 * Exports
 */

module.exports = authenticate;
