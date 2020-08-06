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
	currentPrice: {
		type: { value: Number, curreny_code: String },
		required: true,
	},
});

module.exports = {
	Product: mongoose.model("products", productSchema),
};
