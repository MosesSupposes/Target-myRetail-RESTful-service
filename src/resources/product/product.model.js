const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	currentPrice: {
		type: { value: Number, curreny_code: String },
	},
});

module.exports = {
	Product: mongoose.model("product", productSchema),
};
