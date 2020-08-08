/**
 * Imports
 */
const server = require("./server");

/**
 * Set up environment variables
 */

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

/**
 * Start the server
 */

server.start({
	dbUrl: process.env.DB_URL,
	port: process.env.PORT,
});
