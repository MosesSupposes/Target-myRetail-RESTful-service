/**
 * Imports
 */

const { Router } = require("express");
const controller = require("./user.contoller");
const validateFieldsShallowly = require("../../middleware/validateFields");

const router = Router();

/**
 * Create Routes
 */

// /api/users
router.get("/", controller.getMany);

// /api/users/register
router.post(
	"/register",
	validateFieldsShallowly(["fullName", "email", "password"]),
	controller.register
);

// /api/users/login
router.post("/login", controller.login);

// /api/users/:id
router
	.route("/:id")
	.get(controller.getOne)
	.put(controller.update)
	.delete(controller.remove);

/**
 * Exports
 */

module.exports = router;
