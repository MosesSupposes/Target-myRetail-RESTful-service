/**
 * Imports
 */
const mongoose = require("mongoose");

/**
 * Define Schema
 */

const productSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	productDescription: {
		type: String,
		required: true,
	},
	buyUrl: {
		type: String,
		required: true,
	},
});

/**
 * Exports
 */

module.exports = {
	Product: mongoose.model("products", productSchema),
};
