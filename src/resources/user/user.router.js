/**
 * Imports
 */

const { Router } = require("express");
const controller = require("./user.contoller");
const validateFieldsShallowly = require("../../middleware/validateFields");
const authenticate = require("../../middleware/authenticate");

const router = Router();

/**
 * Create Routes
 */

// /api/users
router.get("/", authenticate, controller.getMany);

// /api/users/register
router.post(
	"/register",
	validateFieldsShallowly(["fullName", "email", "password"]),
	controller.register
);

// /api/users/login
router.post(
	"/login",
	validateFieldsShallowly(["email", "password"]),
	controller.login
);

// /api/users/:id
router
	.route("/:id")
	.all(authenticate)
	.get(controller.getOne)
	.put(controller.update)
	.delete(controller.remove);

/**
 * Exports
 */

module.exports = router;
