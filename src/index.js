const server = require("./server");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

server.start({
	dbUrl: "mongodb+srv://cluster0.4kxos.mongodb.net/myRetail",
	port: process.env.PORT,
});
