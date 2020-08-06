const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	buyUrl: {
		type: String,
		required: true,
	},
});

module.exports = {
	Product: mongoose.model("products", productSchema),
};
