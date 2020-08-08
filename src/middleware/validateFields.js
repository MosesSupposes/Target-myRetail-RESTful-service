/**
 * Define Middleware
 */

const validateFieldsShallowly = fields => (req, res, next) => {
	const allFieldsAreValid = fields.every(field =>
		eval(`req.body.${field} !== undefined`)
	);

	if (allFieldsAreValid) {
		next();
	} else {
		const error = new Error(
			"Your request body is missing one of these fields: " + fields.join(", ")
		);
		error.status = 400;
		next(error);
	}
};

/**
 * Exports
 */

module.exports = validateFieldsShallowly;
