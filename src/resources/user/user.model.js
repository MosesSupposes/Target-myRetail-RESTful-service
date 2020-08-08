/**
 * Imports
 */

const mongoose = require("mongoose");

/**
 * Define Schema
 */

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

/**
 * Exports
 */

module.exports = {
	User: mongoose.model("users", userSchema),
};
