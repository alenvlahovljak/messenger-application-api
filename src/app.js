//require necessary modules
const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

//require nexxessary constants
const { CORS, USER_STATUS } = require("./utils/constants");

//execute Express app
const app = express();
const server = http.createServer(app);

//configure socket.io
const io = socketIO(server);

//require error handler
const { errorHandler } = require("./controllers/errors");

//require helpers
const { usersHelpers } = require("./helpers");

//require routes
const { usersRoutes, roomsRoutes, messagesRoutes } = require("./routes");

//require database
const db = require("./models");
const { createVerify } = require("crypto");

app.use(express.static(path.join(__dirname, "../public")));

//configure modules usage
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
	cors({
		credentials: true,
		origin: (origin, cb) => {
			/*if (CORS.WHITE_LIST.includes(origin)) */ return cb(null, true);
			cb(new Error("Not allowed by CORS!"));
		}
	})
);
//app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure static files serving
app.use("/static/avatars", express.static(path.join(__dirname, "../public/storage/avatars")));

//use routes
app.use("/users", usersRoutes);
app.use("/rooms", roomsRoutes);
app.use("/messages", messagesRoutes);

io.on("connect", (socket) => {
	console.log("New socket connected!");

	socket.on("addUser", async (user, cb) => {
		try {
			socket.broadcast.emit("user", user);
			cb();
		} catch (err) {
			cb("Unable to log user!");
		}
	});

	socket.on("joinGlobalRoom", (user, cb) => {
		try {
			socket.join("global");
			socket.emit("info", "Welcome to global room!");
			socket.broadcast.to("global").emit("info", `${user.username} has joined global room!`);
			cb();
		} catch (err) {
			cb("Unable to join global room!");
		}
	});

	socket.on("sendMessage", (message, cb) => {
		try {
			message.save
				? io.to("global").emit("messageToRoom", message)
				: io.to(message.from.socketId).to(message.to.socketId).emit("messageToRoom", message);
			cb();
		} catch (err) {
			cb("Unable to send message!");
		}
	});

	socket.on("disconnect", async () => {
		const deletedUser = await usersHelpers.deleteUserHelper(socket.id);
		if (deletedUser.deletedCount == 1) socket.broadcast.emit("removeUser", socket.id);
	});
});

//catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error("Page Not Found!");
	err.status = 404;
	next(err);
});

//use error handler
app.use(errorHandler);

//export express app
module.exports = server;
