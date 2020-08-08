/**
 * Imports
 */

const { Router } = require("express");
const controller = require("./product.controller");
const validateFieldsShallowly = require("../../middleware/validateFields");
const authenticate = require("../../middleware/authenticate");

const router = Router();

/**
 * Create Routes
 */

router.use(authenticate); // Require a json web token for access to each endpoint on this router.

// /api/products
router
	.route("/")
	.get(controller.getMany)
	.post(
		validateFieldsShallowly([
			"productId",
			"name",
			"productDescription",
			"buyUrl",
		]),
		controller.create
	);

// /api/products/:id
router
	.route("/:id")
	.get(controller.getOne)
	.put(controller.update)
	.delete(controller.remove);

/**
 * Exports
 */

module.exports = router;
