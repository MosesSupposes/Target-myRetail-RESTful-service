/**
 * Imports
 */
const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const productsRouter = require("./resources/product/product.router");
const usersRouter = require("./resources/user/user.router");

const server = express();

/**
 * Middleware
 */

server.use(cors());
server.use(json());
server.use(morgan("dev"));

server.use("/api/products", productsRouter);
server.use("/api/users", usersRouter);

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

const start = async ({ dbUrl, port = 3000 }) => {
	try {
		await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		server.listen(port, () => {
			console.log(`Server listening on port ${port} 🚀`);
		});
	} catch (error) {
		console.error("Connection error:", error);
	}
};

/**
 * Exports
 */

module.exports = {
	server,
	start,
};
