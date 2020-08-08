/**
 * Imports
 */

const { Router } = require("express");
const controller = require("./product.controller");
const validateFieldsShallowly = require("../../middleware/validateFields");

const router = Router();

/**
 * Create Routes
 */

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
