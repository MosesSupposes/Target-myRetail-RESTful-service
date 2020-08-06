const { Router } = require("express");
const controller = require("./product.controller");

const router = Router();

// /api/products
router.route("/").get(controller.getMany).post(controller.create);

// /api/products/:id
router
	.route("/:id")
	.get(controller.getOne)
	.put(controller.update)
	.delete(controller.remove);
