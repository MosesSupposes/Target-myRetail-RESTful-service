const server = require("./server");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

server.start({
	dbUrl: process.env.DB_URL,
	port: process.env.PORT,
});
