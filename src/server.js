/**
 * Imports
 */
const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();

/**
 * Middleware
 */

server.use(cors());
server.use(json());
server.use(morgan("dev"));

server.use(function notFound(req, res, next) {
	const error = new Error("Resource not found.");
	error.status = 404;

	next(error);
});

server.use(function errorHandler(error, req, res, next) {
	error.status = error.status || 500;
	error.message = error.message || "Internal server error.";

	res.status(error.status).json({ error: { message: error.message } });
});

/**
 * Start the server
 */

const start = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://cluster0.4kxos.mongodb.net/myRetail",
			{ useNewUrlParser: true, useUnifiedTopology: true }
		);
		server.listen(process.env.PORT || 3000, () => {
			console.log("Server listening on port 3000 🚀");
		});
	} catch (error) {
		console.error("Connection error", error);
	}
};

module.exports = {
	server,
	start,
};
