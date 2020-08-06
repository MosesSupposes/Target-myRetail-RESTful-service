const { Router } = require("express");
const controller = require("./user.contoller");
const { validateFieldsShallowly } = require("../../middleware/validateFields");

const router = Router();

// /api/users
router
	.route("/")
	.get(controller.getMany)
	.post(
		validateFieldsShallowly(["fullName", "email", "password"]),
		controller.create
	);

// /api/users/:id
router
	.route("/:id")
	.get(controller.getOne)
	.put(controller.update)
	.delete(controller.remove);

module.exports = router;
